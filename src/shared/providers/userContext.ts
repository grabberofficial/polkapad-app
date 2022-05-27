import { User } from '@/pages/api/user';
import { createContext, Dispatch, SetStateAction } from 'react';

// user
interface Account {
  address: string;
  balance: any;
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
