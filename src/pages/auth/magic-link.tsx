import { ExceptionTypeEnum } from '@/lib/constants';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import useUser from '@/lib/hooks/useUser';
import { Grid, Text, Icon, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { BsHourglassSplit } from 'react-icons/bs';

const MagicLinkPage = () => {
  const router = useRouter();
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [text, setText] = useState('Authorizing you');

  const authorize = useCallback(
    async (email, code) => {
      try {
        mutateUser(
          await fetchJson('/api/login', {
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

        console.log({ error });
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
        {text}
      </Text>

      <Flex marginTop="85px" flexDirection="column" alignItems="center">
        <Icon
          as={BsHourglassSplit}
          width="95px"
          height="95px"
          color="#FFCC15"
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
          Please wait
        </Text>
      </Flex>
    </Grid>
  );
};

export default MagicLinkPage;
