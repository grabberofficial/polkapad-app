import {
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import { StakePLPD } from '@/components/pages/Staking/components/StakeWithdraw/components/StakePLPD/StakePLPD';
import { WithdrawPLPD } from '@/components/pages/Staking/components/StakeWithdraw/components/WithdrawPLPD/WithdrawPLPD';
import { YourStats } from '@/components/pages/Staking/components/StakeWithdraw/components/YourStats/YourStats';

export const StakeWithdraw = () => (
  <Flex
    maxWidth="633px"
    flexDirection={'column'}
    backgroundColor={'white'}
    padding={['40px 16px', '40px 16px', '96px 0']}
    margin="0 auto"
  >
    <Alert marginBottom={45}>
      <AlertIcon />
      <AlertTitle>
        Will be available after the launch of Polkapad mainnet.
      </AlertTitle>
    </Alert>
    <Flex justifyContent={'space-between'}>
      <Text as={'span'} fontWeight={400} fontSize={'14px'} lineHeight={'21px'}>
        Total Value Locked
        <Text
          marginLeft={'20px'}
          as={'span'}
          fontWeight={700}
          fontSize={'18px'}
          lineHeight={'27px'}
          textTransform={'uppercase'}
        >
          TBA
        </Text>
      </Text>
      <Text as={'span'} fontWeight={400} fontSize={'14px'} lineHeight={'21px'}>
        PLPD Price
        <Text
          marginLeft={'20px'}
          as={'span'}
          fontWeight={700}
          fontSize={'18px'}
          lineHeight={'27px'}
          textTransform={'uppercase'}
        >
          TBA
        </Text>
      </Text>
    </Flex>
    <Divider margin={'20px 0 40px 0'} border={'1px solid #E0E0E0'} />
    <StakePLPD />
    <WithdrawPLPD />
    <Divider margin={'0 0 40px 0'} border={'1px solid #E0E0E0'} />
    <YourStats />
  </Flex>
);
