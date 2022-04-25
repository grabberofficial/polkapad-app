import { Button } from '@/components/Button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  Flex,
  FormHelperText,
} from '@chakra-ui/react';
import Link from 'next/link';

import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';

const LoginPage = () => {
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
      >
        <FormControl>
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
                <Icon as={MdEmail} height="21px" width="21px" color="#49C7DA" />
              </Flex>
            </InputLeftElement>
            <Input
              height="48px"
              paddingLeft="72px"
              fontWeight="600"
              fontSize="14px"
              lineHeight="21px"
              borderRadius="4px"
              id="email"
              type="email"
            />
          </InputGroup>
          <FormHelperText
            color="#49C7DA"
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
          >
            {'Great email name ;)'}
          </FormHelperText>
        </FormControl>
        <FormControl isInvalid={true}>
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
                  color="#EC305D"
                />
              </Flex>
            </InputLeftElement>
            <Input
              height="48px"
              paddingLeft="72px"
              fontWeight="600"
              fontSize="14px"
              lineHeight="21px"
              borderRadius="4px"
              errorBorderColor="#EC305D"
              color="#EC305D"
              id="password"
              type="password"
            />
          </InputGroup>
          <FormErrorMessage
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
            color="#EC305D"
          >
            Password must be at least 8 characters
          </FormErrorMessage>
        </FormControl>

        <Button variant="primary">Login</Button>
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
        <Link href="/auth/link">Send magic link</Link>
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

export default LoginPage;
