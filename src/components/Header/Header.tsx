import React, { useEffect, useState } from 'react';

import { Flex, Tabs, Menu, MenuItem, IconButton, MenuButton, MenuList } from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { useRouter } from 'next/router';
import { RightContainer } from './Header.style';
import Link from 'next/link';
import { HeaderItem } from './components/HeaderItems/HeaderItem';

export const Header: React.FC<{ walletButton: React.FC; polkaConnectButton: React.FC; loginButton: React.FC }> = (props) => {
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
      padding={['0 16px','0 16px','0 78px 0 70px']}
      bg="#F7F5F5"
      position="sticky"
      top={0}
      zIndex="2"
    >
      <Link href="/">
        <Image
          src="/images/logo_header.png"
          alt="Polkapad"
          padding={'24px 0'}
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
          <props.walletButton />
          <props.polkaConnectButton />
          <props.loginButton />
        </RightContainer>
      </DesktopMenuWrapper>
      <MobileMenuWrapper>
        <props.loginButton />
        <MobileMenu walletButton={props.walletButton} polkaConnectButton={props.polkaConnectButton}/>
      </MobileMenuWrapper>
    </Flex>
  );
};

const MobileMenu:React.FC<{ walletButton: React.FC; polkaConnectButton: React.FC}> = (props) => {
  return (
    <Menu>
      <MenuButton
        as={StyledIconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem>
          <Link href="/">Launchpad</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/locker">Locker</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/staking">Staking</Link>
        </MenuItem>
        <MenuItem>
          <props.walletButton />
        </MenuItem>
        <MenuItem>
          <props.polkaConnectButton />
        </MenuItem>
      </MenuList>
  </Menu>
  )
}


const StyledIconButton = styled(IconButton)`
  padding: 23px;
`
const DesktopMenuWrapper = styled.div`
  display: none;
  @media screen and (min-width: 1100px) {
    display: flex;
    align-items: center;
  }
`

const MobileMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0 10px 0 0;
  }
  @media screen and (min-width: 1100px) {
    display: none;
  }
`