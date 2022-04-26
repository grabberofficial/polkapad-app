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
} from '@chakra-ui/react';
import Link from 'next/link';
import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { object, ref, string } from 'yup';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useRouter } from 'next/router';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = object()
  .shape({
    name: string().required('Name is required'),
    email: string().required('Email is required').email('Email is invalid'),
    password: string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  })
  .required();

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { push } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
    try {
      await fetchJson('http://localhost:3000/auth/password/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          password: data.password,
          email: data.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      push('/auth/login');
    } catch (err) {
      // const { message } = err as FetchError;
      // TODO: backend error handling
    }
  }, []);

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
              fieldType="password"
              control={control}
              hasError={!!errors.password}
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
              fieldType="password"
              control={control}
              hasError={!!errors.confirmPassword}
            />
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
        <Button
          variant="primary"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Create account
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
