import { Button } from '@chakra-ui/react';
import { AccountButtonIcon } from './components/AccountButtonIcon/AccountButtonIcon';

export const AccountButton: React.FC = () => {
  return (
    <Button
      leftIcon={<AccountButtonIcon />}
      backgroundColor="#FFFFFF"
      fontSize={14}
      fontWeight={600}
      fontFamily="Poppins"
      lineHeight={21}
      paddingRight={8}
      _hover={{
        color: '#49c7da',
      }}
    >
      Account
    </Button>
  );
};
