import {
  Circle,
  Flex,
  Box,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Icon,
} from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { Button } from '@/components/Button';
import { css, Global } from '@emotion/react';
import { TabList } from '@/components/Header/components/HeaderItems/HeaderItems.style';
import { useEthers } from '@usedapp/core';
import { FaInfoCircle } from 'react-icons/fa';
import { Footer } from '@/components/footer';

const bnbSteps = [
  {
    title: 'Complete registration & verify your ETH/BNB and Polkadot addresses',
    text: `Addressed can't be change until Polkapad mainnet`,
    buttonText: 'Register',
  },
  {
    title: 'Get KSM ot DOT on Binance',
    text: `Funds can be accepted ONLY from verified wallet, not from Binance directly`,
    buttonText: 'To Binance',
  },
  {
    title: 'Withdraw funds to BNB Smart chain to verified ETH/BNB address',
    text: `Don't forget to put reminder to come to sale`,
    buttonText: 'Connect wallet',
  },
  {
    title: 'Register on the Polkapad sale',
    text: `Don't forget to put reminder to come to sale`,
    buttonText: 'Get ready!',
  },
  {
    title: 'Come to sale and push the button',
    text: `Sale available ONLY in sale time only on this page!
             There is no way to add funds into locker before Polkapad mainnet`,
    buttonText: 'To sale',
  },
  {
    title: 'Get locker balance.',
    text: `Ready to upcoming sales!`,
    buttonText: 'Ready!',
  },
];

const ksmSteps = [
  {
    title: 'Complete registration & verify your Kusama address',
    text: `Address can't be change until Polkapad mainnet`,
    buttonText: 'Register',
  },
  {
    title: 'Get more KSM',
    text: `Funds can be accpted ONLY from verified wallet. Funds can't be accepted from the exchanges directly.`,
    buttonText: 'To KSM',
  },
  {
    title: 'Register on the Polkapad sale',
    text: `Don't forget to put reminder to come to sale`,
    buttonText: 'Get ready!',
  },
  {
    title: 'Come to sale and push and send funds to the address',
    text: `Sale available ONLY in sale time only on this page!
            There is no way to add funds into locker before Polkapad mainnet`,
    buttonText: 'To sale',
  },
  {
    title: 'Get locker balance.',
    text: `Ready to upcoming sales!`,
    buttonText: 'Ready!',
  },
];

const lockedAmount = [
  {
    from: 'KSM from Kusama chain',
    amount: 0,
  },
  {
    from: 'DOT from BNB smart chain',
    amount: 0,
  },
  {
    from: 'KSM from BNB smart chain',
    amount: 0,
  },
  {
    from: 'MOVR from Moonriver chain',
    amount: 0,
  },
  {
    from: 'SDN from Shiden chain',
    amount: 0,
  },
  {
    from: 'Ambassdor',
    amount: 0,
  },
];

const LockerPage = () => {
  const { account } = useEthers();

  const renderStep = (step: any, index: number) => {
    return (
      <Flex
        alignItems={'center'}
        minHeight={'106px'}
        marginTop={'10px'}
        borderRadius={'4px'}
        padding={'10px'}
        backgroundColor={'white'}
      >
        <Circle size="25px" fontSize="13px" bg="#49C7DA" color="white">
          <Text>{index + 1}.</Text>
        </Circle>
        <Flex marginLeft={'20px'} marginRight={'10px'} flexDirection={'column'}>
          <Text fontSize="14px" fontWeight={500}>
            {step.title}
          </Text>
          <Text fontSize="12px">{step.text}</Text>
        </Flex>
        <Flex marginLeft={'auto'}>
          <Button disabled>{step.buttonText}</Button>
        </Flex>
      </Flex>
    );
  };

  const totalAmount = lockedAmount
    .map((item) => item.amount)
    .reduce((prev, next) => prev + next);

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
      <Flex alignItems={'flex-start'} className="main-block">
        <Flex
          bg="#E5E5E5"
          flexDirection={'column'}
          padding={['40px 16px 40px', '40px 16px 40px', '76px 130px 0 115px']}
          minHeight="1200px"
        >
          <Heading marginBottom={75} withUnderline>
            Step by step guide
          </Heading>
          <Text>
            Choose what suits you best.
            <br />
            <br />
            Cheap and easy: Fund DOT or KSM from Binance directly with BNB smart
            chain smart-contract (Metamask and Polkadot.js needed).
            <br />
            <br />
            True and Native: Fund KSM in old fashioned way by sending to the
            provided address with Kusama chain (only Polkadot.js needed).
          </Text>
          <Tabs padding={'30px 0px 0px 0px'} variant="unstyled">
            <Flex margin={'10px 0x 0px 0px'} flexDirection={'column'}>
              <Flex
                borderRadius={'4px'}
                flexDirection={'column'}
                backgroundColor={'white'}
              >
                <TabList margin={'10px'} justifyContent={'space-between'}>
                  <Tab
                    borderRadius={'4px'}
                    _selected={{ color: 'white', bg: '#49C7DA' }}
                    fontSize={['10px', '12px', ' inherit']}
                  >
                    BNB Smart Chain
                  </Tab>
                  <Tab
                    borderRadius={'4px'}
                    _selected={{ color: 'white', bg: '#49C7DA' }}
                    fontSize={['10px', '12px', ' inherit']}
                  >
                    Kusama
                  </Tab>
                  <Tab
                    isDisabled
                    _disabled={{ color: 'gray' }}
                    fontSize={['10px', '12px', ' inherit']}
                  >
                    Mooriver
                  </Tab>
                  <Tab
                    isDisabled
                    _disabled={{ color: 'gray' }}
                    fontSize={['10px', '12px', ' inherit']}
                  >
                    Shiden
                  </Tab>
                </TabList>
              </Flex>
              <Flex flexDirection={'column'}>
                <TabPanels>
                  <TabPanel padding={'20px 0px 0px 0px'}>
                    {(bnbSteps || []).map(renderStep)}
                  </TabPanel>
                  <TabPanel padding={'20px 0px 0px 0px'}>
                    {(ksmSteps || []).map(renderStep)}
                  </TabPanel>
                </TabPanels>
              </Flex>
            </Flex>
          </Tabs>
        </Flex>
        {/* TODO: Extract to block */}
        <Flex
          basis="40%"
          flexDirection={'column'}
          padding={['40px 16px', '40px 16px', '52px 30px 59px']}
        >
          <Heading marginBottom={75}>Locked Amount</Heading>
          <Text marginBottom="30px">
            Funds can be locked only at Polkapad sale event. There is no way to
            put it after sale and before Polkapad mainnet
          </Text>
          {!account && (
            <Box bg="#F6F5F5" w="100%" p={4}>
              <Flex borderRadius={'4px'} alignItems="center" gap="14px">
                <Icon as={FaInfoCircle} height="14px" width="14px" />
                <Text fontWeight={600}>Login to check your locked funds</Text>
              </Flex>
            </Box>
          )}
          {account && (
            <>
              <Text color="#A5A5A5" marginBottom="30px">
                Minimum locked amount = 1 DOT
              </Text>
              <Flex flexDirection="column">
                {(lockedAmount || []).map((item, index) => (
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
                <Text marginRight={'5px'}>Don&apos;t see provided funds?</Text>
                <Text
                  color={'#49C7DA'}
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
      </Flex>
      <Footer />
    </>
  );
};

export default LockerPage;
