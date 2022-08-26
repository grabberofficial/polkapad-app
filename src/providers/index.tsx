import { ReactNode } from 'react';

import ThemeProvider from './theme';
import DAppProvider from './dApp';
import { PolkadotExtensionProvider } from '@/hooks/usePolkadotExtension';
import { KYCProvider } from '@/components/pages/Profile/components/KYCProvider/KYCProvider';
import { WalletsProvider } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  const isSSR = typeof window === 'undefined';

  return (
    <ThemeProvider>
      <DAppProvider>
        <KYCProvider>
          <WalletsProvider>
            {isSSR ? (
              children
            ) : (
              <PolkadotExtensionProvider>{children}</PolkadotExtensionProvider>
            )}
          </WalletsProvider>
        </KYCProvider>
      </DAppProvider>
    </ThemeProvider>
  );
};

export default Providers;

export * from './theme';
