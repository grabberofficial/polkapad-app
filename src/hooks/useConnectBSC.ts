import {
  DOT_BSC,
  KSM_BSC,
  network,
  WCProviderConfig,
  binanceWalletNetwork,
  networkName,
  rpcUrls,
  blockExplorerUrls,
} from '@/config/network';
import { useEthers, useTokenBalance } from '@usedapp/core';
import { useCallback, useEffect, useMemo } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { sendMetricsStartedConnectionBinance } from '@/services/metrics';
import {
  CONNECTED_EVM_WALLET_KEY,
  WALLET_CONNECT_KEY,
} from '@/constants/localStorage';
import { providers } from 'ethers';
import { METAMASK, WALLET_CONNECT, WalletMeta } from '@/constants/wallets';
import {
  cleanEVMStorage,
  getBinanceWalletProvider,
  getCloverProvider,
  getConnectedEVMWallet,
  getEthereumAccount,
  getStoredEVMWallet,
  getSubWalletProvider,
  getTalismanProvider,
} from '@/utils/wallets';
import { resolvePath } from '@/utils/common';
import { sendWalletLogs } from '@/services/walletLogs';
import useUser from '@/hooks/useUser';
import { getInjectedProvider } from '@/utils/getInjectedProvider';

const getNetworkArguments = (
  chainId: number,
  chainName: string,
  rpcUrls: string[],
  blockExplorerUrls: string[],
) => {
  return {
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `0x${Number(chainId).toString(16)}`,
        chainName,
        nativeCurrency: {
          name: 'Binance Chain Native Token',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls,
        blockExplorerUrls,
      },
    ],
  };
};

export const useConnectBSC = () => {
  const { user } = useUser();
  const {
    activateBrowserWallet,
    activate,
    account,
    chainId,
    deactivate: disconnectBSC,
    library,
    isLoading,
    switchNetwork,
  } = useEthers();

  const connected = !!chainId;
  const dotBalance = useTokenBalance(DOT_BSC, account);
  const ksmBalance = useTokenBalance(KSM_BSC, account);
  const connectedWallet = useMemo(
    () => getConnectedEVMWallet(library),
    [library],
  );

  const isMetamaskInstalled = useMemo(() => {
    return window.ethereum?.isMetaMask;
  }, []);

  const isTalismanInstalled = useMemo(() => {
    return !!getTalismanProvider();
  }, []);

  const isSubwalletInstalled = useMemo(() => {
    return !!getSubWalletProvider();
  }, []);

  const isCloverInstalled = useMemo(() => {
    return !!getCloverProvider();
  }, []);

  const isBinanceWalletInstalled = useMemo(() => {
    return !!getBinanceWalletProvider();
  }, []);

  const isOtherEvmWalletInstalled = useMemo(() => {
    const { ethereum } = window as any;
    return (
      !!ethereum &&
      !ethereum.isMetaMask &&
      !ethereum.isTalisman &&
      !ethereum.isSubWallet &&
      !ethereum.isClover
    );
  }, []);

  const switchToBSC = useCallback(async () => {
    const providerSwitch = (library as any)?.provider?.switchNetwork;
    if (providerSwitch) {
      await providerSwitch(binanceWalletNetwork);
    } else {
      const requestArguments = getNetworkArguments(
        network,
        networkName,
        rpcUrls,
        blockExplorerUrls,
      );

      await window.ethereum.request(requestArguments);
      await switchNetwork(network);
    }
  }, [library, switchNetwork]);

  const connectInjected = useCallback(async () => {
    try {
      await activateBrowserWallet();
      const injectedProvider = await getInjectedProvider();

      sendMetricsStartedConnectionBinance();
      sendWalletLogs(
        METAMASK.title,
        'bsc',
        await getEthereumAccount(injectedProvider),
        user,
      );

      if (chainId !== network) {
        switchToBSC();
      }
    } catch (error) {
      console.error(error);
    }
  }, [activateBrowserWallet, chainId, switchToBSC, user]);

  const connectWC = useCallback(async () => {
    try {
      const isReconnect = !!localStorage.getItem(WALLET_CONNECT_KEY);
      const provider = new WalletConnectProvider(WCProviderConfig);
      await provider.enable();
      await activate(provider);
      const account = provider.accounts[0];
      if (!isReconnect) {
        sendMetricsStartedConnectionBinance();
        sendWalletLogs(WALLET_CONNECT.title, 'bsc', account, user);
      }
    } catch (error) {
      console.error(error);
    }
  }, [activate, user]);

  const connectExtension = useCallback(
    async (wallet: WalletMeta) => {
      try {
        const isReconnect = !!localStorage.getItem(CONNECTED_EVM_WALLET_KEY);
        const extension = resolvePath(window, wallet.ethereumProvider);

        if (!extension) {
          window.open(wallet.installUrl);
          return;
        }

        const provider = new providers.Web3Provider(extension, 'any');
        await provider.send('eth_requestAccounts', []);
        const account = await getEthereumAccount(provider);

        await activate(provider);
        if (!isReconnect) {
          localStorage.setItem(
            CONNECTED_EVM_WALLET_KEY,
            JSON.stringify(wallet),
          );
          sendMetricsStartedConnectionBinance();
          sendWalletLogs(wallet.title, 'bsc', account, user);
        }

        if (chainId !== network) {
          switchToBSC();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [activate, chainId, switchToBSC, user],
  );

  useEffect(() => {
    // Small hack to fix Binance Wallet unsubscription
    if (window.BinanceChain) {
      window.BinanceChain = {
        ...window.BinanceChain,
        removeListener: () => null,
      } as any;
    }

    if (localStorage.getItem(WALLET_CONNECT_KEY)) {
      connectWC();
    }
    if (localStorage.getItem(CONNECTED_EVM_WALLET_KEY)) {
      connectExtension(getStoredEVMWallet());
    }
  }, []);

  const deactivate = useCallback(() => {
    disconnectBSC();
    cleanEVMStorage();
  }, [disconnectBSC]);

  return {
    disconnectFromBSC: deactivate,
    connectInjected,
    connectWC,
    connectExtension,
    dotBalance,
    ksmBalance,
    connected,
    account,
    chainId,
    switchToBSC,
    connectedWallet,
    isLoading,
    isMetamaskInstalled,
    isTalismanInstalled,
    isSubwalletInstalled,
    isCloverInstalled,
    isBinanceWalletInstalled,
    isOtherEvmWalletInstalled,
  };
};
