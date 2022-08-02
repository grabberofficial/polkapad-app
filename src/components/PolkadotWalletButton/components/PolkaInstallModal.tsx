import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal,
  ModalFooter,
} from '@chakra-ui/modal';
import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@/components/Button';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import styled from '@emotion/styled';
import walletNetworkIcon from '@/assets/wallet_network.svg';

interface PolkaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolkaInstallModal = ({
  isOpen,
  onClose,
}: PolkaInstallModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '600px']}>
        <ModalHeader fontSize="24px" paddingLeft="60px" marginTop="32px">
          <Flex alignItems="center">
            <Flex
              borderRadius="50%"
              backgroundColor="kycIcons"
              width="56px"
              height="56px"
              justifyContent="center"
              alignItems="center"
              marginRight="20px"
            >
              <Image src={walletNetworkIcon} width="30px" height="32px" />
            </Flex>
            Haven’t got a Polkadot.js yet?
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody padding="16px 60px">
          <Text fontFamily="Poppins" fontSize="14px" color="secondary.text">
            You&apos;ll need to install Polkadot.js to continue.
            <br />
            Once you have it installed, go ahead and refresh this page.
          </Text>
        </ModalBody>
        <ModalFooter
          padding="20px 60px"
          marginTop="32px"
          borderTop="1px solid var(--chakra-colors-primary-border)"
        >
          <Text
            fontFamily="Poppins"
            fontSize="12px"
            fontWeight={500}
            color="secondary.textLight"
          >
            By connecting, I accept Polkapad&apos;s{' '}
            <GoogleDocsViewer
              title="Terms and Service"
              fileUrl="https://drive.google.com/file/d/1QxeZEdb-QzQy5Ra6eD8kJcmPS1khLiAq/preview"
              control={(props) => <DocUrl {...props}>Terms of Service</DocUrl>}
            />
            .
          </Text>
          <Button
            marginLeft="25px"
            variant="primary"
            as="a"
            target="_blank"
            href="https://polkadot.js.org/extension/"
          >
            {'Install Polkadot{.js} Extension'}
          </Button>{' '}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DocUrl = styled.span`
  color: var(--chakra-colors-secondary-text);
  cursor: pointer;
`;
