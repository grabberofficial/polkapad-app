import { createContext } from 'react';
import useUser from '@/lib/hooks/useUser';
import {
  useWallets,
  WalletsType,
} from '@/components/pages/Profile/components/WalletsProvider/hooks/useWallets';

export type WalletsContextType = {
  wallets: WalletsType;
  walletsAreVerified: boolean;
  fetchWallets: () => void;
};

export const WalletsContext = createContext<WalletsContextType>({
  wallets: [],
  walletsAreVerified: false,
  fetchWallets: () => null,
});

interface WalletsProviderProps {
  children: React.ReactNode;
}

export const WalletsProvider = ({ children }: WalletsProviderProps) => {
  const { user } = useUser({
    redirectTo: '/auth/login',
  });
  const walletsState = useWallets(user);

  return (
    <WalletsContext.Provider value={walletsState}>
      {children}
    </WalletsContext.Provider>
  );
};
