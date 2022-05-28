import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput/FormInput';
import { ExceptionTypeEnum } from '@/lib/constants';
// , { FetchError }
import fetchJson, { FetchError } from '@/lib/fetchJson';
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
  password: string;
}

const schema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    password: string().required('Password is required'),
  })
  .required();

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });
  // const { push } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        await mutateUser(
          await fetchJson('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, authType: 'password' }),
          }),
        );
      } catch (error) {
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.IncorrectEmailOrPassword:
              setError('email', {
                type: 'custom',
              });
              setError('password', {
                message: 'Incorrect email or password',
                type: 'validate',
              });
              break;
            // TODO: other errors handling
            // case '':
          }
        }

        console.log({ error });
      }
    },
    [mutateUser, setError],
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
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
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
                  color={errors.password ? '#EC305D' : '#49C7DA'}
                />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="password"
              control={control}
              hasError={!!errors.password}
              fieldType="password"
            />
          </InputGroup>
          {errors.password && (
            <FormErrorMessage
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="#EC305D"
            >
              {errors.password.message}
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
        <Link href="/auth/restore-password">Forgot password?</Link>
        <Link href="/auth/register">
          <Text as="a" href="/auth/register" color="#49C7DA">
            Create an account
          </Text>
        </Link>
      </Text>
    </Grid>
  );
};

export default LoginPage;
