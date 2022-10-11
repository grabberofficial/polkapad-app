import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { FormInput } from '@/components/common/FormInput/FormInput';
import fetchJson, { FetchError } from '@/services/fetchJson';
import useUser, { User } from '@/hooks/useUser';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Icon,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordButton } from '@/components/common/PasswordButton/PasswordButton';
import { useRouter } from 'next/router';
import {
  LoginPageSchema,
  LoginPageSchema2,
} from '@/components/pages/Login/LoginPage.schema';
import { EMAIL_ERROR_TYPES } from '@/components/pages/Login/LoginPage.constants';
import {
  API_LOGIN_ROUTE,
  API_SEND_CODE_ROUTE,
  AUTH_VERIFY_CODE_ROUTE,
  PROFILE_ROUTE,
} from '@/constants/routes';
import { ExceptionTypeEnum } from '@/constants/error';
import { HiOutlineMail } from 'react-icons/hi';
import styled from '@emotion/styled';
import { ApiSendCodeResponse } from '@/components/pages/AuthEmail/AuthEmailPage';
import {
  AUTH_EMAIL_TYPES,
  LOGIN_TYPES,
} from '@/components/pages/AuthEmail/AuthEmailPage.constants';
import { setToken } from '@/utils/auth';

// TODO: server-side redirect from login page if user is already logged in

interface IFormInput {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const [loginMode, setLoginMode] = useState<LOGIN_TYPES>(LOGIN_TYPES.PASSWORD);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IFormInput>({
    resolver: yupResolver(
      loginMode === LOGIN_TYPES.PASSWORD ? LoginPageSchema : LoginPageSchema2,
    ),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password',
  );
  const { email } = router.query;
  const { mutateUser } = useUser({
    redirectTo: PROFILE_ROUTE,
    redirectIfFound: true,
  });

  useEffect(() => {
    if (errors.email?.type === EMAIL_ERROR_TYPES.CUSTOM && !errors.password) {
      clearErrors();
    }
  }, [clearErrors, errors.email, errors.password]);

  const sendLoginCode = useCallback(
    async (email: string) => {
      const { type } = await fetchJson<ApiSendCodeResponse>(
        API_SEND_CODE_ROUTE,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, isAuthorize: true }),
        },
      );

      if (type === AUTH_EMAIL_TYPES.SIGN_IN) {
        router.push(
          { pathname: AUTH_VERIFY_CODE_ROUTE, query: { email } },
          AUTH_VERIFY_CODE_ROUTE,
        );
      }
    },
    [router],
  );

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);

        if (loginMode === LOGIN_TYPES.PASSWORD) {
          await mutateUser(
            (async () => {
              const token = await fetchJson<string>(API_LOGIN_ROUTE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data }),
              });

              setToken(token);
            })() as unknown as Promise<User>,
          );
        } else {
          sendLoginCode(data.email);
        }

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
    [loginMode, mutateUser, sendLoginCode, setError],
  );

  const handleCodeLogin = useCallback(async () => {
    try {
      clearErrors();
      if (email) {
        sendLoginCode(email as string);
      } else {
        setLoginMode(LOGIN_TYPES.CODE);
      }
    } catch (e) {
      console.error(e);
    }
  }, [clearErrors, email, sendLoginCode]);

  const handlePasswordLogin = useCallback(
    () => setLoginMode(LOGIN_TYPES.PASSWORD),
    [],
  );

  return (
    <Grid
      width="560px"
      margin="73px auto 0"
      flexDirection="column"
      justifyContent="center"
      paddingBottom="25px"
      backgroundColor="background.light"
    >
      <Text
        fontWeight="600"
        fontSize="32px"
        lineHeight="44px"
        color="#303030"
        textAlign="center"
        width={['350px', '350px', 'auto']}
      >
        Log in
      </Text>
      <Text
        fontWeight="400"
        fontSize="16px"
        lineHeight="24px"
        color="#303030"
        opacity={0.64}
        textAlign="center"
        marginTop="11px"
      >
        Please, enter your password to log in
      </Text>
      <form
        style={{
          margin: '65px 0 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '32px',
          minWidth: '560px',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputGroup>
            <FormInput
              isDisabled={!!email}
              hasRightElement
              defaultValue={email as string}
              fieldName="email"
              placeholder="mail@mail.com"
              control={control}
              hasError={!!errors.email}
            />
            <InputRightElement pointerEvents="none" width="55px" height="100%">
              <Flex
                height="21px"
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={HiOutlineMail}
                  height="21px"
                  width="21px"
                  color={errors.email ? 'error' : 'primary.basic'}
                />
              </Flex>
            </InputRightElement>
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
        {loginMode === LOGIN_TYPES.PASSWORD && (
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <FormInput
                hasRightElement
                fieldName="password"
                control={control}
                hasError={!!errors.password}
                fieldType={passwordType}
              />
              <PasswordButton
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
        )}
        <Flex
          justifyContent="space-between"
          fontSize="14px"
          alignItems="center"
        >
          <Flex width="50%">
            <Text whiteSpace="nowrap">Forgot password?</Text>{' '}
            <Url
              onClick={
                loginMode === LOGIN_TYPES.PASSWORD
                  ? handleCodeLogin
                  : handlePasswordLogin
              }
            >
              {loginMode === LOGIN_TYPES.PASSWORD
                ? 'Login with code'
                : 'Login with password'}
            </Url>
          </Flex>
          <Button
            variant="primary"
            type="submit"
            width="138px"
            disabled={Object.keys(errors).length > 0}
          >
            {loading ? <Spinner /> : 'Start'}
          </Button>
        </Flex>
      </form>
    </Grid>
  );
};

const Url = styled.span`
  text-decoration: underline;
  color: var(--chakra-colors-accent-blue);
  cursor: pointer;
  white-space: nowrap;
  margin-left: 5px;
  transition: transform 300ms;

  &:hover {
    text-decoration: none;
    color: #5cbaec;
  }
`;
