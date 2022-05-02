import useUser from '@/lib/hooks/useUser';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import { Button } from '../Button';
import fetchJson from '@/lib/fetchJson';
import { HeaderItem } from './components/HeaderItems/HeaderItem';
import { Header as HeaderComponent } from './Header';

import { FaUserAlt } from 'react-icons/fa';

const ConnectWalletButton: React.FC = () => {
  return (
    <Button variant="secondary" fixedWidth={150}>
      Connect Wallet
    </Button>
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
    // <Button
    //   variant="secondary"
    //   iconPlacement="left"
    //   icon={
    //     <Icon as={FaUserAlt} height="21px" width="21px" color="#49C7DA" />
    //   }
    //   fixedWidth={152}
    //   withIconDivider
    // >
    //   Account
    // </Button>
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

  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

  console.log({
    isLoggedIn,
    user,
  });

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
