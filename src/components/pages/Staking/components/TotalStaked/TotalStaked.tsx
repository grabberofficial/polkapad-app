import { Flex, Text } from '@chakra-ui/react';
import { InfoIcon } from '@/components/icons/Info';
import styled from '@emotion/styled';

export const TotalStaked = () => {
  return (
    <TotalStakedWrapper>
      <Flex
        flexDirection="column"
        gap="11px"
        padding="52px 30px 59px"
        backgroundColor="#F6F5F5"
        borderRadius="4px"
        flexBasis="33%"
      >
        <Text
          display="flex"
          alignItems="center"
          gap="7px"
          as="span"
          fontWeight="700"
          fontSize="14px"
          lineHeight="21px"
          textTransform="uppercase"
          color="secondary.text"
        >
          Total PLPD Staked <InfoIcon />
        </Text>
        <Text
          as="span"
          fontWeight="700"
          fontSize="38px"
          lineHeight="57px"
          textTransform="uppercase"
          color="secondary.text"
        >
          TBA
        </Text>
        <Text
          as="span"
          fontSize="14px"
          fontWeight="600"
          lineHeight="21px"
          textTransform="uppercase"
          color="secondary.text"
        >
          ~
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        gap="11px"
        padding="52px 30px 59px"
        backgroundColor="#F6F5F5"
        borderRadius="4px"
        flexBasis="33%"
      >
        <Text
          display="flex"
          alignItems="center"
          gap="7px"
          as="span"
          fontWeight="700"
          fontSize="14px"
          lineHeight="21px"
          textTransform="uppercase"
          color="secondary.text"
        >
          Total Rewards Redistributed <InfoIcon />
        </Text>
        <Text
          as="span"
          fontWeight="700"
          fontSize="38px"
          lineHeight="57px"
          textTransform="uppercase"
          color="secondary.text"
        >
          TBA
        </Text>
        <Text
          as="span"
          fontSize="14px"
          fontWeight="600"
          lineHeight="21px"
          textTransform="uppercase"
          color="secondary.text"
        >
          ~
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        gap="11px"
        padding="52px 30px 59px"
        backgroundColor="#F6F5F5"
        borderRadius="4px"
        flexBasis="33%"
      >
        <Text
          display="flex"
          alignItems="center"
          gap="7px"
          as="span"
          fontWeight="700"
          fontSize="14px"
          lineHeight="21px"
          textTransform="uppercase"
          color="secondary.text"
        >
          Reward Unlock Rate <InfoIcon />
        </Text>
        <Text
          as="span"
          fontWeight="700"
          fontSize="38px"
          lineHeight="57px"
          textTransform="uppercase"
          color="secondary.text"
        >
          TBA
        </Text>
        <Text
          as="span"
          fontSize="14px"
          fontWeight="600"
          lineHeight="21px"
          textTransform="uppercase"
          color="secondary.text"
        >
          ~
        </Text>
      </Flex>
    </TotalStakedWrapper>
  );
};

const TotalStakedWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 39px;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;
