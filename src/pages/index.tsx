import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { Input } from '@/components/Input/Input';
import { InfoIcon } from '@/components/icons/Info';
import { Spacer } from '@/modules/index/Spacer';
import { Button } from '@/components/Button';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const IndexPage = () => {
  return (
    <>
      <Flex height="869px" alignItems={'flex-start'}>
        <Flex
          basis={'46%'}
          bg="#E5E5E5"
          flexDirection={'column'}
          padding={'76px 130px 0 115px'}
          height="100%"
          backgroundImage="url(http://localhost:3000/images/staking_bg.png)"
          backgroundRepeat="no-repeat"
          backgroundPosition="bottom"
          // backgroundPositionY="bottom"
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
        </Flex>
        <Flex
          basis={'54%'}
          flexDirection={'column'}
          backgroundColor={'white'}
          padding={'82px 81px 113px 95px'}
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

      <Flex
        backgroundImage="images/staking/bg.svg"
        height="447px"
        backgroundColor="#025B63"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        flexDirection="column"
        padding="113px 64px 0 113px"
      >
        <Flex>
          <Flex flexBasis="calc(100% - 377px)">
            <Heading marginBottom={77} withUnderline color="white">
              XAVA Tokens Staked
              <br />
              Over Time
            </Heading>
          </Flex>
          <Flex flexDirection="column" gap="29px" flexBasis="377px">
            {/* TODO: extract to component */}
            <Flex gap="20px" alignItems="center">
              <Flex
                width="48px"
                height="48px"
                backgroundColor="#F6F5F5"
                borderRadius="3px"
              />
              <Flex flexDirection="column">
                <Text
                  color="#FFFFFF"
                  textTransform="uppercase"
                  lineHeight="34px"
                  fontSize="23px"
                  fontWeight="700"
                >
                  $79.34M
                </Text>
                <Text
                  color="#FFFFFF"
                  lineHeight="21px"
                  fontSize="14px"
                  fontWeight="400"
                >
                  Total Value Locked
                </Text>
              </Flex>
            </Flex>
            <Flex gap="20px" alignItems="center">
              <Flex
                width="48px"
                height="48px"
                backgroundColor="#F6F5F5"
                borderRadius="3px"
              />
              <Flex flexDirection="column">
                <Text
                  color="#FFFFFF"
                  textTransform="uppercase"
                  lineHeight="34px"
                  fontSize="23px"
                  fontWeight="700"
                >
                  $79.34M
                </Text>
                <Text
                  color="#FFFFFF"
                  lineHeight="21px"
                  fontSize="14px"
                  fontWeight="400"
                >
                  Total Value Locked
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap="39px" alignItems="center">
          {/* TODO: extract to component */}
          <Flex
            flexDirection="column"
            gap="11px"
            padding="52px 30px 59px"
            backgroundColor="#F6F5F5"
            borderRadius="4px"
            flexBasis="33%"
          >
            <Text
              display="flex"
              alignItems="center"
              gap="7px"
              as="span"
              fontWeight="700"
              fontSize="14px"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              Total XAVA Staked <InfoIcon />
            </Text>
            <Text
              as="span"
              fontWeight="700"
              fontSize="38px"
              lineHeight="57px"
              textTransform="uppercase"
              color="#303030"
            >
              16,585,120.73
            </Text>
            <Text
              as="span"
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              ~$79,442,728.29
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            gap="11px"
            padding="52px 30px 59px"
            backgroundColor="#F6F5F5"
            borderRadius="4px"
            flexBasis="33%"
          >
            <Text
              display="flex"
              alignItems="center"
              gap="7px"
              as="span"
              fontWeight="700"
              fontSize="14px"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              Total Rewards Redistributed <InfoIcon />
            </Text>
            <Text
              as="span"
              fontWeight="700"
              fontSize="38px"
              lineHeight="57px"
              textTransform="uppercase"
              color="#303030"
            >
              1,109,045.79
            </Text>
            <Text
              as="span"
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              ~$5,312,329.32
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            gap="11px"
            padding="52px 30px 59px"
            backgroundColor="#F6F5F5"
            borderRadius="4px"
            flexBasis="33%"
          >
            <Text
              display="flex"
              alignItems="center"
              gap="7px"
              as="span"
              fontWeight="700"
              fontSize="14px"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              Reward Unlock Rate <InfoIcon />
            </Text>
            <Text
              as="span"
              fontWeight="700"
              fontSize="38px"
              lineHeight="57px"
              textTransform="uppercase"
              color="#303030"
            >
              0.01 XAVA / Sec
            </Text>
            <Text
              as="span"
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              ~$0.03
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        marginTop="250px"
        padding="89px 79px 113px 115px"
        flexDirection="column"
      >
        {/* Heading FAQ */}
        <Flex flexBasis="100%">
          <Heading marginBottom={75} withUnderline>
            FAQ
          </Heading>
        </Flex>
        <Flex width="100%" margin="0 -13px">
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            width="100%"
            display="flex"
            flexWrap="wrap"
          >
            <AccordionItem
              margin="13px"
              flexBasis="48%"
              border="none"
              backgroundColor="#F6F5F5"
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      padding="20px 25px"
                      color="#303030"
                      _expanded={{ bg: '#303030', color: 'white' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="21px"
                        // color="#303030"
                      >
                        Section 1 title
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="20px" color="#32BBCF" />
                      ) : (
                        <AddIcon fontSize="20px" color="#32BBCF" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    padding="0px 155px 19px 25px"
                    background="#303030"
                    color="#F6F5F5"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem
              margin="13px"
              flexBasis="48%"
              border="none"
              backgroundColor="#F6F5F5"
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      padding="20px 25px"
                      color="#303030"
                      _expanded={{ bg: '#303030', color: 'white' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="21px"
                        // color="#303030"
                      >
                        Section 1 title
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="20px" color="#32BBCF" />
                      ) : (
                        <AddIcon fontSize="20px" color="#32BBCF" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    padding="0px 155px 19px 25px"
                    background="#303030"
                    color="#F6F5F5"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem
              margin="13px"
              flexBasis="48%"
              border="none"
              backgroundColor="#F6F5F5"
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      padding="20px 25px"
                      color="#303030"
                      _expanded={{ bg: '#303030', color: 'white' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="21px"
                        // color="#303030"
                      >
                        Section 1 title
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="20px" color="#32BBCF" />
                      ) : (
                        <AddIcon fontSize="20px" color="#32BBCF" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    padding="0px 155px 19px 25px"
                    background="#303030"
                    color="#F6F5F5"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem
              margin="13px"
              flexBasis="48%"
              border="none"
              backgroundColor="#F6F5F5"
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      padding="20px 25px"
                      color="#303030"
                      _expanded={{ bg: '#303030', color: 'white' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="21px"
                        // color="#303030"
                      >
                        Section 1 title
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="20px" color="#32BBCF" />
                      ) : (
                        <AddIcon fontSize="20px" color="#32BBCF" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    padding="0px 155px 19px 25px"
                    background="#303030"
                    color="#F6F5F5"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem
              margin="13px"
              flexBasis="48%"
              border="none"
              backgroundColor="#F6F5F5"
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      padding="20px 25px"
                      color="#303030"
                      _expanded={{ bg: '#303030', color: 'white' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="21px"
                        // color="#303030"
                      >
                        Section 1 title
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="20px" color="#32BBCF" />
                      ) : (
                        <AddIcon fontSize="20px" color="#32BBCF" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    padding="0px 155px 19px 25px"
                    background="#303030"
                    color="#F6F5F5"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </>
  );
};

export default IndexPage;
