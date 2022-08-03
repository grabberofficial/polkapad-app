import { Flex, Text } from '@chakra-ui/react';
import { InfoIcon } from '@/components/icons/Info';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';

export const YourStats = () => (
  <Flex flexDirection="column">
    <Flex marginBottom="20px">
      <Text
        textTransform="uppercase"
        color="#303030"
        lineHeight="21px"
        fontSize="14px"
        fontWeight="700"
      >
        your{' '}
        <Text color="primary.basic" as="span">
          Stats
        </Text>
      </Text>
    </Flex>
    <Flex
      justifyContent="space-between"
      alignItems="baseline"
      gap="7px"
      marginBottom="24px"
    >
      <Text as="span" whiteSpace="nowrap">
        Current APY
      </Text>
      <InfoIcon />
      <Spacer />
      <Text
        as="span"
        fontWeight="700"
        fontSize="18px"
        lineHeight="27px"
        textAlign="right"
        textTransform="uppercase"
        color="secondary.text"
        whiteSpace="nowrap"
      >
        TBA
      </Text>
    </Flex>

    <Flex
      justifyContent="space-between"
      alignItems="baseline"
      gap="7px"
      marginBottom="24px"
    >
      <Text as="span" whiteSpace="nowrap">
        My Staked PLPD
      </Text>
      <InfoIcon />
      <Spacer />
      <Text
        as="span"
        fontWeight="700"
        fontSize="18px"
        lineHeight="27px"
        textAlign="right"
        textTransform="uppercase"
        color="secondary.text"
        whiteSpace="nowrap"
        position="relative"
      >
        TBA
      </Text>
    </Flex>

    <Flex
      justifyContent="space-between"
      alignItems="baseline"
      gap="7px"
      marginBottom="24px"
    >
      <Text as="span" whiteSpace="nowrap">
        My Earned PLPD
      </Text>
      <InfoIcon />
      <Spacer />
      <Text
        as="span"
        fontWeight="700"
        fontSize="18px"
        lineHeight="27px"
        textAlign="right"
        textTransform="uppercase"
        color="secondary.text"
        whiteSpace="nowrap"
        position="relative"
      >
        TBA
      </Text>
    </Flex>

    <Flex
      gap="11px"
      marginTop="26px"
      flexDirection={['column', 'column', 'row']}
    >
      <Button
        disabled
        withArrow
        variant="secondary"
        iconPlacement="right"
        icon={<InfoIcon />}
      >
        COMPOUND PLPD
      </Button>
      <Button
        disabled
        withArrow
        variant="secondary"
        iconPlacement="right"
        icon={<InfoIcon />}
      >
        HARVEST PLPD
      </Button>
    </Flex>
  </Flex>
);

export const Spacer = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px dashed #e0e0e0;
`;
