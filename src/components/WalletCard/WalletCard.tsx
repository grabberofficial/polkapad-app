import React from 'react';
import styled from '@emotion/styled';

import { Flex, Heading, Text, Link, Image } from '@chakra-ui/react';
import { Button } from '@/components/Button';

const Header: React.FC<{ type?: string }> = ({ type = 'eth' }) => {
  console.log('change to enum', type);
  // TODO: temp just for tests
  const verified = type === 'eth';

  let numberText = '1.';
  let walletText = 'Funding wallet';
  let networkText = 'BNB Smart chain';
  let commentText =
    'Accepted: DOT or KSM from Binance Smart Chain (EVM) with the lowest fees.';
  let walletIcon = '/images/icon_bsc.png';
  if (type !== 'eth') {
    numberText = '2.';
    walletText = 'Receiving wallet';
    networkText = 'Polkadot';
    walletIcon = '/images/icon_polka.png';
    commentText = 'Required to receive tokens during a give away';
  }

  return (
    <Flex
      marginBottom={'24px'}
      position={'relative'}
      flexDirection={'column'}
      width={'466px'}
      padding={'26px 50px'}
      border={'1px solid #E9E9E9'}
      borderRadius="4px"
    >
      <Label>{numberText}</Label>
      <Heading
        color="#303030"
        fontFamily="Poppins"
        fontSize="14px"
        fontWeight="600"
        marginBottom="12px"
      >
        {walletText}
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
            src={walletIcon}
            alt="Polkapad"
            width="29px"
            height="29px"
          />
          <WalletText>{networkText}</WalletText>
        </Flex>
        <Flex>
          {!verified && (
            <Button height="36px" variant="primary">
              Verify
            </Button>
          )}
          {verified && (
            <Image
              marginRight="10px"
              src="/images/icon_ok.png"
              alt="Polkapad"
              width="20px"
              height="20px"
            />
          )}
        </Flex>
      </Flex>

      <Text
        color="#A5A5A5"
        fontFamily="Poppins"
        fontSize="14px"
        fontWeight="500"
        margin="20px 0px"
      >
        {commentText}
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
