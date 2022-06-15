import React, { useContext, useEffect, useCallback, useState } from 'react';
import styled from '@emotion/styled';

import {
  Flex,
  Heading,
  Text,
  Link,
  Image,
  usePrevious,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { Button } from '@/components/Button';
import { UserContext } from '@/shared/providers/userContext';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { shortenPolkaAddress } from '@/lib/utils';
import { useSubstrate } from '@/shared/providers/substrate';
import { serviceUrl } from '@/config/env';
import { ChainId } from '@usedapp/core';

const StyledButton = styled(ChakraButton)`
  color: #49c7da;
`;

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
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((isOpen) => !isOpen);
  }, []);

  const { connenctToBSC, chainId, switchToBSC } = useConnectBSC();
  const {
    canUseWallet,
    account: polkaAccount,
    connectToPolka,
  } = useSubstrate();

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
    if (type === 'polka' && canUseWallet) {
      setWalletConnected(!!polkaAccount);
      if (polkaAccount) {
        setWalletAddress(polkaAccount);
      }
    }
  }, [type, polkaAccount, userContext.bsc?.address, canUseWallet]);

  const connectWallet = useCallback(async () => {
    if (type === 'eth') {
      await connenctToBSC();
    }
    if (
      type === 'polka' &&
      connectToPolka &&
      typeof connectToPolka === 'function'
    ) {
      if (!canUseWallet) {
        toggleModal();
        return;
      } else {
        await connectToPolka();
      }
    }
    setWalletConnected(true);
  }, [connectToPolka, connenctToBSC, type, canUseWallet]);

  const verifyWallet = useCallback(async () => {
    let address;
    if (type === 'eth') {
      address = userContext.bsc?.address;
    }
    if (type === 'polka') {
      address = userContext.polka?.address ?? polkaAccount;
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
  }, [type, userContext, walletAddress, verifyCallback, polkaAccount]);

  useEffect(() => {
    if (walletAddress !== previousAddress) {
      setError('');
    }
  }, [walletAddress, previousAddress]);

  let numberText = '1';
  let walletText = 'Funding wallet';
  let walletUrl = 'https://metamask.io/';
  let networkText = 'BNB Smart chain';
  let commentText =
    'Accepted: DOT or KSM from Binance Smart Chain (EVM) with the lowest fees.';
  let walletIcon = '/images/icon_bsc.png';
  if (type !== 'eth') {
    numberText = '2';
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
            {((verified && walletAddress) || (!verified && walletConnected)) &&
              shortenPolkaAddress(walletAddress)}
            {!verified && !walletConnected && networkText}
            {!verified && walletConnected && isWrongNetwork && 'Wrong network'}
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
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent width="80%">
          <ModalHeader>Haven’t got a Polkadot.js yet?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You&apos;ll need to{' '}
            <StyledButton
              variant="link"
              as="a"
              target="_blank"
              href="https://polkadot.js.org/extension/"
            >
              install Polkadot.js
            </StyledButton>{' '}
            to continue. Once you have it installed, go ahead and refresh this
            page
            <br />
            <br />
            Polkadot extension was not found or is disabled. If you have
            polkadot.js but it doesn&apos;t work try this:
            <br />
            <br />
            <ol style={{ padding: '0 24px 24px' }}>
              <li>Reload this page. </li>
              <li>
                Check that you use the latest version of Chrome or Firefox.{' '}
              </li>
              <li>
                If you reject polkadot.js connection go polkadot.js extension in
                your browser, press gear button and check Manage Website Access.
                App.Polkapad.network should be allowed to use Polkapad
                launchpad.{' '}
              </li>
              <li>
                How to troubleshoot other connection issues on polkadot.js{' '}
                {'->'}{' '}
                <StyledButton
                  variant="link"
                  as="a"
                  target="_blank"
                  href="https://support.polkadot.network/support/solutions/articles/65000176918-how-to-troubleshoot-connection-issues-on-polkadot-js"
                >
                  Polkadot support webpage
                </StyledButton>
                .
              </li>
            </ol>
          </ModalBody>
        </ModalContent>
      </Modal>
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
