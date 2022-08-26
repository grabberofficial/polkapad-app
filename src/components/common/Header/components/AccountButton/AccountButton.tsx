import React, { useCallback } from 'react';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import fetchJson from '@/services/fetchJson';
import {
  API_LOGOUT_ROUTE,
  HOME_ROUTE,
  KYC_ROUTE,
  PROFILE_ROUTE,
} from '@/constants/routes';
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Button } from '@/components/common/Button';
import { BiUser } from 'react-icons/bi';
import { HamburgerIcon } from '@chakra-ui/icons';

export const AccountButton = () => {
  const { mutateUser } = useUser();
  const router = useRouter();

  const logout = useCallback(async () => {
    await mutateUser(
      await fetchJson(API_LOGOUT_ROUTE, { method: 'POST' }),
      false,
    );
    router.push(HOME_ROUTE);
  }, [mutateUser, router]);

  return (
    <Menu gutter={30}>
      <MenuButton
        as={Button}
        padding={0}
        width="auto"
        marginLeft="8px"
        flexShrink={0}
        leftIcon={
          <Flex
            backgroundColor="background.dark"
            borderRadius="100px"
            width="80px"
            height="40px"
            alignItems="center"
            marginRight="-4px"
            _hover={{ opacity: 0.8 }}
          >
            <Flex
              backgroundColor="accent.blue"
              width="32px"
              height="32px"
              borderRadius="100%"
              alignItems="center"
              justifyContent="center"
              marginLeft="4px"
            >
              <Icon as={BiUser} height="18px" width="18px" color="#FFF" />
            </Flex>
            <HamburgerIcon
              color="#FFF"
              width="22px"
              height="22px"
              marginLeft="8px"
            />
          </Flex>
        }
        _active={{ background: 'transparent' }}
      ></MenuButton>
      <MenuList borderRadius="4px" background="#F6F5F5" border="none">
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={() => router.push(PROFILE_ROUTE)}
        >
          My account
        </MenuItem>
        <MenuItem
          color="menu.text"
          fontWeight={600}
          _hover={{ color: 'white', backgroundColor: 'primary.basic' }}
          paddingLeft="20px"
          onClick={() => router.push(KYC_ROUTE)}
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
