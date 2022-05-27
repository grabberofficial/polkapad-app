import React from 'react';
import styled from '@emotion/styled';

import { Flex, Heading, Text, Link, Image } from '@chakra-ui/react';
import { Button } from '@/components/Button';

const Header: React.FC<{ type?: string }> = ({ type = 'eth' }) => {
  console.log('change to enum', type);
  const verified = false;

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

      <Flex
        width="100%"
        display="flex"
        height="48px"
        padding={'6px'}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={'row'}
        border="1px solid #E5E4E4"
        borderColor={verified ? '#49C7DA' : '#E5E4E4'}
        borderRadius={'4px'}
      >
        <Flex alignItems={'center'}>
          <Image
            margin="0px 14px 0px 11px"
            src="/images/icon_bsc.png"
            alt="Polkapad"
            width="29px"
            height="29px"
            cursor="pointer"
          />
          <WalletText>BNB Smart chain</WalletText>
        </Flex>
        <Flex>
          <Button height="36px" variant="primary">
            Verify
          </Button>
        </Flex>
      </Flex>

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

const WalletText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  padding-left: 25px;
  height: 20px;
  border-left: 1px solid #e0e0e0;
`;

export default Header;
