import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import ThemeProvider from './theme';
import DAppProvider from './dApp';

const SubstrateContextProvider = dynamic(() => import('./substrate'), {
  ssr: false,
});

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
