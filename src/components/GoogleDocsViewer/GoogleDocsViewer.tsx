import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Flex, Modal, Spinner } from '@chakra-ui/react';

import { Button } from '../common/Button';

interface GoogleDocsViewerProps {
  title: string;
  fileUrl: string;
  control: React.FC<{ onClick: () => void }>;
}

const style = {
  height: '65vh',
  width: '100%',
  border: 'none',
};

export const GoogleDocsViewer = (props: GoogleDocsViewerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setIsLoading] = useState(true);

  const onLoad = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  return (
    <>
      <props.control onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minHeight="80vh" minWidth="80vw">
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading && (
              <Flex
                backgroundColor="#fff"
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                right={0}
              >
                <Spinner position="absolute" top="50%" left="50%" />
              </Flex>
            )}
            <iframe
              title={props.title}
              src={props.fileUrl}
              style={style}
              onLoad={onLoad}
            ></iframe>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" width="100px" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
