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
} from '@chakra-ui/react';
import Link from 'next/link';

import { MdEmail } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useCallback, useState } from 'react';
import { FormInput } from '@/components/FormInput/FormInput';
import { ExceptionTypeEnum } from '@/lib/constants';
// import { success } from '@/shared/utils/toast';

interface IFormInput {
  email: string;
}

const schema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
  })
  .required();

const CodeSendPage = () => {
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
      try {
        const res: { code: string; message: string } = await fetchJson(
          'https://app.polkapadapis.codes/auth/code/send',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          },
        );
        console.log('res --->', {
          res,
        });
        setIsSent(true);
      } catch (error) {
        console.log('errror --->', error);
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.NotFound:
              setError('email', {
                type: 'validate',
                message: 'Email not found',
              });
              break;
            // TODO: other errors handling
            // case '':
          }
        }
        console.error({ error });
      }
    },
    [setError],
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
            Your link is sent to your email
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
            <FormControl isInvalid={!!errors.email}>
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

            <Button variant="primary" type="submit">
              Send Magic Link
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
            <Link href="/auth/login-code">
              <Text as="a" href="/auth/send-code" color="#49C7DA">
                Login via code
              </Text>
            </Link>
          </Text>
        </>
      )}
    </Grid>
  );
};

export default CodeSendPage;
