import { Button } from '@chakra-ui/react';

export const ConnectWalletButton: React.FC = () => {
  return (
    <Button
      backgroundColor="#FFFFFF"
      fontSize={14}
      fontWeight={600}
      fontFamily="Poppins"
      lineHeight={21}
      padding={'0 21px 0 22px'}
      _hover={{
        color: '#49c7da',
      }}
    >
      Connect Wallet
    </Button>
  );
};
