import { ExceptionTypeEnum } from '@/lib/constants';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { Grid, Text, Icon, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { BsHourglassSplit } from 'react-icons/bs';
import useSWR from 'swr';
import { User } from '@/pages/api/user';
import {
  API_LOGIN_ROUTE,
  API_USER_ROUTE,
  PROFILE_ROUTE,
} from '@/constants/routes';

export const MagicLinkPage = () => {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR<User>(API_USER_ROUTE);

  const [text, setText] = useState('Authorizing you');

  const authorize = useCallback(
    async (email, code) => {
      try {
        mutateUser(
          await fetchJson(API_LOGIN_ROUTE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code, authType: 'code' }),
          }),
        );
      } catch (error) {
        if (error instanceof FetchError) {
          switch (error.data.type) {
            case ExceptionTypeEnum.NotFound:
              setText('Invalid code');
              break;
            // TODO: other errors handling
            // case '':
          }
        }
      }
    },
    [mutateUser],
  );

  useEffect(() => {
    const { email, code } = router.query;
    if (!email || !code) {
      setText('Link is invalid, auth failed');
    } else {
      authorize(email, code);
    }
  }, [router, authorize]);

  useEffect(() => {
    if (user?.isLoggedIn) {
      router.push(
        typeof router.query.url === 'string' ? router.query.url : PROFILE_ROUTE,
      );
    }
  }, [user]);

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
      >
        {text}
      </Text>

      <Flex marginTop="85px" flexDirection="column" alignItems="center">
        <Icon
          as={BsHourglassSplit}
          width="95px"
          height="95px"
          color="warning"
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
          Please wait
        </Text>
      </Flex>
    </Grid>
  );
};
