import { ReactNode } from 'react';
import ThemeProvider from './theme';

interface ProviderProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export default Providers;

export * from './theme';
