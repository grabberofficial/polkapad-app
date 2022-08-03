import { Flex, Text } from '@chakra-ui/react';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import { TotalStaked } from '@/components/pages/Staking/components/TotalStaked/TotalStaked';

export const PLPDStaked = () => {
  return (
    <Flex
      backgroundImage="images/staking/bg.svg"
      height={['auto', 'auto', 'auto', '640px']}
      backgroundColor="#025B63"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      flexDirection="column"
      padding={['40px 16px', '40px 16px', '113px 64px 0 113px']}
    >
      <Flex flexWrap="wrap" marginBottom="32px">
        <Flex flexBasis={['100%', 'calc(100% - 377px)']}>
          <Heading
            marginBottom={77}
            withUnderline
            color="white"
            fontSize={['30px', '50px']}
          >
            PLPD Tokens Staked
            <br />
            Over Time
          </Heading>
        </Flex>
        <Flex flexDirection="column" gap="29px" flexBasis="377px">
          {/* TODO: extract to component */}
          <Flex gap="20px" alignItems="center">
            <Flex
              width="48px"
              height="48px"
              backgroundColor="#F6F5F5"
              borderRadius="3px"
            />
            <Flex flexDirection="column">
              <Text
                color="#FFFFFF"
                textTransform="uppercase"
                lineHeight="34px"
                fontSize="23px"
                fontWeight="700"
              >
                TBA
              </Text>
              <Text
                color="#FFFFFF"
                lineHeight="21px"
                fontSize="14px"
                fontWeight="400"
              >
                PLPD Price
              </Text>
            </Flex>
          </Flex>
          <Flex gap="20px" alignItems="center">
            <Flex
              width="48px"
              height="48px"
              backgroundColor="#F6F5F5"
              borderRadius="3px"
            />
            <Flex flexDirection="column">
              <Text
                color="#FFFFFF"
                textTransform="uppercase"
                lineHeight="34px"
                fontSize="23px"
                fontWeight="700"
              >
                TBA
              </Text>
              <Text
                color="#FFFFFF"
                lineHeight="21px"
                fontSize="14px"
                fontWeight="400"
              >
                Total Value Locked
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <TotalStaked />
    </Flex>
  );
};
