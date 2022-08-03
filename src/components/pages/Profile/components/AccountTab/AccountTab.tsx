import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { FormInput } from '@/components/common/FormInput/FormInput';
import { MdEmail } from 'react-icons/md';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfilePageSchema } from '@/components/pages/Profile/ProfilePage.schema';
import useUser from '@/hooks/useUser';
import { Button } from '@/components/common/Button';
import { LOGIN_ROUTE } from '@/constants/routes';

interface IFormInput {
  email: string;
  name: string;
}

interface AccountTabProps {
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

export const AccountTab = ({ setSelectedTab }: AccountTabProps) => {
  const { user } = useUser({
    redirectTo: LOGIN_ROUTE,
  });

  const { control, reset } = useForm<IFormInput>({
    resolver: yupResolver(ProfilePageSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
      });
    }
  }, [user, reset]);

  return (
    <Flex
      flexBasis="356px"
      as="form"
      flexDirection="column"
      gap="28px"
      key="details"
      minHeight="366px"
    >
      <FormControl isInvalid={false} isDisabled>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
            <Flex
              height="21px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderRight="1px solid #E0E0E0"
            >
              <Icon
                as={FaUser}
                height="21px"
                width="21px"
                color="primary.basic"
              />
            </Flex>
          </InputLeftElement>
          <FormInput fieldName="name" hasError={false} control={control} />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={false} isDisabled>
        <FormLabel htmlFor="email">Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
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
                color="primary.basic"
              />
            </Flex>
          </InputLeftElement>
          <FormInput fieldName="email" hasError={false} control={control} />
        </InputGroup>
      </FormControl>
      <Button
        width="80px"
        marginTop="20px"
        variant="primary"
        onClick={() => setSelectedTab(1)}
      >
        Next
      </Button>
    </Flex>
  );
};
