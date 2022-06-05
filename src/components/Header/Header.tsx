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
import { shortenIfAddress } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';

import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';

import { Button } from '../Button';
import fetchJson from '@/lib/fetchJson';

import { FaUserAlt } from 'react-icons/fa';
import { shortenPolkaAddress } from '@/lib/utils';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';

import { UserContext } from '@/shared/providers/userContext';
import { useSubstrate } from '@/shared/providers/substrate';

export const ConnectWalletButton: React.FC = () => {
  const { disconnectFromBSC, connenctToBSC, balance, connected, account } =
    useConnectBSC();

  return (
    <>
      {connected && account && (
        <Button
          onClick={disconnectFromBSC}
          variant="secondary"
          fixedWidth={220}
          padding={'0px 32px'}
        >
          {balance &&
            parseFloat(formatEther(balance)).toFixed(3) + ' BNB' + ' | '}
          {shortenIfAddress(account)}
        </Button>
      )}
      {!account && (
        <Button onClick={connenctToBSC} variant="secondary" fixedWidth={220}>
          Connect BSC
        </Button>
      )}
    </>
  );
};

export const PolkaConnentBtn = () => {
  const { polka } = useContext(UserContext);
  const { balance, account, connectToPolka, disconnect } = useSubstrate();

  const hasData = (balance && account) || (polka?.address && polka?.balance);

  return (
    <>
      {hasData && (
        <Button
          variant="secondary"
          fixedWidth={220}
          padding={'0px 32px'}
          onClick={disconnect}
        >
          {balance && parseFloat(formatEther(balance)).toFixed(3)}
          {polka.balance && polka.balance}
          {' DOT  | '}
          {shortenPolkaAddress(account || polka.address)}
        </Button>
      )}
      {!hasData && (
        <Button onClick={connectToPolka} variant="secondary" fixedWidth={220}>
          Connect Polkadot
        </Button>
      )}
    </>
  );
};

export const LoginButton: React.FC = () => {
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
      onClick={() => router.push('/auth/login')}
    >
      Log in
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
          <Icon as={FaUserAlt} height="21px" width="21px" color="#49C7DA" />
        }
        _active={{ background: 'white' }}
      >
        Account
      </MenuButton>
      <MenuList borderRadius="4px" background="#F6F5F5" border="none">
        <MenuItem
          color="#5B5B5B"
          _hover={{ color: 'white', backgroundColor: '#49C7DA' }}
          paddingLeft="20px"
          onClick={() => router.push('/profile')}
        >
          My account
        </MenuItem>
        <MenuItem
          color="#5B5B5B"
          _hover={{ color: 'white', backgroundColor: '#49C7DA' }}
          paddingLeft="20px"
          onClick={() => router.push('/profile?kyc=true')}
        >
          KYC Verification
        </MenuItem>
        <MenuItem
          color="#5B5B5B"
          _hover={{ color: 'white', backgroundColor: '#49C7DA' }}
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

  const childrenUrls = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) return child?.props?.url;
  });

  useEffect(() => {
    const selectedIndex = (childrenUrls ?? []).findIndex(
      (url) => url === router.pathname,
    );
    setSelectedTab(selectedIndex);
  }, [router, childrenUrls]);

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
      <Link href="/">
        <Image
          src="/images/logo_header.png"
          alt="Polkapad"
          padding={['24px 10px 24px 0', '24px 0']}
          width={['120px', '170px']}
          cursor="pointer"
        />
      </Link>
      <DesktopMenuWrapper>
        <Tabs height={'100%'} index={selectedTab}>
          <TabList>
            <HeaderItem url="/">Launchpad</HeaderItem>
            <HeaderItem url="/locker">Locker</HeaderItem>
            <HeaderItem url="/staking">Staking</HeaderItem>
          </TabList>
        </Tabs>
        <RightContainer>
          <ConnectWalletButton />
          <PolkaConnentBtn />
          {props.isLoggedIn ? <AccountButton /> : <LoginButton />}
        </RightContainer>
      </DesktopMenuWrapper>
      <MobileMenuWrapper>
        {props.isLoggedIn ? <AccountButton /> : <LoginButton />}
        <MobileMenu />
      </MobileMenuWrapper>
    </Flex>
  );
};

const MobileMenu: React.FC = () => {
  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={StyledIconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={() => router.push('/')}>Launchpad</MenuItem>
        <MenuItem onClick={() => router.push('/locker')}>Locker</MenuItem>
        <MenuItem onClick={() => router.push('/staking')}>Staking</MenuItem>
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
