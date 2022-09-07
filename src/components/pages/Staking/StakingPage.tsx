import { Flex, Image, Text } from '@chakra-ui/react';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import { css, Global } from '@emotion/react';
import { Footer } from '@/components/footer';
import { FAQStaking } from '@/components/pages/Staking/components/FAQ/FAQStaking';
import { StakeWithdraw } from '@/components/pages/Staking/components/StakeWithdraw/StakeWithdraw';
import starIcon from '@/assets/star.svg';
import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';

export const StakingPage = () => {
  return (
    <>
      <Global
        styles={css`
          @media screen and (max-width: 1100px) {
            .main-block {
              flex-wrap: wrap;
              height: auto !important;
              align-items: center;
              justify-content: center;

              & > div {
                min-width: 100% !important;
              }
            }
          }
        `}
      />
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
          backgroundImage="images/staking_banner.svg"
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
            Staking
          </Heading>

          <HeaderFlex flexDirection="column">
            <BannerText>
              To take a part in the first sales you must have locked assets
            </BannerText>
          </HeaderFlex>

          <Button width="130px" backgroundColor="accent.green" marginTop="32px">
            Locked assets
          </Button>
        </Flex>
      </Flex>
      <StakeWithdraw />
      <FAQStaking />
      <Footer />
    </>
  );
};

const HeaderFlex = styled(Flex)`
  width: 100%;
  max-width: 500px;
`;

const BannerText = styled(Text)`
  font-size: 14px;
  color: var(--chakra-colors-primary-text);
  opacity: 0.64;
`;
