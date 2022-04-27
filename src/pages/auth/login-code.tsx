import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput/FormInput';
// , { FetchError }
import fetchJson from '@/lib/fetchJson';
import useUser from '@/lib/hooks/useUser';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { object, string } from 'yup';

// TODO: server-side redirect from login page if user is already logged in

interface IFormInput {
  email: string;
  code: string;
}

const schema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    code: string().required('Code is required'),
  })
  .required();

const LoginCodePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });
  // const { push } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        mutateUser(
          await fetchJson('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, authType: 'code' }),
          }),
        );
      } catch (error) {
        // TODO: error handling
        // if (error instanceof FetchError) {
        //   setErrorMsg(error.data.message)
        // } else {
        //   console.error('An unexpected error happened:', error)
        // }
        console.error({ error });
      }
    },
    [mutateUser],
  );

  return (
    <Grid
      maxWidth="700px"
      margin="73px auto 0"
      flexDirection="column"
      justifyContent="center"
      borderBottom="1px solid #ECEBEB"
      borderLeft="1px solid #ECEBEB"
      borderRight="1px solid #ECEBEB"
      borderRadius="4px"
      paddingBottom="25px"
    >
      <Text
        fontWeight="600"
        fontSize="50px"
        lineHeight="62px"
        color="#303030"
        textAlign="center"
      >
        Welcome to{' '}
        <Text as="span" color="#49C7DA">
          Polkadot
        </Text>
      </Text>
      <Text
        fontWeight="400"
        fontSize="18px"
        lineHeight="29px"
        color="#303030"
        textAlign="center"
        marginTop="11px"
      >
        Sign up with your email address
      </Text>
      <form
        style={{
          margin: '65px 0 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '22px',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.email}>
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
                  color={errors.email ? '#EC305D' : '#49C7DA'}
                />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="email"
              control={control}
              hasError={!!errors.email}
            />
          </InputGroup>
          {errors.email && (
            <FormErrorMessage
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="#EC305D"
            >
              {errors.email.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.code}>
          <FormLabel htmlFor="code">Code</FormLabel>
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
                  as={RiLock2Fill}
                  height="21px"
                  width="21px"
                  color={errors.code ? '#EC305D' : '#49C7DA'}
                />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="code"
              control={control}
              hasError={!!errors.code}
              fieldType="text"
            />
          </InputGroup>
          {errors.code && (
            <FormErrorMessage
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="#EC305D"
            >
              {errors.code.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button
          variant="primary"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Login
        </Button>
      </form>
      <Text
        fontWeight="600"
        fontSize="14px"
        lineHeight="21px"
        color="#303030"
        marginTop="69px"
        textAlign="center"
        justifyContent="space-between"
        display="flex"
      >
        <Link href="/auth/send-code">Send magic link</Link>
        <Link href="/auth/forgotPassword">Forgot password?</Link>
        <Link href="/auth/register">
          <Text as="a" href="/auth/register" color="#49C7DA">
            Create an account
          </Text>
        </Link>
      </Text>
    </Grid>
  );
};

export default LoginCodePage;
