import { Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import fetchJson, { FetchError } from '@/services/fetchJson';
import {
  API_VERIFY_CODE_ROUTE,
  AUTH_EMAIL_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
} from '@/constants/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthEmailPageSchema } from '@/components/pages/AuthEmail/AuthEmailPage.schema';
import { FormInput } from '@/components/common/FormInput/FormInput';
import styled from '@emotion/styled';
import { AUTH_EMAIL_TYPES } from '@/components/pages/AuthEmail/AuthEmailPage.constants';
import { useRouter } from 'next/router';
import { setToken } from '@/utils/auth';
import useUser, { User } from '@/hooks/useUser';
import { ExceptionTypeEnum } from '@/constants/error';

interface VerifyCodeFormInput {
  code: string;
}

interface VerifyCodeResponse {
  email: string;
  type: AUTH_EMAIL_TYPES;
  token?: string;
}

export const VerifyCodePage = () => {
  const { mutateUser } = useUser({
    redirectTo: PROFILE_ROUTE,
    redirectIfFound: true,
  });

  const { control, handleSubmit, getValues, reset } =
    useForm<VerifyCodeFormInput>({
      resolver: yupResolver(AuthEmailPageSchema),
    });
  const router = useRouter();
  const { email } = router.query;
  const code = useWatch({ control, name: 'code' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSubmit: SubmitHandler<VerifyCodeFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const { type, token } = await fetchJson<VerifyCodeResponse>(
          API_VERIFY_CODE_ROUTE,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code: data.code }),
          },
        );
        setLoading(false);
        setError(null);

        if (type === AUTH_EMAIL_TYPES.SIGN_IN && token) {
          await mutateUser(setToken(token) as unknown as Promise<User>);
        }

        if (type === AUTH_EMAIL_TYPES.SIGN_UP) {
          router.push(
            { pathname: REGISTER_ROUTE, query: { email, code } },
            REGISTER_ROUTE,
          );
        }
      } catch (error) {
        setLoading(false);
        reset();
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.IncorrectEmailOrCode:
              setError('Incorrect code, try again');
              break;
            default:
              setError('Something went wrong');
          }
        }
      }
    },
    [code, email, mutateUser, reset, router],
  );

  useEffect(() => {
    if (code?.length > 5) {
      onSubmit(getValues());
      setLoading(true);
    }
  }, [code, handleSubmit]);

  useEffect(() => {
    if (!email) {
      router.push(AUTH_EMAIL_ROUTE);
    }
  }, [email]);

  return (
    <Grid
      maxWidth="560px"
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
        Enter code
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
        We just sent you a temporary login code to
        <Text fontWeight={600}>{email}</Text>
        <br />
        Please check your inbox.
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
        onChange={() => setError(null)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {loading ? (
          <Flex justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        ) : (
          <Flex direction="column" paddingLeft="100px">
            <FormInput
              fieldName="code"
              control={control}
              backgroundColor="transparent"
              type="password"
              border="none"
              fontSize="40px"
              maxLength={6}
              _focusVisible={{ border: 'none' }}
              letterSpacing={42}
              padding="16px"
              autoComplete="off"
              autoSave="off"
            />
            <Flex gap="12px">
              <Dash />
              <Dash />
              <Dash />
              <Dash />
              <Dash />
              <Dash />
            </Flex>
          </Flex>
        )}
        <Flex justifyContent="center">
          <Text color="error">{error}</Text>
        </Flex>
      </form>
    </Grid>
  );
};

const Dash = styled.div`
  height: 1px;
  width: 47px;
  background-color: var(--chakra-colors-background-dark);
`;
