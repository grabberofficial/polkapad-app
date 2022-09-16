import { Flex, Text } from '@chakra-ui/react';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import { usePolkadotExtension } from '@/hooks/usePolkadotExtension';
import { gearService } from '@/hooks/gearService';
import { PolkadotWalletButton } from '@/components/PolkadotWalletButton/PolkaWalletButton';
import { useCallback, useContext, useMemo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import useUser from '@/hooks/useUser';
import { WalletsContext } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { BN } from '@polkadot/util';
import {
  REGISTER_ROUTE,
  STAKING_ROUTE,
  WALLET_ROUTE,
} from '@/constants/routes';
import Link from 'next/link';
import { CompletedTag } from '@/components/common/CompletedTag/CompletedTag';
import { Footer, FooterWrapper } from '@/components/footer';

const GEAR_MINIMAL_BALANCE = new BN('0');

const getFirstStepButton = (
  isLoggedIn: boolean,
  walletsAreVerified: boolean,
) => {
  if (!isLoggedIn) {
    return (
      <Link href={REGISTER_ROUTE}>
        <Button variant="primary" width="97px">
          Sign up
        </Button>
      </Link>
    );
  }

  if (!walletsAreVerified) {
    return (
      <Link href={WALLET_ROUTE}>
        <Button variant="primary" width="97px">
          Verify Wallets
        </Button>
      </Link>
    );
  }

  return null;
};
const getSteps = (
  address: string,
  isLoading: boolean,
  isLoggedIn: boolean,
  walletsAreVerified: boolean,
  claimPLPDAvailable: boolean,
  stakingAvailable: boolean,
  claimTestGear: () => void,
  claimTestPLPD: () => void,
) => [
  {
    title: 'Registration',
    text: 'Complete Registration in the Polkapad ecosystem',
    button: getFirstStepButton(isLoggedIn, walletsAreVerified),
    isCompleted: isLoggedIn && walletsAreVerified,
  },
  {
    title: 'Claim $GEAR',
    text: 'Claim your $GEAR native coins',
    isCompleted: claimPLPDAvailable,
    button: address ? (
      <Button
        variant="primary"
        width="97px"
        isLoading={isLoading}
        onClick={claimTestGear}
        disabled={!isLoggedIn || !walletsAreVerified || isLoading}
      >
        Claim
      </Button>
    ) : (
      <PolkadotWalletButton />
    ),
  },
  {
    title: 'Claim $PLPD on our page',
    text: 'You will need $PLPD tokens in order to participate in the sale',
    isCompleted: stakingAvailable,
    button: address ? (
      <Button
        variant="primary"
        width="97px"
        isLoading={isLoading}
        onClick={claimTestPLPD}
        disabled={!claimPLPDAvailable || isLoading}
      >
        Claim
      </Button>
    ) : (
      <PolkadotWalletButton />
    ),
  },
  {
    title: 'Stake $PLPD on the Staking page',
    text: 'Min stake = 1 $PLPD',
    button: (
      <Link href={STAKING_ROUTE}>
        <Button variant="primary" width="97px" disabled={!stakingAvailable}>
          Stake
        </Button>
      </Link>
    ),
  },
  {
    title: 'Sale',
    text: 'Now you just need to wait! Invite your friends and get a chance to win $5,000',
    button: (
      <Button variant="primary" width="152px">
        Invite friends
      </Button>
    ),
  },
];

export const TestSalePage = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const {
    address,
    updateBalance,
    balance,
    plpdBalance,
    isLoading: isBalanceLoading,
  } = usePolkadotExtension();
  const { user } = useUser();
  const { walletsAreVerified } = useContext(WalletsContext);
  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);
  const isLoading = isBalanceLoading || isClaiming;
  const claimPLPDAvailable =
    isLoggedIn && walletsAreVerified && !!balance?.gt(GEAR_MINIMAL_BALANCE);
  const stakingAvailable =
    claimPLPDAvailable && parseFloat(plpdBalance || '') > 0;

  const claimTestGear = useCallback(async () => {
    setIsClaiming(true);
    await gearService.transferBalance(address);
    await updateBalance();
    setIsClaiming(false);
  }, [address, updateBalance]);

  const claimTestPLPD = useCallback(async () => {
    setIsClaiming(true);
    await gearService.claimPLPD(address);
    await updateBalance();
    setIsClaiming(false);
  }, [address, updateBalance]);
  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="background.dark"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        alignItems="center"
        justifyContent="center"
        height="480px"
      >
        <Flex
          padding={[
            '120px 16px 119px',
            '120px 16px 119px',
            '120px 115px 119px',
          ]}
          justifyContent="center"
          backgroundImage="images/test_sale_banner.svg"
          backgroundSize="30%"
          backgroundPosition={['100%', '100%', '70% 100%']}
          backgroundRepeat="no-repeat"
          flexDirection="column"
          maxWidth="1440px"
          height="100%"
          width="100%"
        >
          <Heading marginBottom="16px" color="#fff" fontSize="64px">
            Test the future
          </Heading>

          <HeaderFlex flexDirection="column">
            <BannerText>Take part in the first Polkapad test sale!</BannerText>
          </HeaderFlex>

          <Button
            width="130px"
            backgroundColor="accent.green"
            marginTop="32px"
            _hover={{ backgroundColor: 'background.gray' }}
          >
            Start now!
          </Button>
        </Flex>
      </Flex>

      <Flex flexDirection="column" width="100%">
        <Flex
          position="relative"
          padding={['40px 16px 40px', '40px 16px 40px', '56px 140px 56px']}
          gap="12px"
          flexDirection="column"
        >
          <Text fontSize="32px" fontWeight={600}>
            Your way to the future!
          </Text>
          <Text>Real people over whales!</Text>
          <Flex flexDirection="column" gap="16px" marginTop="32px">
            {getSteps(
              address,
              isLoading,
              isLoggedIn,
              walletsAreVerified,
              claimPLPDAvailable,
              stakingAvailable,
              claimTestGear,
              claimTestPLPD,
            ).map((step, index) => (
              <Flex
                key={index}
                backgroundColor="background.gray"
                borderRadius="8px"
                padding="24px 32px"
              >
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={
                    step.isCompleted ? 'accent.green' : 'background.dark'
                  }
                  borderRadius="100%"
                  color="primary.text"
                  width="56px"
                  height="56px"
                  marginRight="18px"
                  fontSize="16px"
                  fontWeight={600}
                >
                  {step.isCompleted ? (
                    <FiCheck color="#303030" />
                  ) : (
                    `0${index + 1}`
                  )}
                </Flex>
                <Flex flexDirection="column" marginRight="auto">
                  <Text fontSize="20px" fontWeight={600}>
                    {step.title}
                  </Text>
                  <Text>{step.text}</Text>
                </Flex>
                {step.isCompleted ? <CompletedTag /> : step.button}
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Flex>
  );
};

const BannerText = styled(Text)`
  font-size: 14px;
  color: var(--chakra-colors-primary-text);
  opacity: 0.64;
`;

const HeaderFlex = styled(Flex)`
  width: 100%;
  max-width: 500px;
`;
