import { Image, Text } from '@chakra-ui/react';
import spinner from '@/assets/spinner.svg';
import styled from '@emotion/styled';

export const VerificationInProgress = () => {
  return (
    <>
      <AnimatedImage src={spinner} />
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
    </>
  );
};

const AnimatedImage = styled(Image)`
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotate 2s linear infinite;
`;
