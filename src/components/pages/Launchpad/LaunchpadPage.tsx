import React, { useContext, useMemo } from 'react';
import { prop } from 'styled-tools';
import styled from '@emotion/styled';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import { Flex, Text, Image } from '@chakra-ui/react';
import { Footer, FooterWrapper } from '@/components/footer';
import useUser from '@/hooks/useUser';
import starIcon from '@/assets/star.svg';
import { WalletsContext } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { KYCContext } from '@/components/pages/Profile/components/KYCProvider/KYCProvider';
import { CompletedTag } from '@/components/pages/Launchpad/components/CompletedTag';
import { getSteps } from './LaunchpadPage.utils';

export const LaunchpadPage = () => {
  const { user } = useUser();
  const { walletsAreVerified } = useContext(WalletsContext);
  const { isKYCAccepted } = useContext(KYCContext);
  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

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
          padding={['76px 16px 119px', '76px 16px 119px', '76px 115px 119px']}
          backgroundImage="images/launchpad_banner.svg"
          backgroundSize="35%"
          backgroundPosition={['100%', '100%', '70% 100%']}
          backgroundRepeat="no-repeat"
          flexDirection="column"
          maxWidth="1440px"
          height="100%"
          width="100%"
        >
          <Flex alignItems="center" marginBottom="16px">
            <Image
              src={starIcon}
              width="18px"
              height="18px"
              marginRight="8px"
            />
            <Text color="primary.text" fontWeight={600}>
              Discover new, high-quality projects
            </Text>
          </Flex>
          <Heading marginBottom="16px" color="#fff" withUnderline>
            Launchpad
          </Heading>

          <HeaderFlex flexDirection="column">
            <BannerText>
              Stakers will receive their yield rewards only at the end of their
              Staking Period when they unstake/restake their tokens.
            </BannerText>
          </HeaderFlex>
          <HeaderFlex gap="56px" marginTop="64px">
            <BannerFlex>
              <BannerNumber>1,532,941</BannerNumber>
              <BannerText>Followers</BannerText>
            </BannerFlex>
            <BannerFlex>
              <BannerNumber>$ 122,424,470,150</BannerNumber>
              <BannerText>Amount</BannerText>
            </BannerFlex>
            <BannerFlex>
              <BannerNumber>314</BannerNumber>
              <BannerText>Projects</BannerText>
            </BannerFlex>
          </HeaderFlex>
        </Flex>
      </Flex>
      <Flex flexDirection="column" width="100%">
        <Flex
          position="relative"
          padding={['40px 16px 40px', '40px 16px 40px', '56px 140px 56px']}
          background="background.gray"
          gap="12px"
          flexDirection={['column', 'column', 'row']}
        >
          {getSteps(isLoggedIn, walletsAreVerified, isKYCAccepted).map(
            ({ title, text, isCurrent, isComplete, button }, index) => (
              <Card
                key={`card-${index}`}
                backgroundColor={isCurrent ? 'accent.green' : undefined}
              >
                <Flex
                  backgroundColor="background.dark"
                  borderRadius="100%"
                  color="primary.text"
                  width="40px"
                  height="40px"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight={600}
                  marginBottom="18px"
                >
                  0{index + 1}
                </Flex>
                <Header marginBottom="8px">{title}</Header>
                <RegularText marginBottom="40px">{text}</RegularText>
                {isComplete ? <CompletedTag /> : button}
              </Card>
            ),
          )}
        </Flex>
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Flex>
  );
};

const BannerFlex = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`;

const BannerNumber = styled(Text)`
  color: var(--chakra-colors-primary-text);
  font-size: 24px;
  line-height: 36px;
  font-weight: 600;
`;

const BannerText = styled(Text)`
  font-size: 14px;
  color: var(--chakra-colors-primary-text);
  opacity: 0.64;
`;

const RegularText = styled(Text)`
  font-size: ${prop('fontSize', '14px')};
  color: ${prop('color', '#303030')};
  opacity: 0.64;
`;

const Header = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${prop('color', '#303030')};
`;

const Card = styled(Flex)`
  padding: 24px 32px;
  position: relative;
  width: 100%;
  flex-direction: column;
  border-radius: 8px;

  @media screen and (min-width: 48em) {
    width: 280px;
  }
`;

const HeaderFlex = styled(Flex)`
  width: 100%;
  max-width: 500px;
`;
