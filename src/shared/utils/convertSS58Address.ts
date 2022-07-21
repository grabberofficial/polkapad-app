import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

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
