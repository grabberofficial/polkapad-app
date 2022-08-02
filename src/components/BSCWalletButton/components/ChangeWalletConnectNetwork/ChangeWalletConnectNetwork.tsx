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
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import styled from '@emotion/styled';
import walletNetworkIcon from '@/assets/wallet_network.svg';

interface ChangeWalletConnectNetworkProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeWalletConnectNetwork = ({
  isOpen,
  onClose,
}: ChangeWalletConnectNetworkProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '500px']}>
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
            Change Network
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody padding="16px 60px">
          <Text fontFamily="Poppins" fontSize="14px" color="secondary.text">
            Please open the wallet app you have connected and switch network to
            Binance Smart Chain.
            <br />
            <br />
            Once the network is switched, the wallet would be reconnected
            automatically.
          </Text>
        </ModalBody>
        <ModalFooter
          padding="20px 60px"
          marginTop="32px"
          borderTop="1px solid var(--chakra-colors-primary-border)"
          justifyContent="flex-start"
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DocUrl = styled.span`
  color: var(--chakra-colors-secondary-text);
  cursor: pointer;
`;
