import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput/FormInput';
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
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { object, ref, string } from 'yup';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useRouter } from 'next/router';
import { ExceptionTypeEnum } from '@/lib/constants';
import { gtagSendCreateAccount } from '@/services/analytics';
import { serviceUrl } from '@/config/env';
import { PromoCodeIcon } from '@/components/icons/PromoCodeIcon';
import { mailchimpSendAccountCreated } from '@/services/mailchimp';
import { BiHide, BiShow } from 'react-icons/all';
import { PasswordButton } from '@/components/PasswordButton/PasswordButton';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  promocode: string;
}

const schema = object()
  .shape({
    name: string().required('Name is required'),
    email: string().required('Email is required').email('Email is invalid'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Password does not match the rules',
      ),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    promocode: string().optional(),
  })
  .required();

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password',
  );
  const { push } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        await fetchJson(`https://${serviceUrl}/auth/password/register`, {
          method: 'POST',
          body: JSON.stringify({
            name: data.name,
            password: data.password,
            email: data.email,
            promocode: data.promocode,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setLoading(false);

        gtagSendCreateAccount();
        await mailchimpSendAccountCreated(data.email);

        push('/auth/login');
      } catch (err) {
        setLoading(false);
        if (err instanceof FetchError) {
          switch (err.data.type) {
            case ExceptionTypeEnum.EmailAlreadyUsed:
              setError('email', {
                type: 'validate',
                message: 'Email is already used',
              });
              break;
            // TODO: other errors handling
            // case '':
          }
        }
      }
    },
    [push, setError],
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
        Create an account
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
        {/* TODO: extract FormControl to component if there is any other usage */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Your Name</FormLabel>
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
                  color={errors.name ? '#EC305D' : '#49C7DA'}
                />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="name"
              control={control}
              hasError={!!errors.name}
            />
          </InputGroup>
          {errors.name && (
            <FormErrorMessage
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="#EC305D"
            >
              {errors.name.message}
            </FormErrorMessage>
          )}
        </FormControl>
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
              fieldType={passwordType}
              control={control}
              hasError={!!errors.password}
            />
            {passwordType === 'password' ? (
              <PasswordButton
                as={BiShow}
                passwordType={passwordType}
                setPasswordType={setPasswordType}
              />
            ) : (
              <PasswordButton
                as={BiHide}
                passwordType={passwordType}
                setPasswordType={setPasswordType}
              />
            )}
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
          <Flex
            fontWeight="400"
            fontSize="10px"
            lineHeight="18px"
            color="#A5A5A5"
            maxWidth="410px"
            padding="5px 5px 0 5px"
          >
            &#8211; Minimal length 8 characters
            <br />
            &#8211; Only latin symbols A-z, at least one uppercase and one
            lowercase
            <br />
            &#8211; At least one number and one special case character
          </Flex>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="password-confirm">Confirm Password</FormLabel>
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
                  color={errors.confirmPassword ? '#EC305D' : '#49C7DA'}
                />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="confirmPassword"
              fieldType={passwordType}
              control={control}
              hasError={!!errors.confirmPassword}
            />
            {passwordType === 'password' ? (
              <PasswordButton
                as={BiShow}
                passwordType={passwordType}
                setPasswordType={setPasswordType}
              />
            ) : (
              <PasswordButton
                as={BiHide}
                passwordType={passwordType}
                setPasswordType={setPasswordType}
              />
            )}
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage
              fontWeight="400"
              fontSize="12px"
              lineHeight="18px"
              color="#EC305D"
            >
              {errors.confirmPassword.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Promo code</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" width="55px" height="100%">
              <Flex
                height="21px"
                width="100%"
                justifyContent="center"
                alignItems="center"
                borderRight="1px solid #E0E0E0"
              >
                <PromoCodeIcon />
              </Flex>
            </InputLeftElement>
            <FormInput
              fieldName="promocode"
              fieldType="text"
              control={control}
            />
          </InputGroup>
        </FormControl>
        <Button
          variant="primary"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          {loading ? <Spinner /> : 'Create account'}
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
        Already have an account?{' '}
        <Link href="/auth/login">
          <Text as="span" color="#49C7DA">
            Login
          </Text>
        </Link>
      </Text>
    </Grid>
  );
};

export default RegisterPage;
