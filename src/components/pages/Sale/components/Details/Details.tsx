import { Flex, Image, Tab, Tabs, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { TabList } from '@/components/common/Header/components/HeaderItems/HeaderItems.style';

export const Details = () => {
  return (
    <div>
      <SectionTitle>Details</SectionTitle>
      <Flex marginTop="32px">
        <Tabs
          variant="unstyled"
          backgroundColor="#fff"
          borderRadius="12px"
          width="100%"
        >
          <TabList margin="10px" gap="4px">
            <Tab
              borderRadius="4px"
              _selected={{ color: 'white', bg: 'primary.basic' }}
              fontSize={['10px', '12px', '14px']}
            >
              Overview
            </Tab>
            <Tab
              borderRadius="4px"
              _selected={{ color: 'white', bg: 'primary.basic' }}
              fontSize={['10px', '12px', '14px']}
            >
              Team & Partners
            </Tab>
            <Tab
              isDisabled
              _disabled={{ color: 'gray' }}
              fontSize={['10px', '12px', '14px']}
            >
              Metrics
            </Tab>
            <Tab
              isDisabled
              _disabled={{ color: 'gray' }}
              fontSize={['10px', '12px', '14px']}
            >
              Allocations
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Flex
        flexDirection="column"
        backgroundColor="#fff"
        borderRadius="12px"
        padding="32px 24px"
        marginTop="4px"
      >
        <Description>
          REWARD is an algorithm that will never let you forget how rich you
          are! After all, wasn&apos;t that the whole point of hard work, lack of
          sleep, constant stress and lack of personal life? Now you&apos;ve made
          it! You finally have money! And not just money – crypto money! They
          are sitting right in your wallet waiting for the next bull cycle!
          Which will surely come!
        </Description>
        <br />
        <TextHeading>How it works?</TextHeading>
        <br />
        <Description>
          All you need to do is connect your reward wallet to our dapp and from
          now on we will remind you every hour how rich you are!
          <br />
          <br />
          If you have tokens in your wallet equivalent to:
          <br />
          <br /> $1,000+ you will receive a small push notification with a
          cheerful dollar emoji!
          <br />
          <br /> $10,000+ every morning the application will play for you a song
          by ABBA – Money, Money, Money!
          <br />
          <br /> $100,000+ Louis Theroux song My money don&apos;t jiggle-jiggle
          is added to the ABBA’s morning song, which is played randomly
          throughout the day!
          <br />
          <br /> $500,000+ you will receive a handwritten greeting card in your
          mail once a month!! You don’t need to fill in any forms! We already
          know where you live – this is blockchain and decentralization!!
          <br />
          <br /> $1,000,000+ at this stage, we start charging you for using the
          dApp!! Because if you are able to pay for such nonsense, then you are
          really rich!!!
          <br />
          <br /> $10,000,000+ one day, when you least expect it, we will come to
          your office and personally explain to you how rich, magnificent and
          necessary for the world of innovation you are! You&apos;ll love it, we
          promise!! The service is paid, but it will seem to you that you
          yourself decided so!
          <br />
          <br /> $100,000,000+ ahahahahahaha!!!
        </Description>
        <Image
          src="/images/polka3.png"
          maxHeight="428px"
          width="100%"
          objectFit="cover"
          borderRadius="8px"
          marginTop="24px"
        />
        <br />
        <TextHeading>Where are we now?</TextHeading>
        <br />
        <Description>
          REWARD is in the final stages of open beta testing. Immediately after
          fixing the latest bugs and adding new cool features, we will become
          completely public. The reward will be launched on the GEAR network
          with further expansion to other networks of the Polkadot ecosystem.
          You can find a detailed description of the product in our whitepaper
          on the website.
          <br />
          <br />
          If you have any questions – contact our support team!
        </Description>
      </Flex>
    </div>
  );
};

const SectionTitle = styled(Text)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 12px;
`;

const Description = styled(Text)`
  opacity: 0.64;
  font-size: 16px;
  line-height: 24px;
  color: var(--chakra-colors-primary-basic);
`;

const TextHeading = styled(Text)`
  font-weight: 600;
`;
