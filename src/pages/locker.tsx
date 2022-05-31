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
    title: 'Complete registration & verify Metamask wallet',
    text: `Don't forget to connect your BNB wallet!`,
    buttonText: 'Register',
  },
  {
    title: 'Get KSM ot DOT on Binance',
    text: `Funds can be accpted ONLY from verified wallet`,
    buttonText: 'To Binance',
  },
  {
    title: 'Withdraw money to BNB Smart chain',
    text: `Don't forget to put reminder to come to sale`,
    buttonText: 'Connect wallet',
  },
  {
    title: 'Register on Polkadot sale',
    text: `Don't forget to put reminder to come to sale`,
    buttonText: 'Register',
  },
  {
    title: 'Come to sale and push the button',
    text: `Sale available ONLY in sale time only on this page!
             There is no way to add funds into locker before Polkapad mainnet`,
    buttonText: 'Register',
  },
  {
    title: 'Get locker balance. Ready to upcoming sales! ',
    text: `Locker balance will be converted into PLPD tokens in GEAR mainnet`,
    buttonText: 'To sale',
  },
];

const ksmSteps = [
  {
    title: 'Complete registration & verify Polkadot wallet',
    text: `Don't forget to connect your BNB wallet!`,
    buttonText: 'Register',
  },
  {
    title: 'Get KSM to the Kusama relay chain',
    text: `Only KSM in the KUSAMA relay will work`,
    buttonText: 'To KSM',
  },
  {
    title: 'Register on Polkadot sale',
    text: `Don't forget to put reminder to come to sale`,
    buttonText: 'Register',
  },
  {
    title: 'Come to sale and push and send funds to the address',
    text: `Sale available ONLY in sale time only on this page!
            There is no way to add funds into locker before Polkapad mainnet`,
    buttonText: 'Register',
  },
  {
    title: 'Get locker balance. Ready to upcoming sales! ',
    text: `Locker balance will be converted into PLPD tokens in GEAR mainnet`,
    buttonText: 'To Sale',
  },
];

const lockedAmount = [
  {
    from: 'KSM from Kusama chain',
    amount: 5,
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
    from: 'MOVR from moonriver chain',
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
          <Button>{step.buttonText}</Button>
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
            Choose what suits you best. Lock DOT and KSM to receive allocation
            in first sales.
            <br />
            Needed: Binance account, Metamask wallet, Polkadot wallet account.
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
                    fontSize={['10px','12px',' inherit']}
                  >
                    BNB Smart Chain
                  </Tab>
                  <Tab
                    borderRadius={'4px'}
                    _selected={{ color: 'white', bg: '#49C7DA' }}
                    fontSize={['10px','12px',' inherit']}
                  >
                    Kusama
                  </Tab>
                  <Tab isDisabled _disabled={{ color: 'gray' }} fontSize={['10px','12px',' inherit']}>
                    Mooriver
                  </Tab>
                  <Tab isDisabled _disabled={{ color: 'gray' }} fontSize={['10px','12px',' inherit']}>
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
        <Flex basis="40%" flexDirection={'column'} padding={["40px 16px", "40px 16px", "52px 30px 59px"]}>
          <Heading marginBottom={75}>Locked Amount</Heading>
          <Text marginBottom="30px">
            Funds can be locked only at sale event. There is no way to put it
            after sale and before Polkapad mainnet
          </Text>
          {!account && (
            <Box bg="#F6F5F5" w="100%" p={4}>
              <Flex borderRadius={'4px'} alignItems="center" gap="14px">
                <Icon as={FaInfoCircle} height="14px" width="14px" />
                <Text fontWeight={600}>Login to check your amounts</Text>
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
                <Button variant="primary" width="100px">
                  Buy more
                </Button>
                <Button variant="secondary" width="120px">
                  Withdraw funds
                </Button>
              </Flex>
              <Flex>
                <Text marginRight={'5px'}>Don&apos;t see provided funds?</Text>
                <Text color={'#49C7DA'} fontWeight={700}>
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
