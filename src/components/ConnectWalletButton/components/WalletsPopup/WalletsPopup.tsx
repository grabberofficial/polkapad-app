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
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import bscIcon from '@/assets/bsc_icon.svg';
import styled from '@emotion/styled';

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
      <ModalContent minWidth={['100%', '500px']}>
        <ModalHeader fontSize="24px" paddingLeft="70px" marginTop="32px">
          Connect an EVM Wallet
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody padding="0px 70px">
          <WalletPopupItem
            text={isMetamaskAvailable ? 'Metamask' : 'Install Metamask'}
            icon="/images/metamask.svg"
            onClick={onConnect}
          />
          <WalletPopupItem isComingSoon text="Binance Wallet" icon={bscIcon} />
          <Text
            marginTop="24px"
            fontFamily="Poppins"
            fontSize="12px"
            color="secondary.text"
          >
            By connecting a wallet, you agree to the
            <GoogleDocsViewer
              title="Terms and Service"
              fileUrl="https://drive.google.com/file/d/1QxeZEdb-QzQy5Ra6eD8kJcmPS1khLiAq/preview"
              control={(props) => (
                <DocUrl {...props}> Terms & Conditions</DocUrl>
              )}
            />{' '}
            and acknowledge that you have read and understand our
            <GoogleDocsViewer
              title="Privacy Policy"
              fileUrl="https://drive.google.com/file/d/1kO34-LSkXup8c3vsspK0XILTKvKoxw8k/preview"
              control={(props) => <DocUrl {...props}> Privacy Policy</DocUrl>}
            />
            .
          </Text>
        </ModalBody>
        <ModalFooter
          marginTop="32px"
          padding="20px 70px"
          borderTop="1px solid var(--chakra-colors-primary-border)"
        >
          <Button variant="primary">Learn how to connect</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const DocUrl = styled.span`
  cursor: pointer;
  font-weight: 900;

  &:hover {
    text-decoration: underline;
  }
`;
