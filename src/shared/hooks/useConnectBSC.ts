import { useEthers, BSC, useTokenBalance } from '@usedapp/core';
import { formatEther } from 'ethers/lib/utils';
import { useCallback, useContext, useEffect } from 'react';
import { UserContext } from '../providers/userContext';

const KSM_BSC = '0x2aa69E8D25C045B659787BC1f03ce47a388DB6E8';
const DOT_BSC = '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402';

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

      if (chainId !== BSC.chainId) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${Number(56).toString(16)}`,
              chainName: 'Binance Smart Chain Mainnet',
              nativeCurrency: {
                name: 'Binance Chain Native Token',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: [
                'https://bsc-dataseed.binance.org',
                'https://bsc-dataseed1.defibit.io',
                'https://bsc-dataseed1.ninicoin.io',
                'https://bsc-dataseed2.defibit.io',
                'https://bsc-dataseed3.defibit.io',
                'https://bsc-dataseed4.defibit.io',
                'https://bsc-dataseed2.ninicoin.io',
                'https://bsc-dataseed3.ninicoin.io',
                'https://bsc-dataseed4.ninicoin.io',
                'https://bsc-dataseed1.binance.org',
                'https://bsc-dataseed2.binance.org',
                'https://bsc-dataseed3.binance.org',
                'https://bsc-dataseed4.binance.org',
                'wss://bsc-ws-node.nariox.org',
              ],
              blockExplorerUrls: ['https://bscscan.com'],
            },
          ],
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [activateBrowserWallet, chainId]);

  const switchToBSC = useCallback(
    () => switchNetwork(BSC.chainId),
    [switchNetwork],
  );

  useEffect(() => {
    if (account && dotBalance && ksmBalance && !userContext?.bsc?.address) {
      userContext.setContext({
        ...userContext,
        bsc: {
          address: account as string,
          // balance: parseFloat(formatEther(etherBalance)).toFixed(3),
          balance: {
            dot: parseFloat(formatEther(dotBalance)).toFixed(3),
            ksm: parseFloat(formatEther(ksmBalance)).toFixed(3),
            // ksm: parseFloat(formatEther(ksmBalance)).toFixed(3),
            // dot: parseFloat(formatEther(dotBalance)).toFixed(3),
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
