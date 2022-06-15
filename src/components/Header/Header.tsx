import React, { useEffect, useState } from 'react';

import {
  Flex,
  Tabs,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { RightContainer } from './Header.style';
import Link from 'next/link';
import { HeaderItem } from './components/HeaderItems/HeaderItem';

import useUser from '@/lib/hooks/useUser';
import { formatEther } from '@ethersproject/units';

import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';

import { Button } from '../Button';
import fetchJson from '@/lib/fetchJson';

import { FaUserAlt } from 'react-icons/fa';
import { shortenPolkaAddress } from '@/lib/utils';
import { UserContext } from '@/shared/providers/userContext';
import { useSubstrate } from '@/shared/providers/substrate';
import { ConnectWalletButton } from '@/components/ConnectWalletButton/ConnectWalletButton';

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

const StyledButton = styled(ChakraButton)`
  color: #49c7da;
`;

export const PolkaConnentBtn = () => {
  const { polka } = useContext(UserContext);
  const { balance, account, connectToPolka, keyringState, canUseWallet } =
    useSubstrate();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((isOpen) => !isOpen);
  }, []);

  const hasData = balance || (polka?.address && polka?.balance);

  return (
    <>
      {hasData && (
        <Button
          variant="secondary"
          fixedWidth={200}
          flexShrink={0}
          iconPlacement="left"
          padding="0 32px"
          icon={
            <Image
              src="/images/icon_polka.png"
              alt="Polkapad"
              width="29px"
              height="29px"
            />
          }
        >
          {balance && parseFloat(formatEther(balance)).toFixed(3)}
          {polka.balance && polka.balance}
          {' DOT  | '}
          {shortenPolkaAddress(account || polka.address)}
        </Button>
      )}
      {!hasData && (
        <Button
          onClick={canUseWallet ? connectToPolka : toggleModal}
          disabled={keyringState !== 'READY'}
          variant="secondary"
          fixedWidth={200}
          flexShrink={0}
          iconPlacement="left"
          padding="0 32px"
          icon={
            <Image
              src="/images/icon_polka.png"
              alt="Polkapad"
              width="29px"
              height="29px"
            />
          }
        >
          Connect Polkadot
        </Button>
      )}
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent width="80%">
          <ModalHeader>Haven’t got a Polkadot.js yet?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You&apos;ll need to{' '}
            <StyledButton
              variant="link"
              as="a"
              target="_blank"
              href="https://polkadot.js.org/extension/"
            >
              install Polkadot.js
            </StyledButton>{' '}
            to continue. Once you have it installed, go ahead and refresh this
            page
            <br />
            <br />
            Polkadot extension was not found or disabled. If you have
            polkadot.js but it doesn&apos;t work try this.
            <br />
            <br />
            <ol style={{ padding: '0 24px 24px' }}>
              <li>Check that you use latest version of Chrome or Firefox. </li>
              <li>
                If you reject polkadot.js connection go polkadot.js extension in
                your browser, press gear and check Manage Website Access.
                App.Polkapad.network should be allowed to use Polkapad
                launchpad.{' '}
              </li>
              <li>
                How to troubleshoot other connection issues on polkadot.js{' '}
                {'->'}{' '}
                <StyledButton
                  variant="link"
                  as="a"
                  target="_blank"
                  href="https://support.polkadot.network/support/solutions/articles/65000176918-how-to-troubleshoot-connection-issues-on-polkadot-js"
                >
                  Polkadot support webpage
                </StyledButton>
                .
              </li>
            </ol>
          </ModalBody>
        </ModalContent>
      </Modal>
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
