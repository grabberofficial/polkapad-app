import useUser from '@/lib/hooks/useUser';
import { useEthers, useEtherBalance, shortenIfAddress } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { Button } from '../Button';
import fetchJson from '@/lib/fetchJson';
import { HeaderItem } from './components/HeaderItems/HeaderItem';
import { Header as HeaderComponent } from './Header';

import { FaUserAlt } from 'react-icons/fa';

const ConnectWalletButton: React.FC = () => {
  const {
    activateBrowserWallet,
    account,
    chainId,
    active,
    library,
    deactivate,
  } = useEthers();
  const etherBalance = useEtherBalance(account, { chainId });
  console.log('etherBalance', etherBalance);
  const connected = !!chainId;
  console.log(
    'chainId =',
    chainId,
    'account =',
    account,
    'active =',
    active,
    'library =',
    library,
  );

  return (
    <>
      {connected && account && (
        <Button
          onClick={deactivate}
          variant="secondary"
          fixedWidth={220}
          padding={'0px 32px'}
        >
          {etherBalance &&
            parseFloat(formatEther(etherBalance)).toFixed(3) + ' ETH' + ' | '}
          {shortenIfAddress(account)}
        </Button>
      )}
      {!account && (
        <Button
          onClick={activateBrowserWallet}
          variant="secondary"
          fixedWidth={220}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};

const LoginButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      variant="primary"
      iconPlacement="left"
      icon={<Icon as={FaUserAlt} height="21px" width="21px" color="white" />}
      fixedWidth={152}
      withIconDivider
      onClick={() => router.push('/auth/login')}
    >
      Log in
    </Button>
  );
};

const AccountButton: React.FC = () => {
  const { mutateUser } = useUser();
  const router = useRouter();

  const logout = useCallback(async () => {
    mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false);
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
          Account stats
        </MenuItem>
        <MenuItem
          color="#5B5B5B"
          _hover={{ color: 'white', backgroundColor: '#49C7DA' }}
          paddingLeft="20px"
        >
          My Allocations
        </MenuItem>
        <MenuItem
          color="#5B5B5B"
          _hover={{ color: 'white', backgroundColor: '#49C7DA' }}
          paddingLeft="20px"
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

const Header = () => {
  const { user } = useUser();

  console.log({
    user,
  });

  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

  const headerButtons = useMemo(
    () => [ConnectWalletButton, isLoggedIn ? AccountButton : LoginButton],
    [isLoggedIn],
  );

  return (
    <HeaderComponent right={headerButtons}>
      <HeaderItem url="/">Home</HeaderItem>
      <HeaderItem url="/launchpad">Launchpad</HeaderItem>
      <HeaderItem url="/about">About</HeaderItem>
      <HeaderItem url="/docs">Docs</HeaderItem>
      <HeaderItem url="/blog">Blog</HeaderItem>
      <HeaderItem url="/community">Community</HeaderItem>
    </HeaderComponent>
  );
};

export { HeaderComponent, Header };
