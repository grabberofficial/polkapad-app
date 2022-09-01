import { Flex, Text } from '@chakra-ui/react';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import { usePolkadotExtension } from '@/hooks/usePolkadotExtension';
import { gearService } from '@/hooks/gearService';
import { PolkadotWalletButton } from '@/components/PolkadotWalletButton/PolkaWalletButton';
import { useCallback, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

const getSteps = (
  address: string,
  isLoading: boolean,
  claimTestGear: () => void,
  claimTestPLPD: () => void,
) => [
  {
    title: 'Registration',
    text: 'Complete Registration in the Polkapad ecosystem',
    button: null,
  },
  {
    title: 'Claim $GEAR',
    text: 'Claim your $GEAR native coins',
    button: address ? (
      <Button
        variant="primary"
        width="97px"
        onClick={claimTestGear}
        isLoading={isLoading}
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
    button: address ? (
      <Button
        variant="primary"
        width="97px"
        onClick={claimTestPLPD}
        isLoading={isLoading}
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
      <Button variant="primary" width="97px">
        Stake
      </Button>
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
  const [isLoading, setIsLoading] = useState(false);
  const { address, updateBalance } = usePolkadotExtension();

  const claimTestGear = useCallback(async () => {
    setIsLoading(true);
    await gearService.transferBalance(address);
    await updateBalance(address);
    setIsLoading(false);
  }, [address, updateBalance]);

  const claimTestPLPD = useCallback(async () => {
    setIsLoading(true);
    await gearService.claimPLPD(address);
    await updateBalance(address);
    setIsLoading(false);
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

          <Button width="130px" backgroundColor="accent.green" marginTop="32px">
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
            {getSteps(address, isLoading, claimTestGear, claimTestPLPD).map(
              (step, index) => (
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
                      index === 0 ? 'accent.green' : 'background.dark'
                    }
                    borderRadius="100%"
                    color="primary.text"
                    width="56px"
                    height="56px"
                    marginRight="18px"
                    fontSize="16px"
                    fontWeight={600}
                  >
                    {index === 0 ? (
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
                  {step.button}
                </Flex>
              ),
            )}
          </Flex>
        </Flex>
      </Flex>
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
