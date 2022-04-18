import { Divider, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { Input } from '@/components/Input/Input';
import { InfoIcon } from '@/components/icons/Info';
import { Spacer } from '@/modules/index/Spacer';
import { Button } from '@/components/Button';

const IndexPage = () => {
  return (
    <>
      <Flex height={'100%'} alignItems={'flex-start'}>
        <Flex
          basis={'46%'}
          bg="#E5E5E5"
          flexDirection={'column'}
          padding={'76px 130px 0 115px'}
        >
          <Heading marginBottom={75} withUnderline>
            Allocation
            <br />
            Staking
          </Heading>
          <Text maxWidth={383}>
            Stakers will receive their yield rewards only at the end of their
            Staking Period when they unstake/restake their tokens.
          </Text>
          <br />
          <Text maxWidth={383} marginBottom={23}>
            Unstaking before the predefined period was reached will Unstake
          </Text>
          <Image src="images/staking_bg.png" />
        </Flex>
        <Flex
          basis={'54%'}
          flexDirection={'column'}
          backgroundColor={'white'}
          padding={'82px 81px 145px 95px'}
        >
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
                $79.34M
              </Text>
            </Text>
            <Text
              as={'span'}
              fontWeight={400}
              fontSize={'14px'}
              lineHeight={'21px'}
            >
              XAVA Price
              <Text
                marginLeft={'20px'}
                as={'span'}
                fontWeight={700}
                fontSize={'18px'}
                lineHeight={'27px'}
                textTransform={'uppercase'}
              >
                $4.74
              </Text>
            </Text>
          </Flex>
          <Divider margin={'20px 0 40px 0'} border={'1px solid #E0E0E0'} />
          <Grid
            height="87px"
            templateRows="21px 48px"
            templateColumns="160px 1fr 200px"
            gap="15px"
            marginBottom="50px"
          >
            <GridItem rowSpan={1} colSpan={1}>
              <Text
                textTransform="uppercase"
                color="#303030"
                lineHeight="21px"
                fontSize="14px"
                fontWeight="700"
              >
                <Text color="#49C7DA" as="span">
                  Stake
                </Text>{' '}
                xava
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
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
            <GridItem rowSpan={1} colSpan={1}>
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
                <Text
                  as="span"
                  fontWeight="700"
                  display="flex"
                  alignItems="center"
                >
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
              colSpan={1}
              display="flex"
              alignItems="center"
              width="100%"
            >
              <Input text="XAVA" value={0} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Flex justifyContent="flex-end" alignItems="center" height="100%">
                <Button withArrow variant="primary" iconPlacement="right">
                  Deposit XAVA
                </Button>
              </Flex>
            </GridItem>
          </Grid>
          <Grid
            height="87px"
            templateRows="21px 48px"
            templateColumns="160px 1fr 200px"
            gap="15px"
            marginBottom="50px"
          >
            <GridItem rowSpan={1} colSpan={1}>
              <Text
                textTransform="uppercase"
                color="#303030"
                lineHeight="21px"
                fontSize="14px"
                fontWeight="700"
              >
                <Text color="#49C7DA" as="span">
                  WITHDRAW
                </Text>{' '}
                xava
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
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
            <GridItem rowSpan={1} colSpan={1}>
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
                <Text
                  as="span"
                  fontWeight="700"
                  display="flex"
                  alignItems="center"
                >
                  1.824.4{' '}
                  <Text
                    as="span"
                    color="#A5A5A5"
                    lineHeight="18px"
                    fontSize="12px"
                    fontWeight="500"
                  >
                    ~ $20,342.3
                  </Text>
                </Text>
              </Flex>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={1}
              display="flex"
              alignItems="center"
              width="100%"
            >
              <Input text="XAVA" value={0} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Flex justifyContent="flex-end" alignItems="center" height="100%">
                <Button withArrow variant="primary">
                  Withdraw XAVA
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
                <Text color="#49C7DA" as="span">
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
                color="#303030"
                whiteSpace="nowrap"
              >
                7.79 %
              </Text>
            </Flex>

            <Flex
              justifyContent="space-between"
              alignItems="baseline"
              gap="7px"
              marginBottom="24px"
            >
              <Text as="span" whiteSpace="nowrap">
                My Staked XAVA
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
                color="#303030"
                whiteSpace="nowrap"
                position="relative"
                _after={{
                  position: 'absolute',
                  content: '"~ $20,342.3"',
                  fontWeight: '500',
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#A5A5A5',
                  bottom: '-12px',
                  right: 0,
                }}
              >
                1,883.3 XAVA
              </Text>
            </Flex>

            <Flex
              justifyContent="space-between"
              alignItems="baseline"
              gap="7px"
              marginBottom="24px"
            >
              <Text as="span" whiteSpace="nowrap">
                My Earned XAVA
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
                color="#303030"
                whiteSpace="nowrap"
                position="relative"
                _after={{
                  position: 'absolute',
                  content: '"~ $20,342.3"',
                  fontWeight: '500',
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#A5A5A5',
                  bottom: '-12px',
                  right: 0,
                }}
              >
                3.42 XAVA
              </Text>
            </Flex>

            <Flex gap="11px" marginTop="26px">
              <Button
                withArrow
                variant="secondary"
                iconPlacement="right"
                icon={<InfoIcon />}
              >
                COMPOUND XAVA
              </Button>
              <Button
                withArrow
                variant="secondary"
                iconPlacement="right"
                icon={<InfoIcon />}
              >
                HARVEST XAVA
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default IndexPage;
