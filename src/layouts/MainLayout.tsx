import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <Box>{children}</Box>;
};
