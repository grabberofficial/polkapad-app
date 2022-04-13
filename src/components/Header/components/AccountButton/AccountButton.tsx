import { Button } from '@chakra-ui/react';
import { AccountButtonIcon } from './components/AccountButtonIcon/AccountButtonIcon';

export const AccountButton = () => {
  return (
    <Button
      leftIcon={<AccountButtonIcon />}
      backgroundColor="#FFFFFF"
      fontSize={14}
      fontWeight={600}
      fontFamily="Poppins"
      lineHeight={21}
      paddingRight={8}
    >
      Account
    </Button>
  );
};
