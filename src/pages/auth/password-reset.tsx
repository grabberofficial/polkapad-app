import { Button } from '@/components/Button';
import {
  FormControl,
  FormLabel,
  Grid,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  Flex,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { object, ref, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useCallback, useState } from 'react';
import { FormInput } from '@/components/FormInput/FormInput';
import { RiLock2Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { ExceptionTypeEnum } from '@/lib/constants';
import { serviceUrl } from '@/config/env';

interface IFormInput {
  newPassword: string;
  confirmNewPassword: string;
}

const schema = object()
  .shape({
    newPassword: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: string()
      .oneOf([ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })
  .required();

const ChangePasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      const { email, code } = router.query;
      if (!email || !code) return;
      try {
        setLoading(true);
        const res: { code: string; message: string } = await fetchJson(
          `https://${serviceUrl}/auth/password/change`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: email,
              password: data.newPassword,
              code: code,
            }),
          },
        );
        setLoading(false);

        res.message === 'ok' && setIsSent(true);
      } catch (error) {
        setLoading(false);
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.NotFound:
              setError('newPassword', {
                type: 'validate',
              });
              setError('confirmNewPassword', {
                type: 'validate',
                message: 'Link is expired',
              });
              break;
            // TODO: other errors handling
            // case '':
          }
        }
      }
    },
    [router, setError],
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
        Change password
      </Text>
      <Text
        fontWeight="400"
        fontSize="18px"
        lineHeight="29px"
        color="#303030"
        textAlign="center"
        marginTop="11px"
      >
        Please enter data for password change
      </Text>
      {isSent ? (
        <Flex marginTop="85px" flexDirection="column" alignItems="center">
          <Icon
            as={BsFillCheckCircleFill}
            width="95px"
            height="95px"
            color="#49C7DA"
          />
          <Text
            fontWeight="700"
            fontSize="14px"
            lineHeight="23px"
            color="#303030"
            marginTop="32px"
            maxWidth="215px"
            textAlign="center"
          >
            You have susscessfully changed password
          </Text>
        </Flex>
      ) : (
        <>
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
            <FormControl isInvalid={!!errors.newPassword}>
              <FormLabel htmlFor="newPassword">Password</FormLabel>
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
                      as={RiLock2Fill}
                      height="21px"
                      width="21px"
                      color={errors.newPassword ? '#EC305D' : '#49C7DA'}
                    />
                  </Flex>
                </InputLeftElement>
                <FormInput
                  fieldName="newPassword"
                  fieldType="password"
                  control={control}
                  hasError={!!errors.newPassword}
                />
              </InputGroup>
              {errors.newPassword && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="#EC305D"
                >
                  {errors.newPassword.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.confirmNewPassword}>
              <FormLabel htmlFor="password-confirm">Confirm Password</FormLabel>
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
                      as={RiLock2Fill}
                      height="21px"
                      width="21px"
                      color={errors.confirmNewPassword ? '#EC305D' : '#49C7DA'}
                    />
                  </Flex>
                </InputLeftElement>
                <FormInput
                  fieldName="confirmNewPassword"
                  fieldType="password"
                  control={control}
                  hasError={!!errors.confirmNewPassword}
                />
              </InputGroup>
              {errors.confirmNewPassword && (
                <FormErrorMessage
                  fontWeight="400"
                  fontSize="12px"
                  lineHeight="18px"
                  color="#EC305D"
                >
                  {errors.confirmNewPassword.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <Button variant="primary" type="submit">
              {loading ? <Spinner /> : 'Change'}
            </Button>
          </form>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="21px"
            color="#303030"
            marginTop="69px"
            textAlign="center"
          >
            {'Back to '}
            <Link href="/auth/login">
              <Text as="a" href="/auth/login" color="#49C7DA">
                Login
              </Text>
            </Link>
          </Text>
        </>
      )}
    </Grid>
  );
};

export default ChangePasswordPage;
