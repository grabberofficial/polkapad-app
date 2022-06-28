import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Button } from '@/components/Button';

interface VerificationDisruptedProps {
  onClick: () => void;
}

export const VerificationDisrupted = ({
  onClick,
}: VerificationDisruptedProps) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  return isButtonVisible ? (
    <Button
      variant="primary"
      onClick={onClick}
      width={158}
      marginTop="48px"
      flexShrink={0}
    >
      Start KYC
    </Button>
  ) : (
    <Text
      cursor="pointer"
      color="primary.basic"
      _hover={{ color: 'primary.hover' }}
      textDecoration="underline"
      marginTop="48px"
      marginLeft="15px"
      onClick={() => setIsButtonVisible(true)}
    >
      Verification process disrupted?
    </Text>
  );
};
