import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '@/shared/providers/userContext';
import { Button } from '@/components/Button';
import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import styled from '@emotion/styled';
import { useSubstrate } from '@/shared/providers/substrate';

const StyledButton = styled(ChakraButton)`
  color: #49c7da;
`;

export const PolkaConnentBtn = () => {
  const { polka } = useContext(UserContext);
  const { balance, connectToPolka, keyringState, canUseWallet } =
    useSubstrate();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((isOpen) => !isOpen);
  }, []);

  const hasData = balance || (polka?.address && polka?.balance);

  return (
    <>
      {hasData && (
        <Button
          variant="secondary"
          width="auto"
          flexShrink={0}
          flexGrow={0}
          iconPlacement="left"
          padding="0 16px"
          icon={
            <Image
              src="/images/polkadot-logo.svg"
              alt="Polkapad"
              width="29px"
              height="29px"
              borderRadius="50%"
            />
          }
        >
          {balance && parseFloat(formatEther(balance)) * 1000000}
          {polka.balance && polka.balance}
          {' KSM'}
        </Button>
      )}
      {!hasData && (
        <Button
          onClick={canUseWallet ? connectToPolka : toggleModal}
          disabled={keyringState !== 'READY'}
          variant="secondary"
          width="auto"
          flexShrink={0}
          flexGrow={0}
          iconPlacement="left"
          padding="0 16px"
          icon={
            <Image
              src="/images/polkadot-logo.svg"
              alt="Polkapad"
              width="29px"
              height="29px"
              borderRadius="50%"
            />
          }
        >
          Connect
        </Button>
      )}
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
    </>
  );
};
