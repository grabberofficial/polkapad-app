import React from 'react';
import styled from '@emotion/styled';

import { Flex, Heading, Text, Link } from '@chakra-ui/react';

const Header: React.FC<{ type?: string }> = ({ type = 'eth' }) => {
  console.log('change to enum', type);

  return (
    <Flex
      position={'relative'}
      flexDirection={'column'}
      width={'466px'}
      padding={'30px 50px'}
      border={'1px solid #E9E9E9'}
      borderRadius="4px"
    >
      <Label>1.</Label>
      <Heading
        color="#303030"
        fontFamily="Poppins"
        fontSize="14px"
        fontWeight="600"
        marginBottom="10px"
      >
        Funding wallets
      </Heading>
      <Text
        color="#A5A5A5"
        fontFamily="Poppins"
        fontSize="14px"
        fontWeight="500"
        margin="20px 0px"
      >
        Accepted: DOT or KSM from Binance Smart Chain (EVM) with the lowest
        fees.
      </Text>
      <Link
        fontFamily="Poppins"
        fontSize="14px"
        fontWeight="600"
        color="#49C7DA"
        href="https://metamask.io/"
        target="blank"
      >
        Get wallet
      </Link>
    </Flex>
  );
};

const Label = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e9e9e9;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  position: absolute;
  left: -17.5px;
  top: 20px;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
`;

export default Header;
