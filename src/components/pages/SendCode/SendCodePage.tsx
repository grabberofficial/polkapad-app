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

import { MdEmail } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { useCallback, useState } from 'react';
import { FormInput } from '@/components/FormInput/FormInput';
import { ExceptionTypeEnum } from '@/lib/constants';
import { serviceUrl } from '@/config/env';
import { SendCodePageSchema } from '@/components/pages/SendCode/SendCodePage.schema';
import { LOGIN_ROUTE } from '@/constants/routes';

interface IFormInput {
  email: string;
}

export const SendCodePage = () => {
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    resolver: yupResolver(SendCodePageSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        await fetchJson(`https://${serviceUrl}/auth/code/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        setLoading(false);

        setIsSent(true);
      } catch (error) {
        setLoading(false);
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
        color="secondary.text"
        textAlign="center"
        padding="0 20px"
      >
        Magic Login Link
      </Text>
      <Text
        fontWeight="400"
        fontSize="18px"
        lineHeight="29px"
        color="secondary.text"
        textAlign="center"
        marginTop="11px"
        padding="0 20px"
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
            color="primary.basic"
          />
          <Text
            fontWeight="700"
            fontSize="14px"
            lineHeight="23px"
            color="secondary.text"
            marginTop="32px"
            maxWidth="215px"
            textAlign="center"
          >
            Your magic login link for Polkapad has been sent to your email
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
              padding: '20px',
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

            <Button variant="primary" type="submit">
              {loading ? <Spinner /> : 'Send Magic Link'}
            </Button>
          </form>
          <Text
            fontWeight="600"
            fontSize="14px"
            lineHeight="21px"
            color="secondary.text"
            marginTop="69px"
            textAlign="center"
          >
            {'Back to '}
            <Link href={LOGIN_ROUTE}>
              <Text as="a" href={LOGIN_ROUTE} color="primary.basic">
                Login via password
              </Text>
            </Link>
          </Text>
        </>
      )}
    </Grid>
  );
};
