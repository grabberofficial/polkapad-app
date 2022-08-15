import { ReactNode } from 'react';

import ThemeProvider from './theme';
import DAppProvider from './dApp';
import { PolkadotExtensionProvider } from '@/hooks/usePolkadotExtension';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const isSSR = typeof window === 'undefined';

  return (
    <ThemeProvider>
      <DAppProvider>
        {isSSR ? (
          children
        ) : (
          <PolkadotExtensionProvider>{children}</PolkadotExtensionProvider>
        )}
      </DAppProvider>
    </ThemeProvider>
  );
};

export default Providers;

export * from './theme';
