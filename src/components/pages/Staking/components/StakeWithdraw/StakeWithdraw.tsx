import {
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button';
import { InfoIcon } from '@/components/icons/Info';
import { Spacer } from '@/modules/index/Spacer';

export const StakeWithdraw = () => {
  return (
    <Flex
      basis={'54%'}
      flexDirection={'column'}
      backgroundColor={'white'}
      padding={['40px 16px', '40px 16px', '82px 81px 113px 95px']}
    >
      <Alert marginBottom={45}>
        <AlertIcon />
        <AlertTitle>
          Will be available after the launch of Polkapad mainnet.
        </AlertTitle>
      </Alert>
      <Flex justifyContent={'space-between'}>
        <Text
          as={'span'}
          fontWeight={400}
          fontSize={'14px'}
          lineHeight={'21px'}
        >
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
        <Text
          as={'span'}
          fontWeight={400}
          fontSize={'14px'}
          lineHeight={'21px'}
        >
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
      {/* TODO: Extract to component, make form out of it */}
      <Grid
        height={['100%', '100%', '87px']}
        templateRows={[
          '21px 48px 48px 48px',
          '21px 48px 48px 48px',
          '21px 48px',
        ]}
        templateColumns={['1fr 1fr', '1fr 1fr', '160px 1fr 200px']}
        gap="15px"
        marginBottom="50px"
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Text
            textTransform="uppercase"
            color="secondary.text"
            lineHeight="21px"
            fontSize="14px"
            fontWeight="700"
          >
            <Text color="primary.basic" as="span">
              Stake
            </Text>{' '}
            PLPD
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[1, 1, 2]}>
          <Flex justifyContent="flex-end">
            <Text
              textTransform="uppercase"
              color="#303030"
              lineHeight="21px"
              fontSize="14px"
              fontWeight="700"
            >
              Max
            </Text>
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
          <Flex flexDirection="column">
            <Text
              as="span"
              color="#303030"
              lineHeight="21px"
              fontSize="14px"
              fontWeight="400"
            >
              Balance:
            </Text>
            <Text as="span" fontWeight="700" display="flex" alignItems="center">
              0{' '}
              <Text
                as="span"
                color="#A5A5A5"
                lineHeight="18px"
                fontSize="12px"
                fontWeight="500"
              >
                ~ $0
              </Text>
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={[2, 2, 1]}
          display="flex"
          alignItems="center"
          width="100%"
        >
          <Input text="PLPD" value={0} />
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
          <Flex justifyContent="flex-end" alignItems="center" height="100%">
            <Button disabled withArrow variant="primary" iconPlacement="right">
              Deposit PLPD
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      <Grid
        height={['100%', '100%', '87px']}
        templateRows={[
          '21px 48px 48px 48px',
          '21px 48px 48px 48px',
          '21px 48px',
        ]}
        templateColumns={['1fr 1fr', '1fr 1fr', '160px 1fr 200px']}
        gap="15px"
        marginBottom="50px"
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Text
            textTransform="uppercase"
            color="secondary.text"
            lineHeight="21px"
            fontSize="14px"
            fontWeight="700"
          >
            <Text color="primary.basic" as="span">
              WITHDRAW
            </Text>{' '}
            PLPD
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[1, 1, 2]}>
          <Flex justifyContent="flex-end">
            <Text
              textTransform="uppercase"
              color="#303030"
              lineHeight="21px"
              fontSize="14px"
              fontWeight="700"
            >
              Max
            </Text>
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
          <Flex flexDirection="column">
            <Text
              as="span"
              color="#303030"
              lineHeight="21px"
              fontSize="14px"
              fontWeight="400"
            >
              Balance:
            </Text>
            <Text as="span" fontWeight="700" display="flex" alignItems="center">
              0{' '}
              <Text
                as="span"
                color="#A5A5A5"
                lineHeight="18px"
                fontSize="12px"
                fontWeight="500"
              >
                ~ $0
              </Text>
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={[2, 2, 1]}
          display="flex"
          alignItems="center"
          width="100%"
        >
          <Input text="PLPD" value={0} />
        </GridItem>
        <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
          <Flex justifyContent="flex-end" alignItems="center" height="100%">
            <Button disabled withArrow variant="primary">
              Withdraw PLPD
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      <Divider margin={'0 0 40px 0'} border={'1px solid #E0E0E0'} />
      <Flex flexDirection="column">
        <Flex marginBottom="20px">
          <Text
            textTransform="uppercase"
            color="#303030"
            lineHeight="21px"
            fontSize="14px"
            fontWeight="700"
          >
            your{' '}
            <Text color="primary.basic" as="span">
              Stats
            </Text>
          </Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="baseline"
          gap="7px"
          marginBottom="24px"
        >
          <Text as="span" whiteSpace="nowrap">
            Current APY
          </Text>
          <InfoIcon />
          <Spacer />
          <Text
            as="span"
            fontWeight="700"
            fontSize="18px"
            lineHeight="27px"
            textAlign="right"
            textTransform="uppercase"
            color="secondary.text"
            whiteSpace="nowrap"
          >
            TBA
          </Text>
        </Flex>

        <Flex
          justifyContent="space-between"
          alignItems="baseline"
          gap="7px"
          marginBottom="24px"
        >
          <Text as="span" whiteSpace="nowrap">
            My Staked PLPD
          </Text>
          <InfoIcon />
          <Spacer />
          <Text
            as="span"
            fontWeight="700"
            fontSize="18px"
            lineHeight="27px"
            textAlign="right"
            textTransform="uppercase"
            color="secondary.text"
            whiteSpace="nowrap"
            position="relative"
          >
            TBA
          </Text>
        </Flex>

        <Flex
          justifyContent="space-between"
          alignItems="baseline"
          gap="7px"
          marginBottom="24px"
        >
          <Text as="span" whiteSpace="nowrap">
            My Earned PLPD
          </Text>
          <InfoIcon />
          <Spacer />
          <Text
            as="span"
            fontWeight="700"
            fontSize="18px"
            lineHeight="27px"
            textAlign="right"
            textTransform="uppercase"
            color="secondary.text"
            whiteSpace="nowrap"
            position="relative"
          >
            TBA
          </Text>
        </Flex>

        <Flex
          gap="11px"
          marginTop="26px"
          flexDirection={['column', 'column', 'row']}
        >
          <Button
            disabled
            withArrow
            variant="secondary"
            iconPlacement="right"
            icon={<InfoIcon />}
          >
            COMPOUND PLPD
          </Button>
          <Button
            disabled
            withArrow
            variant="secondary"
            iconPlacement="right"
            icon={<InfoIcon />}
          >
            HARVEST PLPD
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
