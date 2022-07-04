import { Flex, Text } from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import { css, Global } from '@emotion/react';
import { Footer } from '@/components/footer';
import { FAQStaking } from '@/components/pages/Staking/components/FAQ/FAQStaking';
import { PLPDStaked } from '@/components/pages/Staking/components/PLPDStaked/PLPDStaked';
import { StakeWithdraw } from '@/components/pages/Staking/components/StakeWithdraw/StakeWithdraw';

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
      <Flex height="869px" alignItems={'flex-start'} className="main-block">
        <Flex
          basis={'46%'}
          bg="#E5E5E5"
          flexDirection={'column'}
          padding={['40px 16px 40px', '40px 16px 40px', '76px 130px 0 115px']}
          height="100%"
          backgroundImage={['none', 'none', 'url(/images/staking_bg.png)']}
          backgroundRepeat="no-repeat"
          backgroundPosition="bottom"
          backgroundSize="contain"
        >
          <Heading marginBottom={75} withUnderline>
            Staking
          </Heading>
          <Text maxWidth={383}>
            To participate in sales, you must have some locked assets
          </Text>
        </Flex>
        <StakeWithdraw />
      </Flex>
      <PLPDStaked />
      <FAQStaking />
      <Footer />
    </>
  );
};
