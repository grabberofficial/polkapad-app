import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { Input } from '@/components/Input/Input';
import { InfoIcon } from '@/components/icons/Info';
import { Spacer } from '@/modules/index/Spacer';
import { Button } from '@/components/Button';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { css, Global } from '@emotion/react';
import { Footer } from '@/components/footer';

const faq = [
  {
    title: 'Section 1 title',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    title: 'Section 2 title',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    title: 'Section 3 title',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    title: 'Section 4 title',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    title: 'Section 5 title',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
  do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
];

const IndexPage = () => {
  return (
    <>
      <Global
        styles={css`
          @media screen and (max-width: 1100px) {
            .main-block {
              flex-wrap: wrap;
              height: auto !important;
              align-items: center;
              justify-content: center;

              & > div {
                min-width: 100% !important;
              }
            }
          }
        `}
      />
      <Flex height="869px" alignItems={'flex-start'} className="main-block">
        <Flex
          basis={'46%'}
          bg="#E5E5E5"
          flexDirection={'column'}
          padding={['40px 16px 40px', '40px 16px 40px', '76px 130px 0 115px']}
          height="100%"
          backgroundImage={['none', 'none', 'url(/images/staking_bg.png)']}
          backgroundRepeat="no-repeat"
          backgroundPosition="bottom"
          // backgroundPositionY="bottom"
        >
          <Heading marginBottom={75} withUnderline>
            Staking
          </Heading>
          <Text maxWidth={383}>
            To take a part in first sales you should have locked assets
          </Text>
        </Flex>
        {/* TODO: Extract to block */}
        <Flex
          basis={'54%'}
          flexDirection={'column'}
          backgroundColor={'white'}
          padding={['40px 16px', '40px 16px', '82px 81px 113px 95px']}
        >
          <Alert marginBottom={45}>
            <AlertIcon />
            <AlertTitle>Will be available after Polkapad mainnet.</AlertTitle>
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
                color="#303030"
                lineHeight="21px"
                fontSize="14px"
                fontWeight="700"
              >
                <Text color="#49C7DA" as="span">
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
              colSpan={[2, 2, 1]}
              display="flex"
              alignItems="center"
              width="100%"
            >
              <Input text="PLPD" value={0} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
              <Flex justifyContent="flex-end" alignItems="center" height="100%">
                <Button
                  disabled
                  withArrow
                  variant="primary"
                  iconPlacement="right"
                >
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
                color="#303030"
                lineHeight="21px"
                fontSize="14px"
                fontWeight="700"
              >
                <Text color="#49C7DA" as="span">
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
                color="#303030"
                whiteSpace="nowrap"
                position="relative"
                // _after={{
                //   position: 'absolute',
                //   content: '"~ $20,342.3"',
                //   fontWeight: '500',
                //   fontSize: '12px',
                //   lineHeight: '18px',
                //   color: '#A5A5A5',
                //   bottom: '-12px',
                //   right: 0,
                // }}
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
                color="#303030"
                whiteSpace="nowrap"
                position="relative"
                // _after={{
                //   position: 'absolute',
                //   content: '"~ $20,342.3"',
                //   fontWeight: '500',
                //   fontSize: '12px',
                //   lineHeight: '18px',
                //   color: '#A5A5A5',
                //   bottom: '-12px',
                //   right: 0,
                // }}
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
      </Flex>

      {/* TODO: Extract to block */}
      <Flex
        backgroundImage="images/staking/bg.svg"
        height={['auto', 'auto', 'auto', '640px']}
        backgroundColor="#025B63"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        flexDirection="column"
        padding={['40px 16px', '40px 16px', '113px 64px 0 113px']}
      >
        <Flex>
          <Flex flexBasis="calc(100% - 377px)">
            <Heading marginBottom={77} withUnderline color="white">
              PLPD Tokens Staked
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
                  TBA
                </Text>
                <Text
                  color="#FFFFFF"
                  lineHeight="21px"
                  fontSize="14px"
                  fontWeight="400"
                >
                  PLPD Price
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
                  TBA
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
        {/* TODO: Extract to block */}
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
              Total PLPD Staked <InfoIcon />
            </Text>
            <Text
              as="span"
              fontWeight="700"
              fontSize="38px"
              lineHeight="57px"
              textTransform="uppercase"
              color="#303030"
            >
              TBA
            </Text>
            <Text
              as="span"
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              ~
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
              TBA
            </Text>
            <Text
              as="span"
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              ~
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
              TBA
            </Text>
            <Text
              as="span"
              fontSize="14px"
              fontWeight="600"
              lineHeight="21px"
              textTransform="uppercase"
              color="#303030"
            >
              ~
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* TODO: Extract to block */}
      <Flex
        style={{ display: 'none' }}
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
          {/* TODO: Extract to component */}
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            w="100%"
            mx="auto"
            sx={{ columnCount: [1, 2], columnGap: '26px' }}
          >
            {/* TODO: Extract to component */}
            {faq.map(({ text, title }, index) => (
              <AccordionItem
                margin="13px"
                flexBasis="48%"
                border="none"
                backgroundColor="#F6F5F5"
                key={index}
                display="inline-block"
                w="100%"
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
                          {title}
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
                      {text}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export default IndexPage;
