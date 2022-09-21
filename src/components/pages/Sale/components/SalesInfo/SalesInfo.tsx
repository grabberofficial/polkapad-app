import { Flex, Tab, Tabs, Text } from '@chakra-ui/react';
import { TabList } from '@/components/common/Header/components/HeaderItems/HeaderItems.style';
import styled from '@emotion/styled';

export const SalesInfo = () => {
  return (
    <div>
      <Flex>
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
              Sale Info
            </Tab>
            <Tab
              borderRadius="4px"
              _selected={{ color: 'white', bg: 'primary.basic' }}
              fontSize={['10px', '12px', '14px']}
            >
              Token Info
            </Tab>
            <Tab
              isDisabled
              _disabled={{ color: 'gray' }}
              fontSize={['10px', '12px', '14px']}
            >
              Key Metrics
            </Tab>
            <Tab
              isDisabled
              _disabled={{ color: 'gray' }}
              fontSize={['10px', '12px', '14px']}
            >
              Unlocks
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Flex
        padding="36px 24px"
        backgroundColor="#fff"
        borderRadius="12px"
        marginTop="4px"
        flexDirection="column"
      >
        <Flex flexWrap="wrap" gap="40px">
          <Item>
            <ItemHeader>TGE type</ItemHeader>
            <ItemData>Monochain</ItemData>
          </Item>
          <Item>
            <ItemHeader>Vesting</ItemHeader>
            <ItemData>TBA</ItemData>
          </Item>
          <Item>
            <ItemHeader>Token price</ItemHeader>
            <ItemData>TBA</ItemData>
          </Item>
          <Item>
            <ItemHeader>Start date</ItemHeader>
            <ItemData>01.11.2022</ItemData>
          </Item>
          <Item>
            <ItemHeader>Parachain</ItemHeader>
            <ItemData>Gear</ItemData>
          </Item>
          <Item>
            <ItemHeader>Total Raise</ItemHeader>
            <ItemData>TBA</ItemData>
          </Item>
        </Flex>
        <Separator />
        <div>
          <Flex justifyContent="space-between" alignItems="center">
            <ItemHeader>Sale Contract Address (EVM chain)</ItemHeader>
            <ItemData>TBA</ItemData>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginTop="16px"
          >
            <ItemHeader>Sale Contract Address (Kusama)</ItemHeader>
            <ItemData>TBA</ItemData>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

const Item = styled(Flex)`
  width: 148px;
  flex-shrink: 0;
  flex-direction: column;
`;

const ItemData = styled(Text)`
  color: var(--chakra-colors-primary-basic);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const ItemHeader = styled(Text)`
  opacity: 0.56;
  font-size: 14px;
  line-height: 16px;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border: 1px solid var(--chakra-colors-background-gray);
  margin: 24px 0;
  opacity: 0.5;
`;
