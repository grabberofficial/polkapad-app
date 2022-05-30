import { useEthers, useEtherBalance, BSC } from '@usedapp/core';
import { useCallback } from 'react';

export const useConnectBSC = () => {
  const { activateBrowserWallet, account, chainId, deactivate, switchNetwork } =
    useEthers();
  const etherBalance = useEtherBalance(account, { chainId });
  const connected = !!chainId;

  const connenctToBSC = useCallback(async () => {
    await activateBrowserWallet();

    console.log({
      chainId,
      BSCChainId: BSC.chainId,
    });
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
              'https://bsc-dataseed1.binance.org',
              'https://bsc-dataseed2.binance.org',
              'https://bsc-dataseed3.binance.org',
              'https://bsc-dataseed4.binance.org',
              'https://bsc-dataseed1.defibit.io',
              'https://bsc-dataseed2.defibit.io',
              'https://bsc-dataseed3.defibit.io',
              'https://bsc-dataseed4.defibit.io',
              'https://bsc-dataseed1.ninicoin.io',
              'https://bsc-dataseed2.ninicoin.io',
              'https://bsc-dataseed3.ninicoin.io',
              'https://bsc-dataseed4.ninicoin.io',
              'wss://bsc-ws-node.nariox.org',
            ],
            blockExplorerUrls: ['https://bscscan.com'],
          },
        ],
      });
    }
    switchNetwork(BSC.chainId);
  }, [activateBrowserWallet, switchNetwork, chainId]);

  return {
    disconnectFromBSC: deactivate,
    connenctToBSC,
    balance: etherBalance,
    connected,
    account,
  };
};
