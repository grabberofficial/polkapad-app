import { Flex, Text } from '@chakra-ui/react';
import { Loader } from '@/components/common/Loader/Loader';

export const VerificationInProgress = () => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Loader />
      <Text
        color="secondary.text"
        fontFamily="Poppins"
        fontSize="14px"
        lineHeight="21px"
        fontWeight="600"
        marginTop="25px"
      >
        Verification in progress
      </Text>
      <Text
        fontSize={12}
        lineHeight="18px"
        color="secondary.textLight"
        marginBottom="30px"
      >
        Please wait 5 minutes
      </Text>
    </Flex>
  );
};
