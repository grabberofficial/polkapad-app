import { Button } from '@/components/Button';
import {
  FormControl,
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

import { MdEmail } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const isSent = true;

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
        Magic Login Link
      </Text>
      <Text
        fontWeight="400"
        fontSize="18px"
        lineHeight="29px"
        color="#303030"
        textAlign="center"
        marginTop="11px"
      >
        Please enter the email address you would like your magic login link sent
        to.
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
            Your login link for Avalaunch sending to your email
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
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
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
                      as={MdEmail}
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
                  id="email"
                  type="email"
                />
              </InputGroup>
            </FormControl>

            <Button variant="primary">Send Magic Link</Button>
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

export default LoginPage;
