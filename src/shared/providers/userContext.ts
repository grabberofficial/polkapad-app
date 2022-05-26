import { createContext } from 'react';

// user
interface Account {
  address: string;
  balance: any;
}

interface UserContext {
  user: {
    // TODO: User fields from backend
    kyc?: string;
  } | null;
  polka: Account | Record<string, never>;
  bsc: Account | Record<string, never>;
}

// TODO: context
// Collects connected adressess + balances + kyc + any related data
// Hooks should update it when required
export const UserContext = createContext<UserContext>({
  user: null,
  polka: {},
  bsc: {},
});
