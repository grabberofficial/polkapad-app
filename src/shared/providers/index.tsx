import { ReactNode } from 'react';

import ThemeProvider from './theme';
import DAppProvider from './dApp';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <ThemeProvider>
    <DAppProvider>{children}</DAppProvider>
  </ThemeProvider>
);

export default Providers;

export * from './theme';
