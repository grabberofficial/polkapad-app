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
} from '@chakra-ui/react';
import Link from 'next/link';

import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';

const RegisterPage = () => {
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
      >
        <FormControl>
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
                <Icon as={FaUser} height="21px" width="21px" color="#49C7DA" />
              </Flex>
            </InputLeftElement>
            <Input
              height="48px"
              paddingLeft="72px"
              fontWeight="600"
              fontSize="14px"
              lineHeight="21px"
              borderRadius="4px"
              id="name"
              type="text"
            />
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={true}>
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
                <Icon as={MdEmail} height="21px" width="21px" color="#EC305D" />
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
              id="email"
              type="email"
            />
          </InputGroup>
          <FormErrorMessage
            fontWeight="400"
            fontSize="12px"
            lineHeight="18px"
            color="#EC305D"
          >
            Email invalid
          </FormErrorMessage>
        </FormControl>
        <FormControl>
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
                  color="#49C7DA"
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
              id="password"
              type="password"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
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
                  color="#49C7DA"
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
              id="password-confirm"
              type="password"
            />
          </InputGroup>
        </FormControl>
        <Button variant="primary">Create account</Button>
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
