import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';

export const MobileWalletPage = () => {
  return (
    <>
      <Heading
        color="secondary.text"
        fontFamily="Poppins"
        fontSize="27px"
        fontWeight="700"
        marginTop="80px"
        textAlign="center"
        lineHeight="33px"
      >
        Multi-wallet mode <br />
        is <StyledSpan>not available</StyledSpan>
        <br /> on mobile devices
      </Heading>
      <Text
        textAlign="center"
        fontSize={16}
        lineHeight="25px"
        marginTop="60px"
        fontWeight={600}
      >
        Magic link is already sent at your email.
        <br />
        Simply open this link on your PC or MAC
        <br /> and connect the wallets
      </Text>
    </>
  );
};

const StyledSpan = styled.span`
  color: var(--chakra-colors-primary-basic);
`;
