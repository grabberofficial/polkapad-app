import Link from 'next/link';
import { AUTH_EMAIL_ROUTE, KYC_ROUTE, WALLET_ROUTE } from '@/constants/routes';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';

export const getSteps = (
  isLoggedIn: boolean,
  walletsAreVerified: boolean,
  isKYCAccepted: boolean,
) => [
  {
    title: 'Sign Up',
    text: 'Start your Polkapad journey with few simple steps!',
    isCurrent: !isLoggedIn,
    isComplete: isLoggedIn,
    button: (
      <Link href={AUTH_EMAIL_ROUTE}>
        <StepButton variant={!isLoggedIn ? 'primary' : 'secondary'}>
          Sign Up
        </StepButton>
      </Link>
    ),
  },
  {
    title: 'Verify wallet',
    text: 'This is the only wallet you will be able to use for sale',
    isCurrent: isLoggedIn && !walletsAreVerified,
    isComplete: isLoggedIn && walletsAreVerified,
    button: (
      <Link href={WALLET_ROUTE}>
        <StepButton
          variant={isLoggedIn && !walletsAreVerified ? 'primary' : 'secondary'}
        >
          Verify wallet
        </StepButton>
      </Link>
    ),
  },
  {
    title: 'KYC',
    text: 'KYC is mandatory if you want to participate in a sale\n',
    isCurrent: isLoggedIn && walletsAreVerified && !isKYCAccepted,
    isComplete: isLoggedIn && walletsAreVerified && isKYCAccepted,
    button: (
      <Link href={KYC_ROUTE}>
        <StepButton
          variant={
            isLoggedIn && walletsAreVerified && !isKYCAccepted
              ? 'primary'
              : 'secondary'
          }
        >
          Start KYC
        </StepButton>
      </Link>
    ),
  },
  {
    title: 'Register for Sale',
    text: 'Once registration closes, you will not be able to register',
    isCurrent: isLoggedIn && isKYCAccepted,
    isComplete: false,
    button: (
      <StepButton
        variant={isLoggedIn && isKYCAccepted ? 'primary' : 'secondary'}
      >
        Soon
      </StepButton>
    ),
  },
];

const StepButton = styled(Button)`
  width: fit-content;
  height: 40px;
`;
