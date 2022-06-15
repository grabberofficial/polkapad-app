import { useMemo } from 'react';
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
import { FaInfoCircle } from 'react-icons/fa';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import useUser from '@/lib/hooks/useUser';
import { ConnectWalletButton } from '@/components/ConnectWalletButton/ConnectWalletButton';

const getBnbSteps = (isLoggedIn: boolean) => [
  {
    title: 'Complete registration & verify your ETH/BNB and Polkadot addresses',
    text: `Addresses can’t be changed until the launch of Polkapad mainnet.`,
    button: (
      <Link href={isLoggedIn ? '/profile' : '/auth/register'}>
        <Button>Register</Button>
      </Link>
    ),
  },
  {
    title: 'Get KSM ot DOT on Binance',
    text: `Funds can be accepted ONLY from verified wallet, not from Binance directly`,
    button: (
      <Link href="https://www.binance.com/">
        <Button>Get on Binance</Button>
      </Link>
    ),
  },
  {
    title: 'Withdraw funds to BNB Smart Chain or verified ETH/BNB address',
    text: `Don’t forget to set a reminder to come to the sale.`,
    button: <ConnectWalletButton />,
  },
  {
    title: 'Register on the Polkapad sale',
    text: `Don’t forget to set a reminder to come to the sale.`,
    button: <Button disabled>Get ready</Button>,
  },
  {
    title: 'Come to the sale and push the button',
    text: `The sale is available ONLY during specified time and only on this page! There will be no way to add funds into the locker before the launch of Polkapad mainnet`,
    button: (
      <Link href="/">
        <Button>To sale</Button>
      </Link>
    ),
  },
  {
    title: 'Get locker balance',
    text: `Ready for upcoming sales!`,
    button: (
      <Link href="/">
        <Button disabled>To next sale</Button>
      </Link>
    ),
  },
];

const getKSMSteps = (isLoggedIn: boolean) => [
  {
    title: 'Complete registration & verify your Kusama address',
    text: `Addresses can’t be changed until the launch of Polkapad mainnet.`,
    button: (
      <Link href={isLoggedIn ? '/profile' : '/auth/register'}>
        <Button>Register</Button>
      </Link>
    ),
  },
  {
    title: 'Get more KSM',
    text: `Funds can be accepted ONLY from a verified wallet. Funds can't be accepted from exchanges directly.`,
    button: (
      <Link href="https://coinmarketcap.com/currencies/kusama/markets/">
        <Button>Get KSM</Button>
      </Link>
    ),
  },
  {
    title: 'Sign up for the Polkapad sale',
    text: `Don’t forget to set a reminder to come to the sale.`,
    button: <Button disabled>Get ready</Button>,
  },
  {
    title: 'Come to the sale and push a button to send funds to the address',
    text: `The sale is available ONLY during the designated time and ONLY on this page!
     There will be no way to add funds to the locker before the launch of the main Polkapad network.`,
    button: (
      <Link href="/">
        <Button>To sale</Button>
      </Link>
    ),
  },
  {
    title: 'Get locker balance',
    text: `Ready for upcoming sales!`,
    button: (
      <Link href="/">
        <Button disabled>To next sale</Button>
      </Link>
    ),
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
    from: 'Ambassador',
    amount: 0,
  },
];

const LockerPage = () => {
  const { user } = useUser();
  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

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
          <Text>{index + 1}</Text>
        </Circle>
        <Flex marginLeft={'20px'} marginRight={'10px'} flexDirection={'column'}>
          <Text fontSize="14px" fontWeight={500}>
            {step.title}
          </Text>
          <Text fontSize="12px">{step.text}</Text>
        </Flex>
        <Flex marginLeft={'auto'} width={160} flexShrink={0}>
          {step.button}
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
            Step-by-step guide
          </Heading>
          <Text>
            Choose what suits you best.
            <br />
            <br />
            Cheap and Easy: deposit DOT or KSM directly from Binance via BNB
            Smart Chain (Metamask and Polkadot.js required).
            <br />
            <br />
            True and Native: deposit KSM in an old-fashioned way by sending
            tokens to the provided address via Kusama chain (only Polkadot.js
            required).
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
                    Moonriver
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
                    {getBnbSteps(isLoggedIn).map(renderStep)}
                  </TabPanel>
                  <TabPanel padding={'20px 0px 0px 0px'}>
                    {getKSMSteps(isLoggedIn).map(renderStep)}
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
            Funds can be locked only at the Polkapad sale event. There is no way
            to add tokens after the sale and before the launch of Polkapad
            mainnet
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
                <Text marginRight={'5px'}>
                  Don&apos;t see the provided funds?
                </Text>
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
