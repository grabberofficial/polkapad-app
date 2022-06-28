import React, { useEffect, useState } from 'react';

import { Flex, Tabs, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { RightContainer } from './Header.style';
import Link from 'next/link';
import { HeaderItem } from './components/HeaderItems/HeaderItem';

import useUser from '@/lib/hooks/useUser';

import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Button } from '../Button';
import fetchJson from '@/lib/fetchJson';

import { FaUserAlt } from 'react-icons/fa';

import { ConnectWalletButton } from '@/components/ConnectWalletButton/ConnectWalletButton';
import { PolkaConnentBtn } from '@/components/PolkaConnectButton/PolkaConnectButton';

const tabs = [
  {
    url: '/',
    title: 'Launchpad',
  },
  {
    url: '/locker',
    title: 'Locker',
  },
  {
    url: '/staking',
    title: 'Staking',
  },
];

export const SignUpButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      variant="primary"
      iconPlacement="left"
      icon={
        <Icon
          as={FaUserAlt}
          height={['14px', '21px']}
          width={['14px', '21px']}
          color="white"
        />
      }
      fixedWidth={152}
      withIconDivider
      onClick={() => router.push('/auth/register')}
    >
      Sign up
    </Button>
  );
};

export const AccountButton: React.FC = () => {
  const { mutateUser } = useUser();
  const router = useRouter();

  const logout = useCallback(async () => {
    await mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
    router.push('/');
  }, [mutateUser, router]);

  return (
    <Menu gutter={30}>
      <MenuButton
        as={Button}
        leftIcon={
          <Icon
            as={FaUserAlt}
            height="21px"
            width="21px"
            color="primary.basic"
          />
        }
        _active={{ background: 'white' }}
      >
        Account
      </MenuButton>
      <MenuList borderRadius="4px" background="#F6F5F5" border="none">
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={() => router.push('/profile')}
        >
          My account
        </MenuItem>
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={() => router.push('/profile?kyc=true')}
        >
          KYC Verification
        </MenuItem>
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={logout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export const Header: React.FC<{
  isLoggedIn: boolean;
}> = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const selectedIndex = tabs.findIndex(({ url }) => url === router.pathname);
    setSelectedTab(selectedIndex);
  }, [router]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={['0 16px', '0 16px', '0 78px 0 70px']}
      bg="#F7F5F5"
      position="sticky"
      top={0}
      zIndex="2"
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
      <DesktopMenuWrapper>
        <Tabs height={'100%'} index={selectedTab}>
          <TabList>
            {tabs.map((tab) => (
              <HeaderItem key={tab.url} url={tab.url}>
                {tab.title}
              </HeaderItem>
            ))}
          </TabList>
        </Tabs>
        <RightContainer>
          <ConnectWalletButton />
          <PolkaConnentBtn />
          {props.isLoggedIn ? <AccountButton /> : <SignUpButton />}
        </RightContainer>
      </DesktopMenuWrapper>
      <MobileMenuWrapper>
        <MobileMenu />
      </MobileMenuWrapper>
    </Flex>
  );
};

const MobileMenu: React.FC = () => {
  const { mutateUser, user } = useUser();
  const router = useRouter();

  const logout = useCallback(async () => {
    await mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
    router.push('/');
  }, [mutateUser, router]);

  return (
    <Menu>
      <MenuButton
        as={StyledIconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {user?.isLoggedIn && (
          <>
            <MenuItem onClick={() => router.push('/profile')}>
              My account
            </MenuItem>
            <MenuItem onClick={() => router.push('/profile?kyc=true')}>
              KYC verification
            </MenuItem>
          </>
        )}
        {!user?.isLoggedIn && (
          <MenuItem onClick={() => router.push('/auth/register')}>
            Sign up
          </MenuItem>
        )}
        <MenuItem onClick={() => router.push('/')}>Launchpad</MenuItem>
        <MenuItem onClick={() => router.push('/locker')}>Locker</MenuItem>
        <MenuItem onClick={() => router.push('/staking')}>Staking</MenuItem>
        {user?.isLoggedIn && <MenuItem onClick={logout}>Logout</MenuItem>}
      </MenuList>
    </Menu>
  );
};

const StyledIconButton = styled(IconButton)`
  padding: 15px;
  width: 14px;
  height: 14px;
  @media screen and (min-width: 30em) {
    width: inherit;
    height: inherit;
  }
`;
const DesktopMenuWrapper = styled.div`
  display: none;
  @media screen and (min-width: 1100px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 10px 0 0;
  }
  @media screen and (min-width: 1100px) {
    display: none;
  }
`;
