import { Modal, Text } from '@chakra-ui/react';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@/components/common/Button';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import styled from '@emotion/styled';
import { isProduction } from '@/utils/general';
import {
  PRIVACY_LINK,
  TERMS_LINK,
} from '@/components/GoogleDocsViewer/GoogleDocsViewer.constants';

interface WalletsPopupProps {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const WalletsPopup = ({
  title,
  isOpen,
  children,
  onClose,
}: WalletsPopupProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent minWidth={['100%', '500px']}>
      <ModalHeader fontSize="24px" paddingLeft="70px" marginTop="32px">
        {title}
      </ModalHeader>
      <ModalCloseButton onClick={onClose} />
      <ModalBody padding="0px 70px" marginBottom="32px">
        {children}
        <Text
          marginTop="24px"
          fontFamily="Poppins"
          fontSize="12px"
          color="secondary.text"
        >
          By connecting a wallet, you agree to the
          <GoogleDocsViewer
            title="Terms and Service"
            fileUrl={TERMS_LINK}
            control={(props) => <DocUrl {...props}> Terms & Conditions</DocUrl>}
          />{' '}
          and acknowledge that you have read and understand our
          <GoogleDocsViewer
            title="Privacy Policy"
            fileUrl={PRIVACY_LINK}
            control={(props) => <DocUrl {...props}> Privacy Policy</DocUrl>}
          />
          .
        </Text>
      </ModalBody>
      {!isProduction && (
        <ModalFooter
          padding="20px 70px"
          borderTop="1px solid var(--chakra-colors-border)"
        >
          <Button variant="primary">Learn how to connect</Button>
        </ModalFooter>
      )}
    </ModalContent>
  </Modal>
);

const DocUrl = styled.span`
  cursor: pointer;
  font-weight: 900;

  &:hover {
    text-decoration: underline;
  }
`;
