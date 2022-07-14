import { Modal, Text } from '@chakra-ui/react';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useCallback } from 'react';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { WalletPopupItem } from '@/components/ConnectWalletButton/components/WalletsPopup/components/WalletPopupItem';
import { Button } from '@/components/Button';

interface WalletsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletsPopup = ({ isOpen, onClose }: WalletsPopupProps) => {
  const isMetamaskAvailable = !!window.ethereum;
  const { connectToBSC } = useConnectBSC();

  const onConnect = useCallback(() => {
    connectToBSC();
    onClose();
  }, [connectToBSC, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={['100%', '500px']}>
        <ModalHeader>Connect an EVM Wallet</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <WalletPopupItem
            text={isMetamaskAvailable ? 'Metamask' : 'Install Metamask'}
            icon="/images/metamask.svg"
            onClick={onConnect}
          />
          <WalletPopupItem text="Binance Wallet" icon="/images/icon_bsc.png" />
          <Text
            marginTop="24px"
            fontFamily="Poppins"
            fontSize="12px"
            color="secondary.text"
          >
            By connecting a wallet, you agree to the Terms & Conditions and
            acknowledge that you have read and understand our Privacy Policy.
          </Text>
        </ModalBody>
        <ModalFooter
          marginTop="32px"
          borderTop="1px solid var(--chakra-colors-primary-border)"
        >
          <Button variant="primary">Learn how to connect</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
