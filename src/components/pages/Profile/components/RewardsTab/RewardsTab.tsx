import React from 'react';
import queryString from 'query-string';
import { Flex } from '@chakra-ui/react';
import useUser from '@/hooks/useUser';
import { LOGIN_ROUTE } from '@/constants/routes';
import { gleamRewardUrl } from '@/config/env';

export const RewardsTab = () => {
  const { user } = useUser({
    redirectTo: LOGIN_ROUTE,
  });

  const gleamFullUrl = `${gleamRewardUrl}?${queryString.stringify({
    email: user?.email,
    name: user?.name,
  })}`;

  return (
    <Flex
      paddingBottom="100px"
      width={['100%']}
      flexDirection="column"
      key="rewards"
      alignItems="center"
    >
      <iframe
        title="Gleam Rewards"
        width="100%"
        height="450px"
        src={gleamFullUrl}
        frameBorder="0"
        allowFullScreen
      />
    </Flex>
  );
};
