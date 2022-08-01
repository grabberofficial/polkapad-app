import { ReactNode, useEffect, useState } from 'react';

import ThemeProvider from './theme';
import DAppProvider from './dApp';
import { UserContext, UserContextType } from './userContext';
import useUser from '@/lib/hooks/useUser';
import { PolkadotExtensionProvider } from '@/shared/hooks/usePolkadotExtension';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const isSSR = typeof window === 'undefined';

  const initialUserContext = {
    user: null,
    polka: {},
    bsc: {},
    setContext: () => {
      return null;
    },
  };

  const [context, setContext] = useState<UserContextType>(initialUserContext);
  const { user } = useUser();

  useEffect(() => {
    if (!context.user && user) {
      setContext({
        ...context,
        user: user ?? null,
      });
    }
  }, [user, context]);

  return (
    <ThemeProvider>
      <DAppProvider>
        {isSSR ? (
          children
        ) : (
          <PolkadotExtensionProvider>
            <UserContext.Provider value={{ ...context, setContext }}>
              {children}
            </UserContext.Provider>
          </PolkadotExtensionProvider>
        )}
      </DAppProvider>
    </ThemeProvider>
  );
};

export default Providers;

export * from './theme';
