import {
  DOT_BSC,
  KSM_BSC,
  network,
  networkName,
  rpcUrls,
  blockExplorerUrls,
} from '@/config/network';
import { useEthers, useTokenBalance } from '@usedapp/core';
import { useCallback, useContext, useEffect } from 'react';
import { Balance, UserContext } from '../providers/userContext';

export const useConnectBSC = () => {
  const {
    activateBrowserWallet,
    account,
    chainId,
    deactivate: disconnectBSC,
    switchNetwork,
  } = useEthers();

  const dotBalance = useTokenBalance(DOT_BSC, account);
  const ksmBalance = useTokenBalance(KSM_BSC, account);

  const connected = !!chainId;

  const userContext = useContext(UserContext);

  const connectToBSC = useCallback(async () => {
    try {
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
    } catch (e) {
      console.error(e);
    }
  }, [activateBrowserWallet, chainId]);

  const switchToBSC = useCallback(
    () => switchNetwork(network),
    [switchNetwork],
  );

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
  };
};
