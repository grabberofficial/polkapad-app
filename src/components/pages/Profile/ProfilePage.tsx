import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import useUser from '@/lib/hooks/useUser';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';

import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
} from 'react-icons/bs';

import { useRouter } from 'next/router';
import { Footer, FooterWrapper } from '@/components/footer';

import { mailchimpSendFinishedKyc } from '@/services/mailchimp';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { SupportButton } from '@/components/pages/Profile/components/KYCTab/components/SupportButton/SupportButton';
import { IoIosArrowForward } from 'react-icons/io';
import { sendMetricsSuccessKYC } from '@/services/metrics';
import { AccountTab } from '@/components/pages/Profile/components/AccountTab/AccountTab';
import { WalletTab } from './components/WalletTab/WalletTab';
import { KYCTab } from '@/components/pages/Profile/components/KYCTab/KYCTab';
import {
  KYCContext,
  KYCProvider,
} from '@/components/pages/Profile/components/KYCProvider/KYCProvider';
import {
  WalletsContext,
  WalletsProvider,
} from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';

const tabs = ['Profile details', 'Verify wallet', 'KYC Verification'];

const ProfilePageContent = () => {
  const { user } = useUser({
    redirectTo: '/auth/login',
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isKYCAccepted } = useContext(KYCContext);
  const { walletsAreVerified } = useContext(WalletsContext);

  useEffect(() => {
    if (router.query.kyc) {
      if (router.query.kyc === 'true') {
        setSelectedTab(2);
      } else if (router.query.kyc === 'success') {
        sendMetricsSuccessKYC();

        if (user?.email) {
          mailchimpSendFinishedKyc(user.email);
        }
      }
    }

    if (router.query.wallet) {
      setSelectedTab(1);
    }
  }, [router, setSelectedTab]);

  const tabContent = [
    <AccountTab key="account" />,
    <WalletTab key="wallet" setSelectedTab={setSelectedTab} />,
    <KYCTab key="kyc" />,
  ];

  return (
    <Fragment>
      {' '}
      <Flex
        padding={['40px 16px', '40px 16px', '40px 16px', '76px 155px 0']}
        flexDirection="column"
        position="relative"
      >
        {isMobile ? (
          <Heading fontSize="20px" marginBottom="20px">
            User Profile
          </Heading>
        ) : (
          <Heading marginBottom={101} withUnderline>
            User Profile
          </Heading>
        )}

        <Flex flexDirection={['column', 'column', 'column', 'row']}>
          {!isMobile && (
            <Flex
              direction={['column', 'row', 'row', 'column']}
              gap="30px"
              flexBasis="30%"
              mr={[0, 0, 0, '20px']}
              mb={['20px', '20px', '20px', 0]}
            >
              {tabs.map((tab, index) => (
                <Flex
                  gap="11px"
                  alignItems="center"
                  justifyContent="flex-start"
                  cursor="pointer"
                  key={index}
                  onClick={() => setSelectedTab(index)}
                >
                  <Icon
                    as={
                      index === 0 ||
                      (index === 2 && isKYCAccepted) ||
                      (index === 1 && walletsAreVerified)
                        ? BsFillCheckCircleFill
                        : BsFillExclamationCircleFill
                    }
                    color={
                      index === 0 ||
                      (index === 2 && isKYCAccepted) ||
                      (index === 1 && walletsAreVerified)
                        ? 'primary.basic'
                        : 'warning'
                    }
                  />
                  <Text
                    color={
                      index === selectedTab ? 'primary.basic' : 'secondary.text'
                    }
                    _hover={{ color: 'secondary.textHover' }}
                    fontWeight="600"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    {tab}
                  </Text>
                </Flex>
              ))}
            </Flex>
          )}
          <SupportButton />
          {isMobile ? (
            <Accordion allowMultiple w="100%" sx={{ columnCount: [1] }}>
              {tabContent.map((tab, index) => (
                <AccordionItem
                  margin="10px 0"
                  border="none"
                  key="index"
                  w="100%"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        padding="20px 25px"
                        color="secondary.text"
                        backgroundColor="secondary.basic"
                        border="1px solid var(--chakra-colors-border)"
                        borderRadius="4px"
                        _expanded={{
                          bg: 'secondary.basic',
                          borderBottom: 'none',
                          borderBottomRadius: '0',
                        }}
                      >
                        <Flex
                          flex="1"
                          flexDirection="row"
                          textAlign="left"
                          fontWeight="600"
                          fontSize="14px"
                          lineHeight="21px"
                        >
                          <Icon
                            as={
                              index === 0 ||
                              (index === 2 && isKYCAccepted) ||
                              (index === 1 && walletsAreVerified)
                                ? BsFillCheckCircleFill
                                : BsFillExclamationCircleFill
                            }
                            width={19}
                            height={19}
                            marginRight="11px"
                            color={
                              index === 0 ||
                              (index === 2 && isKYCAccepted) ||
                              (index === 1 && walletsAreVerified)
                                ? 'primary.basic'
                                : 'warning'
                            }
                          />
                          <div>{tabs[index]}</div>
                        </Flex>
                        {isExpanded ? (
                          <IoIosArrowForward
                            fontSize="20px"
                            style={{
                              transform: 'rotate(90deg)',
                              transition: 'transform 0.2s',
                            }}
                          />
                        ) : (
                          <IoIosArrowForward
                            fontSize="20px"
                            style={{ transition: 'transform 0.2s' }}
                          />
                        )}
                      </AccordionButton>
                      <AccordionPanel
                        border="1px solid var(--chakra-colors-border)"
                        borderTop="none"
                        borderBottomRadius="4px"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="21px"
                      >
                        {tab}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            tabContent[selectedTab]
          )}
        </Flex>
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Fragment>
  );
};

export const ProfilePage = (props: any) => (
  <KYCProvider>
    <WalletsProvider>
      <ProfilePageContent {...props} />
    </WalletsProvider>
  </KYCProvider>
);
