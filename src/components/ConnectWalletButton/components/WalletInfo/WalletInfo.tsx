import { Flex, Image, Modal, Text } from '@chakra-ui/react';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { Button } from '@/components/Button';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React, { useCallback } from 'react';
import { shortenAddress } from '@usedapp/core';

interface WalletsInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletsInfo = ({ isOpen, onClose }: WalletsInfoProps) => {
  const { dotBalance, account, disconnectFromBSC } = useConnectBSC();

  const onDisconnect = useCallback(() => {
    disconnectFromBSC();
    onClose();
  }, [disconnectFromBSC, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        height="250px"
        minWidth={['100%', '600px']}
        padding="0 20px"
      >
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Flex justifyContent="space-between">
            <Flex flexDirection="column">
              <Text
                fontFamily="Poppins"
                fontSize="12px"
                color="secondary.textLight"
              >
                Balance
              </Text>
              <Text
                fontFamily="Poppins"
                fontSize="14px"
                fontWeight={600}
                color="secondary.text"
              >
                {`${dotBalance}`} DOT
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text
                fontFamily="Poppins"
                fontSize="12px"
                color="secondary.textLight"
              >
                Network
              </Text>
              <Text
                fontFamily="Poppins"
                fontSize="14px"
                fontWeight={600}
                color="secondary.text"
              >
                BSC
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text
                fontFamily="Poppins"
                fontSize="12px"
                color="secondary.textLight"
              >
                Wallet
              </Text>
              <Text
                fontFamily="Poppins"
                fontSize="14px"
                fontWeight={600}
                color="secondary.text"
              >
                Metamask
              </Text>
            </Flex>
          </Flex>
          <Flex
            margin="10px -44px"
            padding="32px 36px"
            border="1px solid var(--chakra-colors-primary-border)"
          >
            <Flex
              fontFamily="Poppins"
              fontWeight={700}
              width="100%"
              backgroundColor="primary.grey"
              borderRadius="4px"
              marginRight="4px"
              fontSize="16px"
              alignItems="center"
              padding="7px 10px"
            >
              <Image
                margin="0px 14px 0px 11px"
                src="/images/icon_bsc.png"
                alt="bsc"
                width="24px"
                height="24px"
              />
              {account && shortenAddress(account)}
            </Flex>
            <Button
              width="107px"
              height="36px"
              padding="14px 0"
              fontSize="14px"
              variant="primary"
              flexShrink={0}
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
