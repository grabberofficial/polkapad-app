import { ReactNode } from 'react';

import ThemeProvider from './theme';
import DAppProvider from './dApp';
import SubstrateContextProvider from './substrate';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <ThemeProvider>
    <DAppProvider>
      <SubstrateContextProvider>{children}</SubstrateContextProvider>
    </DAppProvider>
  </ThemeProvider>
);

export default Providers;

export * from './theme';
