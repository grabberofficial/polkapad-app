import { Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { Button } from '@/components/Button';

interface VerificationDisruptedProps {
  onButtonClick: () => void;
}

export const VerificationDisrupted = ({
  onButtonClick,
}: VerificationDisruptedProps) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const onClick = useCallback(() => {
    setIsButtonVisible(false);
    onButtonClick();
  }, [onButtonClick]);

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
      onClick={() => setIsButtonVisible(true)}
    >
      Verification process disrupted?
    </Text>
  );
};
