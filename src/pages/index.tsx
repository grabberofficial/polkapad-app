import { Flex, Image, Text } from '@chakra-ui/react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';

// top 76
// left 115
// right 130

const IndexPage = () => {
  return (
    <>
      <Flex height={'100%'} bg="red" alignItems={'flex-start'}>
        <Flex
          basis={'46%'}
          bg="#E5E5E5"
          flexDirection={'column'}
          padding={'76px 130px 0 115px'}
        >
          <Heading marginBottom={75} withUnderline>
            Allocation
            <br />
            Staking
          </Heading>
          <Text maxWidth={383}>
            Stakers will receive their yield rewards only at the end of their
            Staking Period when they unstake/restake their tokens.
          </Text>
          <br />
          <Text maxWidth={383} marginBottom={23}>
            Unstaking before the predefined period was reached will Unstake
          </Text>
          <Image src="images/staking_bg.png" />
        </Flex>
        <Flex
          basis={'54%'}
          flexDirection={'column'}
          backgroundColor={'white'}
          padding={'82px 81px 145px 95px'}
        >
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
          <Text>Total Value Locked $79.34M XAVA Price $4.74</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default IndexPage;
