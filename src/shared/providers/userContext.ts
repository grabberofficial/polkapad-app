import { User } from '@/pages/api/user';
import { createContext, Dispatch, SetStateAction } from 'react';
import { BigNumber } from 'ethers';
import {formatEther} from "ethers/lib/utils";

export class Balance {
  readonly value: BigNumber;

  constructor(balance: BigNumber) {
    this.value = balance;
  }

  public toString = (): string => {
    return `${parseFloat(formatEther(this.value)).toFixed(3)}`;
  }
}

interface Account {
  address: string;
  balance: {
    bsc: Balance,
    polka: Balance
  };
}

export interface UserContextType {
  user: User | null;
  polka: Account | Record<string, never>;
  bsc: Account | Record<string, never>;
  setContext: Dispatch<SetStateAction<UserContextType>>;
}

// TODO: context
// Collects connected adressess + balances + kyc + any related data
// Hooks should update it when required
export const UserContext = createContext<UserContextType>({
  user: null,
  polka: {},
  bsc: {},
  setContext: () => {
    return null;
  },
});
