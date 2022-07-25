import {
  DOT_BSC,
  KSM_BSC,
  network,
  networkName,
  rpcUrls,
  blockExplorerUrls,
  WCProviderConfig,
} from '@/config/network';
import { useEthers, useTokenBalance } from '@usedapp/core';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Balance, UserContext } from '../providers/userContext';
import WalletConnectProvider from '@walletconnect/web3-provider';

const WALLET_CONNECT_KEY = 'walletconnect';

export enum BSCProvider {
  METAMASK = 'METAMASK',
  WALLETCONNECT = 'WALLETCONNECT',
}

export const useConnectBSC = () => {
  const {
    activateBrowserWallet,
    activate,
    account,
    chainId,
    deactivate: disconnectBSC,
    library,
  } = useEthers();

  const dotBalance = useTokenBalance(DOT_BSC, account);
  const ksmBalance = useTokenBalance(KSM_BSC, account);

  const connected = !!chainId;

  const userContext = useContext(UserContext);

  const walletName = useMemo(() => {
    return library?.connection.url === 'metamask'
      ? 'MetaMask'
      : 'WalletConnect';
  }, [library?.connection.url]);

  const connectToBSC = useCallback(
    async (provider: BSCProvider = BSCProvider.METAMASK) => {
      try {
        if (provider === BSCProvider.METAMASK) {
          await activateBrowserWallet();

          if (chainId !== network) {
            const requestArguments = getNetworkArguments(
              network,
              networkName,
              rpcUrls,
              blockExplorerUrls,
            );

            await window.ethereum.request(requestArguments);
          }
        }
        if (provider === BSCProvider.WALLETCONNECT) {
          const provider = new WalletConnectProvider(WCProviderConfig);
          await provider.enable();
          await activate(provider);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [activate, activateBrowserWallet, chainId],
  );

  const switchToBSC = useCallback(async () => {
    const requestArguments = getNetworkArguments(
      network,
      networkName,
      rpcUrls,
      blockExplorerUrls,
    );

    await window.ethereum.request(requestArguments);
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
  }, [disconnectBSC, userContext]);

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

  return {
    disconnectFromBSC: deactivate,
    connectToBSC,
    dotBalance,
    ksmBalance,
    connected,
    account,
    chainId,
    switchToBSC,
    walletName,
  };
};
