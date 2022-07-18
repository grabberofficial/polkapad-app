import { isProduction } from '@/config/env';
import { BSC, BSCTestnet } from '@usedapp/core';

export const KSM_BSC = '0x2aa69E8D25C045B659787BC1f03ce47a388DB6E8';
export const DOT_BSC = isProduction
  ? '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402'
  : '0x28F57189eaa7A56aE9B8591F5B325fD3b0617c26';

export const network = isProduction ? BSC.chainId : BSCTestnet.chainId;

export const networkName = isProduction
  ? 'Binance Smart Chain Mainnet'
  : 'Binance Smart Chain Testnet';

export const rpcUrls = isProduction
  ? [
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
    ]
  : [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
    ];

export const blockExplorerUrls = isProduction
  ? ['http://bscscan.com']
  : ['http://testnet.bscscan.com'];
