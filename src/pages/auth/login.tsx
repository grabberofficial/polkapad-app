import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { object, string } from 'yup';
import { BiHide, BiShow } from 'react-icons/bi';

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
  Spinner,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordButton } from '@/components/PasswordButton/PasswordButton';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { useRouter } from 'next/router';

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

enum EMAIL_ERROR_TYPES {
  CUSTOM = 'custom',
  VALIDATE = 'validate',
}

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password',
  );
  const { mutateUser } = useUser({
    redirectTo: '/profile',
    redirectIfFound: true,
  });

  useEffect(() => {
    if (errors.email?.type === EMAIL_ERROR_TYPES.CUSTOM && !errors.password) {
      clearErrors();
    }
  }, [clearErrors, errors.email, errors.password]);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        await mutateUser(
          await fetchJson('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, authType: 'password' }),
          }),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.IncorrectEmailOrPassword:
              setError('email', {
                type: EMAIL_ERROR_TYPES.CUSTOM,
              });
              setError('password', {
                message: 'Incorrect email or password',
                type: EMAIL_ERROR_TYPES.VALIDATE,
              });
              break;
            // TODO: other errors handling
            // case '':
          }
        }
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
        width={['350px', '350px', 'auto']}
      >
        Welcome to&nbsp;
        <Text as="span" color="primary.basic">
          Polkapad
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
        Log in with your email address
      </Text>
      <form
        style={{
          margin: '65px 0 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '22px',
          minWidth: '350px',
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
                  color={errors.email ? 'error' : 'primary.basic'}
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
              color="error"
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
                  color={errors.password ? 'error' : 'primary.basic'}
                />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="password"
              control={control}
              hasError={!!errors.password}
              fieldType={passwordType}
            />
            <PasswordButton
              as={passwordType === 'password' ? BiShow : BiHide}
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />
          </InputGroup>
          {errors.password && (
            <FormErrorMessage
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="error"
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
          {loading ? <Spinner /> : 'Log in'}
        </Button>
        {isMobile && (
          <Button
            variant="secondary"
            color="primary.basic"
            onClick={() => router.push('/auth/register')}
          >
            Sign up
          </Button>
        )}
      </form>
      <Text
        fontWeight="600"
        fontSize="14px"
        lineHeight="21px"
        color="secondary.text"
        marginTop="69px"
        textAlign="center"
        justifyContent="space-between"
        display="flex"
      >
        <Flex>
          Send
          <Link href="/auth/send-code">
            <Text
              cursor="pointer"
              color="primary.basic"
              _hover={{ color: 'primary.hover' }}
              marginLeft="6px"
            >
              magic link
            </Text>
          </Link>
        </Flex>
        <Flex>
          <Link href="/auth/restore-password">
            <Text
              cursor="pointer"
              color="primary.basic"
              _hover={{ color: 'primary.hover' }}
              marginRight="6px"
            >
              Forgot
            </Text>
          </Link>
          password?
        </Flex>
      </Text>
    </Grid>
  );
};

export default LoginPage;
