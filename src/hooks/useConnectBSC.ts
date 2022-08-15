import {
  DOT_BSC,
  KSM_BSC,
  network,
  WCProviderConfig,
  binanceWalletNetwork,
} from '@/config/network';
import { useEthers, useTokenBalance } from '@usedapp/core';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Balance, UserContext } from '@/providers/userContext';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { sendMetricsStartedConnectionBinance } from '@/services/metrics';
import {
  CONNECTED_EVM_WALLET_KEY,
  WALLET_CONNECT_DEEPLINK_KEY,
  WALLET_CONNECT_KEY,
} from '@/constants/localStorage';
import { providers } from 'ethers';
import { WalletMeta } from '@/constants/wallets';
import {
  getBinanceWalletProvider,
  getCloverProvider,
  getConnectedWalletName,
  getSubWalletProvider,
  getTalismanProvider,
} from '@/utils/wallets';
import { resolvePath } from '@/utils/common';

const getConnectedWallet = () => {
  const connectedWallet = localStorage.getItem(CONNECTED_EVM_WALLET_KEY);
  return connectedWallet ? JSON.parse(connectedWallet) : null;
};

export const useConnectBSC = () => {
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
  const userContext = useContext(UserContext);
  const dotBalance = useTokenBalance(DOT_BSC, account);
  const ksmBalance = useTokenBalance(KSM_BSC, account);
  const walletName = useMemo(() => getConnectedWalletName(library), [library]);

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
      await switchNetwork(network);
    }
  }, [library, switchNetwork]);

  const connectInjected = useCallback(async () => {
    try {
      await activateBrowserWallet();

      if (chainId !== network) {
        switchToBSC();
      }

      sendMetricsStartedConnectionBinance();
    } catch (error) {
      console.error(error);
    }
  }, [activateBrowserWallet, chainId, switchToBSC]);

  const connectWC = useCallback(async () => {
    try {
      const provider = new WalletConnectProvider(WCProviderConfig);
      await provider.enable();
      await activate(provider);
      sendMetricsStartedConnectionBinance();
    } catch (error) {
      console.error(error);
    }
  }, [activate]);

  const connectExtension = useCallback(
    async (wallet: WalletMeta) => {
      try {
        const extension = resolvePath(window, wallet.ethereumProvider);

        if (!extension) {
          window.open(wallet.installUrl);
          return;
        }

        const provider = new providers.Web3Provider(extension, 'any');
        await provider.send('eth_requestAccounts', []);

        await activate(provider);
        localStorage.setItem(CONNECTED_EVM_WALLET_KEY, JSON.stringify(wallet));
        sendMetricsStartedConnectionBinance();

        if (chainId !== network) {
          switchToBSC();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [activate, chainId, switchToBSC],
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
      connectExtension(getConnectedWallet());
    }
  }, []);

  useEffect(() => {
    if (account && dotBalance && ksmBalance && !userContext?.bsc?.address) {
      userContext.setContext({
        ...userContext,
        bsc: {
          address: account as string,
          balance: {
            bsc: new Balance(dotBalance),
            polka: new Balance(ksmBalance),
          },
        },
      });
    }
  }, [account, dotBalance, ksmBalance, userContext]);

  const deactivate = useCallback(() => {
    userContext.setContext({
      ...userContext,
      bsc: {},
    });
    disconnectBSC();
    localStorage.removeItem(WALLET_CONNECT_KEY);
    localStorage.removeItem(WALLET_CONNECT_DEEPLINK_KEY);
    localStorage.removeItem(CONNECTED_EVM_WALLET_KEY);
  }, [disconnectBSC, userContext]);

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
    walletName,
    isLoading,
    isMetamaskInstalled,
    isTalismanInstalled,
    isSubwalletInstalled,
    isCloverInstalled,
    isBinanceWalletInstalled,
    isOtherEvmWalletInstalled,
  };
};
