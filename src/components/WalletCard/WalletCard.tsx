import React, { useContext, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

import {
  Flex,
  Heading,
  Text,
  Link,
  Image,
  usePrevious,
} from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { UserContext } from '@/shared/providers/userContext';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { shortenPolkaAddress } from '@/lib/utils';
import { useSubstrate } from '@/shared/providers/substrate';
import { serviceUrl } from '@/config/env';
import { ChainId } from '@usedapp/core';

const WalletCard: React.FC<{
  type?: string;
  wallets: any[];
  verifyCallback: () => void;
}> = ({ type = 'eth', wallets, verifyCallback }) => {
  const userContext = useContext(UserContext);

  const [verified, setVerified] = React.useState(false);
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState('');
  const previousAddress = usePrevious(walletAddress);
  const [error, setError] = React.useState('');

  const { connenctToBSC, chainId, switchToBSC } = useConnectBSC();
  const { account: polkaAccount, connectToPolka } = useSubstrate();

  const isWrongNetwork = type === 'eth' && chainId !== ChainId.BSC;

  useEffect(() => {
    if (wallets.length !== 0) {
      const wallet = wallets.find((wallet) => wallet.name === type);
      wallet !== undefined && setWalletAddress(wallet.value);
      setVerified(wallet !== undefined);
    }
  }, [wallets, type]);

  useEffect(() => {
    if (type === 'eth') {
      setWalletConnected(!!userContext.bsc?.address);
      if (userContext.bsc?.address) {
        setWalletAddress(userContext.bsc?.address);
      }
    }
    if (type === 'polka') {
      setWalletConnected(!!polkaAccount);
      if (polkaAccount) {
        setWalletAddress(polkaAccount);
      }
    }
  }, [type, polkaAccount, userContext.bsc?.address]);

  const connectWallet = useCallback(async () => {
    if (type === 'eth') {
      await connenctToBSC();
    }
    if (type === 'polka') {
      await connectToPolka();
    }
    setWalletConnected(true);
  }, [connectToPolka, connenctToBSC, type]);

  const verifyWallet = useCallback(async () => {
    let address;
    if (type === 'eth') {
      address = userContext.bsc?.address;
    }
    if (type === 'polka') {
      address = userContext.polka?.address;
    }
    if (walletAddress) address = walletAddress;

    try {
      await fetchJson(
        `https://${serviceUrl}/wallets`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: type,
            value: address,
          }),
        },
        userContext.user?.token,
      );
      setVerified(true);
      setWalletAddress(walletAddress);
      verifyCallback();
    } catch (e) {
      const typedError = e as FetchError;
      setError(typedError.data.message);
    }
  }, [type, userContext, walletAddress, verifyCallback]);

  useEffect(() => {
    if (walletAddress !== previousAddress) {
      setError('');
    }
  }, [walletAddress, previousAddress]);

  let numberText = '1.';
  let walletText = 'Funding wallet';
  let walletUrl = 'https://metamask.io/';
  let networkText = 'BNB Smart chain';
  let commentText =
    'Accepted: DOT or KSM from Binance Smart Chain (EVM) with the lowest fees.';
  let walletIcon = '/images/icon_bsc.png';
  if (type !== 'eth') {
    numberText = '2.';
    walletText = 'Receiving wallet';
    walletUrl = 'https://polkadot.js.org/extension/';
    networkText = 'Polkadot';
    walletIcon = '/images/icon_polka.png';
    commentText = 'Required to receive tokens during a give away';
  }

  return (
    <Flex
      marginBottom={'24px'}
      position={'relative'}
      flexDirection={'column'}
      width={['100%', '100%', '466px']}
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
          <WalletText>
            {walletConnected
              ? isWrongNetwork
                ? 'Wrong network'
                : shortenPolkaAddress(walletAddress)
              : networkText}
          </WalletText>
        </Flex>
        <Flex>
          {!walletConnected && !verified && (
            <Button height="36px" variant="primary" onClick={connectWallet}>
              Connect wallet
            </Button>
          )}
          {!verified && walletConnected && !isWrongNetwork && (
            <Button height="36px" variant="primary" onClick={verifyWallet}>
              Verify
            </Button>
          )}
          {!verified && walletConnected && isWrongNetwork && (
            <Button height="36px" variant="primary" onClick={switchToBSC}>
              Switch
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

      {error.length > 0 && (
        <Text
          color="#EC305D"
          fontFamily="Poppins"
          fontSize="14px"
          fontWeight="500"
          marginTop="5px"
        >
          {error}
        </Text>
      )}

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
        href={walletUrl}
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

export default WalletCard;
