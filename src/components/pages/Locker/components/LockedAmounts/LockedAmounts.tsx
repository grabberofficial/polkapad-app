import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { Button } from '@/components/Button';
import useUser from '@/hooks/useUser';
import { useMemo } from 'react';
import { LOCKED_AMOUNTS } from '@/components/pages/Locker/components/LockedAmounts/LockedAmounts.constants';

export const LockedAmounts = () => {
  const { user } = useUser();
  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

  const totalAmount = LOCKED_AMOUNTS.map((item) => item.amount).reduce(
    (prev, next) => prev + next,
  );

  return (
    <Flex
      basis="40%"
      flexDirection={'column'}
      padding={['40px 16px', '40px 16px', '52px 30px 59px']}
    >
      <Heading marginBottom={75}>Locked Amount</Heading>
      <Text marginBottom="30px">
        Funds can be locked only at the Polkapad sale event. There is no way to
        add tokens after the sale and before the launch of Polkapad mainnet
      </Text>
      {!isLoggedIn && (
        <Box bg="#F6F5F5" w="100%" p={4}>
          <Flex borderRadius={'4px'} alignItems="center" gap="14px">
            <Icon as={FaInfoCircle} height="14px" width="14px" />
            <Text fontWeight={600}>Login to check your locked funds</Text>
          </Flex>
        </Box>
      )}
      {isLoggedIn && (
        <>
          <Text color="#A5A5A5" marginBottom="30px">
            Minimum locked amount = 1 DOT
          </Text>
          <Flex flexDirection="column">
            {(LOCKED_AMOUNTS || []).map((item, index) => (
              <Flex key={index} marginBottom={'25px'}>
                <Text>{item.from}</Text>
                <Flex
                  borderBottom={'1px dashed #E0E0E0'}
                  margin={'0px 10px 0px 10px'}
                  flexGrow={1}
                ></Flex>
                <Text fontWeight={700}>
                  {item.amount} {item.amount > 0 ? 'DOT' : ''}
                </Text>
              </Flex>
            ))}
            <Flex marginBottom={'25px'}>
              <Text fontWeight={700}>Total</Text>
              <Flex
                borderBottom={'1px dashed #E0E0E0'}
                margin={'0px 10px 0px 10px'}
                flexGrow={1}
              ></Flex>
              <Text fontWeight={700}>{totalAmount} DOT</Text>
            </Flex>
          </Flex>
          <Flex gap="36px" marginBottom="40px">
            <Button variant="primary" width="100px" disabled>
              Buy more
            </Button>
            <Button variant="secondary" width="120px" disabled>
              Withdraw funds
            </Button>
          </Flex>
          <Flex>
            <Text marginRight={'5px'}>Don&apos;t see the provided funds?</Text>
            <Text
              color="primary.basic"
              fontWeight={700}
              as="a"
              href="mailto:support@polkapad.network"
            >
              Contact support
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};
