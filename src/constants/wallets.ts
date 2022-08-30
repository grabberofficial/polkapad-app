import { providers } from 'ethers';
import { InjectedWindow } from '@polkadot/extension-inject/types';

declare global {
  interface Window extends InjectedWindow {
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
  icon: string;
}

export const METAMASK: WalletMeta = {
  title: 'MetaMask',
  extensionName: 'MetaMask',
  ethereumProvider: 'ethereum',
  icon: '/images/metamask.svg',
  installUrl: 'https://metamask.io/download.html',
};

export const POLKADOT_WALLET: WalletMeta = {
  title: 'Polkadot{.js}',
  extensionName: 'polkadot-js',
  icon: '/images/polka_icon.svg',
  installUrl: 'https://polkadot.js.org/extension/',
};

export const TALISMAN_WALLET: WalletMeta = {
  title: 'Talisman',
  extensionName: 'talisman',
  ethereumProvider: 'talismanEth',
  icon: '/images/talisman_icon.svg',
  installUrl: 'https://talisman.xyz/',
};

export const SUB_WALLET: WalletMeta = {
  title: 'Subwallet',
  extensionName: 'subwallet-js',
  ethereumProvider: 'SubWallet',
  icon: '/images/subwallet_icon.svg',
  installUrl: 'https://subwallet.app/download.html',
};

export const CLOVER_WALLET: WalletMeta = {
  title: 'Clover',
  extensionName: 'clover',
  ethereumProvider: 'clover',
  icon: '/images/clv_icon.svg',
  installUrl: 'https://clv.org/?type=wallet',
};

export const BINANCE_WALLET: WalletMeta = {
  title: 'Binance Wallet',
  extensionName: 'Binance Wallet',
  ethereumProvider: 'BinanceChain',
  icon: '/images/bsc_icon.svg',
  installUrl: 'https://www.bnbchain.org/en/binance-wallet',
};

export const WALLET_CONNECT: WalletMeta = {
  title: 'Wallet Connect',
  extensionName: 'wallet-connect',
  icon: '/images/wallet_connect.svg',
  installUrl: 'https://walletconnect.org/',
};

export const UNKNOWN_INJECTED_WALLET = {
  title: 'Ethereum Wallet',
  extensionName: 'ethereum',
  icon: '/images/smart_chain.svg',
  installUrl: '',
};
