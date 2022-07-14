import React, { useCallback } from 'react';
import { Flex, Image, Link, Modal, Text } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { Button } from '@/components/Button';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import nationalIdIcon from '@/assets/national_id.svg';
import copyIcon from '@/assets/copy_icon.svg';
import externalLinkIcon from '@/assets/external_link.svg';
import historyIcon from '@/assets/history.svg';
import { shortenPolkaAddress } from '@/lib/utils';

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

  const onCopyAddress = useCallback(() => {
    account && navigator.clipboard.writeText(account);
    toast.success('Address copied');
  }, [account]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={['100%', '600px']} padding="0 20px">
        <ModalHeader
          fontSize="24px"
          fontFamily="Poppins"
          fontWeight={700}
          paddingLeft="40px"
          marginTop="32px"
        >
          <Flex>
            <Flex
              borderRadius="50%"
              backgroundColor="kycIcons"
              width="36px"
              height="36px"
              justifyContent="center"
              alignItems="center"
              marginRight="20px"
            >
              <Image src={nationalIdIcon} width="22px" height="14px" />
            </Flex>
            Account
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody padding="8px 36px">
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
            margin="10px -56px 0"
            padding="32px 48px"
            border="1px solid var(--chakra-colors-primary-border)"
          >
            <Flex
              fontFamily="Poppins"
              fontWeight={700}
              width="100%"
              backgroundColor="primary.grey"
              borderRadius="4px"
              marginRight="10px"
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
              {account && shortenPolkaAddress(account, 12)}
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
        <ModalFooter justifyContent="space-between" padding="20px 32px 30px">
          <Flex
            fontSize="12px"
            fontWeight={700}
            fontFamily="Poppins"
            alignItems="center"
            cursor="pointer"
            _hover={{ color: 'primary.basic' }}
            onClick={onCopyAddress}
          >
            <Image src={copyIcon} marginRight="10px" />
            Copy address
          </Flex>
          <Link
            fontSize="12px"
            fontWeight={700}
            fontFamily="Poppins"
            display="flex"
            alignItems="center"
            _hover={{ color: 'primary.basic' }}
            href={`https://testnet.bscscan.com/address/${account}`}
            isExternal
          >
            <Image src={externalLinkIcon} marginRight="10px" />
            View on Explorer
          </Link>
          <Flex
            fontSize="12px"
            fontWeight={700}
            fontFamily="Poppins"
            alignItems="center"
            _hover={{ color: 'primary.basic' }}
          >
            <Image src={historyIcon} marginRight="10px" />
            History
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
