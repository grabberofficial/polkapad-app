import React, { useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

import {
  Flex,
  Heading,
  Text,
  Link,
  Image,
  usePrevious,
} from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import fetchJson, { FetchError } from '@/services/fetchJson';
import { useConnectBSC } from '@/hooks/useConnectBSC';
import { serviceUrl } from '@/config/env';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/router';
import { sendMetricsWalletAdded } from '@/services/metrics';
import { MOBILE_WALLET_ROUTE } from '@/constants/routes';
import bscIcon from '@/assets/bsc_icon.svg';
import { shortenPolkaAddress } from '@/utils/wallets';
import { usePolkadotExtension } from '@/hooks/usePolkadotExtension';
import { PolkadotWalletButton } from '@/components/PolkadotWalletButton/PolkaWalletButton';
import { BSCWalletButton } from '@/components/BSCWalletButton/BSCWalletButton';
import { isProduction } from '@/utils/general';
import { ChainId } from '@usedapp/core';
import useUser from '@/hooks/useUser';

const WalletCard: React.FC<{
  type?: string;
  wallets: any[];
  verifyCallback: () => void;
}> = ({ type = 'eth', wallets, verifyCallback }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState('');
  const previousAddress = usePrevious(walletAddress);
  const [error, setError] = React.useState('');
  const isMobile = useIsMobile();
  const router = useRouter();
  const {
    account: bscAddress,
    chainId,
    isLoading: isBSCLoading,
    switchToBSC,
  } = useConnectBSC();
  const { address: polkaAddress, isLoading: isPolkaLoading } =
    usePolkadotExtension();

  const network = isProduction ? ChainId.BSC : ChainId.BSCTestnet;
  const isWrongNetwork = type === 'eth' && chainId !== network;

  useEffect(() => {
    if (wallets.length !== 0) {
      const wallet = wallets.find((wallet) => wallet.name === type);
      wallet !== undefined && setWalletAddress(wallet.value);
      setVerified(wallet !== undefined);
    }
  }, [wallets, type]);

  useEffect(() => {
    if (type === 'eth') {
      setWalletConnected(!!bscAddress);
      if (bscAddress) {
        setWalletAddress(bscAddress);
      }
    }
    if (type === 'polka') {
      setWalletConnected(!!polkaAddress);
      if (polkaAddress) {
        setWalletAddress(polkaAddress);
      }
    }
  }, [type, bscAddress, polkaAddress]);

  const verifyWallet = useCallback(async () => {
    let address;
    if (type === 'eth') {
      address = bscAddress;
    }
    if (type === 'polka') {
      address = polkaAddress;
    }
    if (walletAddress) address = walletAddress;

    try {
      setIsLoading(true);
      await fetchJson(
        `https://${serviceUrl}/wallets`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: type,
            value: address,
          }),
        },
        user?.token,
      );
      setVerified(true);
      setIsLoading(false);
      setWalletAddress(walletAddress);
      sendMetricsWalletAdded();
      verifyCallback();
    } catch (e) {
      const typedError = e as FetchError;
      setError(typedError.data.message);
      setIsLoading(false);
    }
  }, [
    type,
    walletAddress,
    user?.token,
    bscAddress,
    polkaAddress,
    verifyCallback,
  ]);

  const connectMobileWallet = useCallback(() => {
    if (isMobile) {
      router.push(MOBILE_WALLET_ROUTE);
    }
  }, [isMobile, router]);

  useEffect(() => {
    if (walletAddress !== previousAddress) {
      setError('');
    }
  }, [walletAddress, previousAddress]);

  let numberText = '1';
  let walletText = 'Funding network';
  let walletUrl = 'https://metamask.io/';
  let networkText = 'BNB Smart chain';
  let commentText =
    'Accepted: DOT or KSM from Binance Smart Chain (EVM) with the lowest fees.';
  let walletIcon = bscIcon;
  if (type !== 'eth') {
    numberText = '2';
    walletText = 'Receiving network';
    walletUrl = 'https://polkadot.js.org/extension/';
    networkText = 'Polkadot';
    walletIcon = '/images/polkadot-logo.svg';
    commentText = 'Required to receive tokens during a giveaway';
  }

  return (
    <Flex
      marginBottom={'24px'}
      position={'relative'}
      flexDirection={'column'}
      width={['100%', '100%', '100%', '100%', '466px']}
      padding={['16px', '26px 50px']}
      border={'1px solid #E9E9E9'}
      borderRadius="4px"
    >
      {!isMobile && <Label>{numberText}</Label>}
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
        border="1px solid var(--chakra-colors-primary-border)"
        borderColor={verified ? 'primary.basic' : 'primary.border'}
        borderRadius={'4px'}
      >
        <Flex alignItems={'center'}>
          <Image
            margin="0px 14px 0px 11px"
            src={walletIcon}
            alt="Polkapad"
            width="29px"
            height="29px"
            borderRadius="50%"
          />
          <WalletText>
            {((verified && walletAddress) || (!verified && walletConnected)) &&
              shortenPolkaAddress(walletAddress)}
            {!verified && !walletConnected && networkText}
          </WalletText>
        </Flex>
        <Flex>
          {!walletConnected && !verified && !isMobile && type === 'eth' && (
            <BSCWalletButton isVerify />
          )}
          {!walletConnected && !verified && !isMobile && type === 'polka' && (
            <PolkadotWalletButton isVerify />
          )}
          {!walletConnected && !verified && isMobile && (
            <Button
              height="36px"
              variant="primary"
              onClick={connectMobileWallet}
            >
              Connect
            </Button>
          )}
          {!verified && walletConnected && !isWrongNetwork && (
            <Button
              height="36px"
              variant="primary"
              onClick={verifyWallet}
              isLoading={isLoading || isPolkaLoading || isBSCLoading}
            >
              Verify
            </Button>
          )}
          {!verified && walletConnected && isWrongNetwork && (
            <Button
              height="36px"
              variant="primary"
              onClick={switchToBSC}
              isLoading={isLoading || isPolkaLoading || isBSCLoading}
            >
              Switch network
            </Button>
          )}
          {verified && (
            <Image
              marginRight="10px"
              src="/images/icon_ok.svg"
              alt="Polkapad"
              width="20px"
              height="20px"
            />
          )}
        </Flex>
      </Flex>

      {error.length > 0 && (
        <Text
          color="error"
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
        color="primary.basic"
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

  @media (max-width: 500px) {
    padding-left: 10px;
  }
`;

export default WalletCard;
