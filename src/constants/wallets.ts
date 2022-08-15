import { providers } from 'ethers';

declare global {
  interface Window {
    talismanEth: providers.Web3Provider;
    SubWallet: providers.Web3Provider;
    BinanceChain: providers.Web3Provider;
    clover: providers.Web3Provider;
  }
}

export interface WalletMeta {
  title: string;
  extensionName: string;
  ethereumProvider?: string;
  installUrl: string;
}

export const METAMASK_INSTALL_URL = 'https://metamask.io/download.html';

export const POLKADOT_WALLET: WalletMeta = {
  title: 'Polkadot{.js}',
  extensionName: 'polkadot-js',
  installUrl: 'https://polkadot.js.org/extension/',
};

export const TALISMAN_WALLET: WalletMeta = {
  title: 'Talisman',
  extensionName: 'talisman',
  ethereumProvider: 'talismanEth',
  installUrl: 'https://talisman.xyz/',
};

export const SUB_WALLET: WalletMeta = {
  title: 'Subwallet',
  extensionName: 'subwallet-js',
  ethereumProvider: 'SubWallet',
  installUrl: 'https://subwallet.app/download.html',
};

export const CLOVER_WALLET: WalletMeta = {
  title: 'Clover',
  extensionName: 'clover',
  ethereumProvider: 'clover',
  installUrl: 'https://clv.org/?type=wallet',
};

export const BINANCE_WALLET: WalletMeta = {
  title: 'Binance Wallet',
  extensionName: 'Binance Wallet',
  ethereumProvider: 'BinanceChain',
  installUrl: 'https://www.bnbchain.org/en/binance-wallet',
};
