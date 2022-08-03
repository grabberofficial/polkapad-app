import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { BSCWalletButton } from '@/components/BSCWalletButton/BSCWalletButton';
import { PROFILE_ROUTE, REGISTER_ROUTE } from '@/constants/routes';

export const getBnbSteps = (isLoggedIn: boolean) => [
  {
    title: 'Complete registration & verify your ETH/BNB and Polkadot addresses',
    text: `Addresses can’t be changed until the launch of Polkapad mainnet.`,
    button: (
      <Link href={isLoggedIn ? PROFILE_ROUTE : REGISTER_ROUTE}>
        <Button>Register</Button>
      </Link>
    ),
  },
  {
    title: 'Get KSM ot DOT on Binance',
    text: `Funds can be accepted ONLY from verified wallet, not from Binance directly`,
    button: (
      <Link href="https://www.binance.com/">
        <Button>Get on Binance</Button>
      </Link>
    ),
  },
  {
    title: 'Withdraw funds to BNB Smart Chain or verified ETH/BNB address',
    text: `Don’t forget to set a reminder to come to the sale.`,
    button: <BSCWalletButton />,
  },
  {
    title: 'Register on the Polkapad sale',
    text: `Don’t forget to set a reminder to come to the sale.`,
    button: <Button disabled>Get ready</Button>,
  },
  {
    title: 'Come to the sale and push the button',
    text: `The sale is available ONLY during specified time and only on this page! There will be no way to add funds into the locker before the launch of Polkapad mainnet`,
    button: (
      <Link href="/">
        <Button>To sale</Button>
      </Link>
    ),
  },
  {
    title: 'Get locker balance',
    text: `Ready for upcoming sales!`,
    button: (
      <Link href="/src/components/pages">
        <Button disabled>To next sale</Button>
      </Link>
    ),
  },
];

export const getKSMSteps = (isLoggedIn: boolean) => [
  {
    title: 'Complete registration & verify your Kusama address',
    text: `Addresses can’t be changed until the launch of Polkapad mainnet.`,
    button: (
      <Link href={isLoggedIn ? PROFILE_ROUTE : REGISTER_ROUTE}>
        <Button>Register</Button>
      </Link>
    ),
  },
  {
    title: 'Get more KSM',
    text: `Funds can be accepted ONLY from a verified wallet. Funds can't be accepted from exchanges directly.`,
    button: (
      <Link href="https://coinmarketcap.com/currencies/kusama/markets/">
        <Button>Get KSM</Button>
      </Link>
    ),
  },
  {
    title: 'Sign up for the Polkapad sale',
    text: `Don’t forget to set a reminder to come to the sale.`,
    button: <Button disabled>Get ready</Button>,
  },
  {
    title: 'Come to the sale and push a button to send funds to the address',
    text: `The sale is available ONLY during the designated time and ONLY on this page!
     There will be no way to add funds to the locker before the launch of the main Polkapad network.`,
    button: (
      <Link href="/">
        <Button>To sale</Button>
      </Link>
    ),
  },
  {
    title: 'Get locker balance',
    text: `Ready for upcoming sales!`,
    button: (
      <Link href="/src/components/pages">
        <Button disabled>To next sale</Button>
      </Link>
    ),
  },
];
