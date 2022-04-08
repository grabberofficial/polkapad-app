import { ReactNode } from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

// TODO: pass theme vars here
const theme = extendTheme();

interface ThemeProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeProvider;
