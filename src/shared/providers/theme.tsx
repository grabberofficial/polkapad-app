import { ReactNode } from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

// TODO: pass theme vars here
const theme = extendTheme({
  colors: {
    primary: {
      basic: '#0096EF',
      hover: '#0685D0',
      text: '#FFF',
      border: '#E5E4E4',
    },
    secondary: {
      basic: '#fff',
      text: '#303030',
      textLight: '#A5A5A5',
      textHover: '#0096EF',
    },
    footer: {
      dark: '#8E8E8E',
      light: '#E9E9E9',
      background: '#303030',
    },
    menu: {
      text: '#5B5B5B',
    },
    warning: '#FFCC15',
    background: {
      dark: '#303030',
    },
    error: '#E868AF',
    kycIcons: '#3E9685',
  },
});

interface ThemeProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeProvider;
