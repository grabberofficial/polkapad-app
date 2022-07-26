import { useMemo } from 'react';
import {
  Circle,
  Flex,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { css, Global } from '@emotion/react';
import { TabList } from '@/components/Header/components/HeaderItems/HeaderItems.style';
import { Footer } from '@/components/footer';
import useUser from '@/lib/hooks/useUser';
import {
  getBnbSteps,
  getKSMSteps,
} from '@/components/pages/Locker/LockerPage.utils';
import { LockedAmounts } from '@/components/pages/Locker/components/LockedAmounts/LockedAmounts';

export const LockerPage = () => {
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
        <Circle size="25px" fontSize="13px" bg="primary.basic" color="white">
          <Text>{index + 1}</Text>
        </Circle>
        <Flex marginLeft={'20px'} marginRight={'10px'} flexDirection={'column'}>
          <Text fontSize="14px" fontWeight={500}>
            {step.title}
          </Text>
          <Text fontSize="12px">{step.text}</Text>
        </Flex>
        <Flex marginLeft={'auto'} width={150} flexShrink={0}>
          {step.button}
        </Flex>
      </Flex>
    );
  };

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
                    _selected={{ color: 'white', bg: 'primary.basic' }}
                    fontSize={['10px', '12px', ' inherit']}
                  >
                    BNB Smart Chain
                  </Tab>
                  <Tab
                    borderRadius={'4px'}
                    _selected={{ color: 'white', bg: 'primary.basic' }}
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
        <LockedAmounts />
      </Flex>
      <Footer />
    </>
  );
};
