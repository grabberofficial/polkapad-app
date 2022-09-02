import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BigNumber, providers } from 'ethers';
import { resolvePath } from '@/utils/common';
import {
  BINANCE_WALLET,
  CLOVER_WALLET,
  METAMASK,
  POLKADOT_WALLET,
  SUB_WALLET,
  TALISMAN_WALLET,
  UNKNOWN_INJECTED_WALLET,
  WALLET_CONNECT,
  WalletMeta,
} from '@/constants/wallets';
import {
  CONNECTED_EVM_WALLET_KEY,
  CONNECTED_POLKA_WALLET_KEY,
  WALLET_CONNECT_DEEPLINK_KEY,
  WALLET_CONNECT_KEY,
} from '@/constants/localStorage';

interface EthereumProvider extends providers.JsonRpcProvider {
  provider?: {
    isMetaMask?: boolean;
    isTalisman?: boolean;
    isSubWallet?: boolean;
    isClover?: boolean;
    isWalletConnect?: boolean;
    bnbSign: (data: string) => Promise<string>;
  };
}

enum POLKA_CHAIN_DECIMALS {
  POLKA = 10,
  KSM = 12,
}

export enum POLKA_ADDRESS_PREFIX {
  POLKA = 0,
  KUSAMA = 2,
  SUBSTRATE = 42,
}

export const convertSS58Address = (
  address: string,
  prefix: POLKA_ADDRESS_PREFIX,
): string => {
  return encodeAddress(decodeAddress(address), prefix);
};

export const shortenPolkaAddress = (address: string, rate = 6) => {
  if (!address || address.length === 0) return '';
  const start = address.slice(0, rate);
  const end = address.slice(address.length - rate);
  return `${start}...${end}`;
};

export const formatEtherBalance = (balance?: BigNumber | string) =>
  balance ? parseFloat(formatEther(balance)).toFixed(2) : '';

export const checkIsPolkaWalletInstalled = (wallet: WalletMeta) => {
  return window?.injectedWeb3?.[wallet.extensionName];
};

export const checkIsPolkadotInstalled = () => {
  console.log(window);
  return checkIsPolkaWalletInstalled(POLKADOT_WALLET);
};

export const checkIsTalismanInstalled = () =>
  checkIsPolkaWalletInstalled(TALISMAN_WALLET);

export const checkIsSubwalletInstalled = () =>
  checkIsPolkaWalletInstalled(SUB_WALLET);

export const checkIsCloverInstalled = () =>
  checkIsPolkaWalletInstalled(CLOVER_WALLET);

export const formatPolkaBalance = (balance?: BigNumber | string) =>
  balance
    ? parseFloat(formatUnits(balance, POLKA_CHAIN_DECIMALS.POLKA)).toFixed(2)
    : '';

export const getTalismanProvider = () => {
  return resolvePath(window, TALISMAN_WALLET.ethereumProvider);
};

export const getSubWalletProvider = () => {
  return resolvePath(window, SUB_WALLET.ethereumProvider);
};

export const getCloverProvider = () => {
  return resolvePath(window, CLOVER_WALLET.ethereumProvider);
};

export const getBinanceWalletProvider = () => {
  return resolvePath(window, BINANCE_WALLET.ethereumProvider);
};

export const getConnectedEVMWallet = (library?: EthereumProvider) => {
  const provider = library?.provider;

  if (provider?.isMetaMask) {
    return METAMASK;
  }

  if (provider?.isTalisman) {
    return TALISMAN_WALLET;
  }

  if (provider?.isClover) {
    return CLOVER_WALLET;
  }

  if (provider?.isSubWallet) {
    return SUB_WALLET;
  }

  if (provider?.bnbSign) {
    return BINANCE_WALLET;
  }

  if (provider?.isWalletConnect) {
    return WALLET_CONNECT;
  }

  return UNKNOWN_INJECTED_WALLET;
};

export const getStoredEVMWallet = () => {
  const connectedWallet = localStorage.getItem(CONNECTED_EVM_WALLET_KEY);
  return connectedWallet ? JSON.parse(connectedWallet) : null;
};

export const cleanEVMStorage = () => {
  localStorage.removeItem(WALLET_CONNECT_KEY);
  localStorage.removeItem(WALLET_CONNECT_DEEPLINK_KEY);
  localStorage.removeItem(CONNECTED_EVM_WALLET_KEY);
};

export const cleanPolkaStorage = () => {
  localStorage.removeItem(CONNECTED_POLKA_WALLET_KEY);
};

export const cleanWalletsStorage = () => {
  cleanEVMStorage();
  cleanPolkaStorage();
};
