import { Flex, Image, Text } from '@chakra-ui/react';
import plpdLogo from '@/assets/plpd_logo.svg';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import { SalesInfo } from '@/components/pages/Sale/components/SalesInfo/SalesInfo';
import { RightBlock } from '@/components/pages/Sale/components/RightBlock/RightBlock';
import { Details } from './components/Details/Details';
import { Footer, FooterWrapper } from '@/components/footer';

export const SalePage = () => {
  return (
    <>
      <Flex
        backgroundSize="cover"
        backgroundImage="images/sale_banner.png"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        alignItems="center"
        justifyContent="center"
        height="480px"
      >
        <Flex
          padding={['76px 16px 119px', '76px 16px 119px', '76px 115px 119px']}
          backgroundSize="35%"
          backgroundPosition={['100%', '100%', '70% 100%']}
          backgroundRepeat="no-repeat"
          flexDirection="column"
          maxWidth="1440px"
          height="100%"
          width="100%"
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            marginBottom="16px"
            borderRadius="8px"
            backgroundColor="#fff"
            width="96px"
            height="96px"
            flexShrink={0}
          >
            <Image src={plpdLogo} width="56px" height="64px" />
          </Flex>
          <Heading marginBottom="16px" color="#fff">
            REWARD ($RWRD) Sale
          </Heading>

          <HeaderFlex flexDirection="column">
            <BannerText>
              Dear friends! We are starting to test the performance of the
              Polkapad launchpad, and therefore we need to conduct a test sale!
              The project below is completely fictional and was made up for fun!
              It does not exist! But the rewards are real!
            </BannerText>
          </HeaderFlex>

          <Button
            width="130px"
            backgroundColor="accent.green"
            marginTop="32px"
            flexShrink={0}
            _hover={{ backgroundColor: 'background.gray' }}
          >
            Join whitelist!
          </Button>
        </Flex>
      </Flex>
      <Flex
        padding="71px 140px"
        backgroundColor="background.light"
        width="100%"
        flexDirection="column"
      >
        <Flex position="relative">
          <Flex width="calc(100% - 400px)" flexDirection="column" gap="56px">
            <Image
              src="/images/polka3.png"
              maxHeight="428px"
              width="100%"
              objectFit="cover"
              borderRadius="8px"
            />
            <div>
              <SectionTitle marginBottom="12px">Description</SectionTitle>
              <Description>
                Our first – albeit a test sale will take place in the Gear
                parachain, using its tokens. The REWARD project is fictional, it
                does not exist, but this should not stop you, because during the
                sale we will give away $5,000 in prize money among the
                participants of the event! So no matter how the sale ends,
                everyone will get rewards!
              </Description>
            </div>
            <SalesInfo />
            <Details />
          </Flex>
          <RightBlock />
        </Flex>
        <Flex
          backgroundColor="accent.green"
          padding="24px"
          marginTop="56px"
          justifyContent="space-between"
          alignItems="flex-end"
          borderRadius="8px"
          marginBottom="25px"
        >
          <div>
            <SectionTitle>Join the waiting list!</SectionTitle>
            don&apos;t miss the moment of sale
          </div>
          <Button variant="primary" width="153px">
            Join waitlist
          </Button>
        </Flex>
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
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
`;

const SectionTitle = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: var(--chakra-colors-primary-basic);
`;

const Description = styled(Text)`
  opacity: 0.64;
  font-size: 16px;
  line-height: 24px;
  color: var(--chakra-colors-primary-basic);
`;
