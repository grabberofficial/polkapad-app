import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

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
  balance ? parseFloat(formatEther(balance)).toFixed(3) : '';

export const formatPolkaBalance = (balance?: BigNumber | string) =>
  balance
    ? parseFloat(formatUnits(balance, POLKA_CHAIN_DECIMALS.POLKA)).toFixed(3)
    : '';
