import React, { useEffect, useState } from 'react';

import { Flex, Spinner, Tabs } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { RightContainer } from './Header.style';
import Link from 'next/link';
import { HeaderItem } from './components/HeaderItems/HeaderItem';

import { useRouter } from 'next/router';

import { BSCWalletButton } from '@/components/BSCWalletButton/BSCWalletButton';
import { PolkadotWalletButton } from '@/components/PolkadotWalletButton/PolkaWalletButton';
import {
  HOME_ROUTE,
  LOCKER_ROUTE,
  STAKING_ROUTE,
  TEST_SALE_ROUTE,
  WAIT_ROUTE,
} from '@/constants/routes';
import { AccountButton } from './components/AccountButton/AccountButton';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { GetStartedButton } from './components/GetStartedButton/GetStartedButton';

interface HeaderProps {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const tabs = [
  {
    url: HOME_ROUTE,
    title: 'Launchpad',
  },
  {
    url: LOCKER_ROUTE,
    title: 'Locker',
  },
  {
    url: TEST_SALE_ROUTE,
    title: 'Test sale',
  },
  {
    url: STAKING_ROUTE,
    title: 'Staking',
  },
];

export const Header = (props: HeaderProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const isWaitRoute = router.pathname === WAIT_ROUTE;

  useEffect(() => {
    const selectedIndex = tabs.findIndex(({ url }) => url === router.pathname);
    setSelectedTab(selectedIndex);
  }, [router]);

  return (
    <Flex
      as="nav"
      align="center"
      width="100%"
      padding={['0 16px', '0 16px', '0 78px 0 70px']}
      bg="#F7F5F5"
      position="sticky"
      top={0}
      zIndex="3"
      backgroundColor="accent.green"
    >
      <Link href="https://polkapad.network">
        <Image
          src="/images/logo_header.svg"
          alt="Polkapad"
          padding={['24px 10px 24px 0', '24px 0']}
          width={['120px', '170px']}
          cursor="pointer"
        />
      </Link>
      {!isWaitRoute && (
        <>
          <MenuWrapper>
            <Tabs height="100%" width="100%" index={selectedTab}>
              <TabList justifyContent="center">
                {tabs.map((tab) => (
                  <HeaderItem key={tab.url} url={tab.url}>
                    {tab.title}
                  </HeaderItem>
                ))}
              </TabList>
            </Tabs>
            {props.isLoading && <Spinner />}
            {!props.isLoading && props.isLoggedIn && (
              <RightContainer>
                <BSCWalletButton />
                <PolkadotWalletButton />
                <AccountButton />
              </RightContainer>
            )}
            {!props.isLoading && !props.isLoggedIn && <GetStartedButton />}
          </MenuWrapper>
          <MobileMenu />
        </>
      )}
    </Flex>
  );
};

const MenuWrapper = styled.div`
  width: 100%;
  display: none;
  @media screen and (min-width: 1100px) {
    display: flex;
    align-items: center;
  }
`;
