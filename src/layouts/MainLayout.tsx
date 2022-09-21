import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </Box>
  );
};
