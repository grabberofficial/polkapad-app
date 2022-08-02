export interface WalletMeta {
  title: string;
  extensionName: string;
  installUrl: string;
}

export const POLKADOT_WALLET: WalletMeta = {
  title: 'Polkadot.js',
  extensionName: 'polkadot-js',
  installUrl: 'https://polkadot.js.org/extension/',
};

export const TALISMAN_WALLET: WalletMeta = {
  title: 'Talisman',
  extensionName: 'talisman',
  installUrl: 'https://talisman.xyz/',
};

export const SUB_WALLET: WalletMeta = {
  title: 'Subwallet',
  extensionName: 'subwallet-js',
  installUrl: 'https://subwallet.app/download.html',
};

export const CLOVER_WALLET: WalletMeta = {
  title: 'Clover',
  extensionName: 'clover',
  installUrl: 'https://clv.org/?type=wallet',
};
