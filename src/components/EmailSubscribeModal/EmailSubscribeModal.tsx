import { useDisclosure } from '@chakra-ui/hooks';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
  Modal,
  Spinner,
} from '@chakra-ui/react';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@/components/common/Button';
import { useCallback, useState } from 'react';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mailchimpSendEmailSubscription } from '@/services/mailchimp';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdEmail } from 'react-icons/md';
import { FormInput } from '../common/FormInput/FormInput';

interface EmailSubscribeModalProps {
  control: React.FC<{ onClick: () => void }>;
}

interface FormInput {
  email: string;
}

const schema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
  })
  .required();

export const EmailSubscribeModal = (props: EmailSubscribeModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const {
    control: formControl,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = useCallback(
    async ({ email }) => {
      setLoading(true);
      await mailchimpSendEmailSubscription(email);
      setLoading(false);
      onClose();
    },
    [onClose],
  );

  return (
    <>
      <props.control onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="250px" width={['100%', '500px']}>
          <ModalHeader>Subscribe for latest updates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.email} height="106px">
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    width="55px"
                    height="100%"
                  >
                    <Flex
                      height="21px"
                      width="100%"
                      justifyContent="center"
                      alignItems="center"
                      borderRight="1px solid #E0E0E0"
                    >
                      <Icon
                        as={MdEmail}
                        height="21px"
                        width="21px"
                        color={errors.email ? 'error' : 'primary.basic'}
                      />
                    </Flex>
                  </InputLeftElement>
                  <FormInput
                    fieldName="email"
                    control={formControl}
                    hasError={!!errors.email}
                  />
                </InputGroup>
                {errors.email && (
                  <FormErrorMessage
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="error"
                  >
                    {errors.email.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Flex justifyContent="flex-end">
                <Button variant="primary" width="100px" type="submit">
                  {loading ? <Spinner /> : 'Subscribe'}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
