import useUser from '@/lib/hooks/useUser';
import { shortenIfAddress } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';

import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { Button } from '../Button';
import fetchJson from '@/lib/fetchJson';
import { HeaderItem } from './components/HeaderItems/HeaderItem';
import { Header as HeaderComponent } from './Header';

import { FaUserAlt } from 'react-icons/fa';
import { shortenPolkaAddress } from '@/lib/utils';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { useConnectPolka } from '@/shared/hooks/useConnectPolka';

const ConnectWalletButton: React.FC = () => {
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

const PolkaConnentBtn = () => {
  const { balance, account, connectToPolka } = useConnectPolka();

  return (
    <>
      {balance && account && (
        <Button variant="secondary" fixedWidth={220} padding={'0px 32px'}>
          {balance &&
            parseFloat(formatEther(balance)).toFixed(3) + ' DOT' + ' | '}
          {shortenPolkaAddress(account)}
        </Button>
      )}
      {!account && (
        <Button onClick={connectToPolka} variant="secondary" fixedWidth={220}>
          Connect Polkadot
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
    () => [
      ConnectWalletButton,
      PolkaConnentBtn,
      isLoggedIn ? AccountButton : LoginButton,
    ],
    [isLoggedIn],
  );

  return (
    <HeaderComponent right={headerButtons}>
      <HeaderItem url="/">Launchpad</HeaderItem>
      <HeaderItem url="/locker">Locker</HeaderItem>
      <HeaderItem url="/staking">Staking</HeaderItem>
      <HeaderItem url="/docs">Docs</HeaderItem>
      <HeaderItem url="/blog">Blog</HeaderItem>
    </HeaderComponent>
  );
};

export { HeaderComponent, Header };
