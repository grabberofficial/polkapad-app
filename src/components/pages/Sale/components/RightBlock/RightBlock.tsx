import { Flex, Image, Text } from '@chakra-ui/react';
import futureIcon from '@/assets/future_icon.svg';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';

export const RightBlock = () => {
  return (
    <Flex
      backgroundColor="#fff"
      padding="32px"
      marginLeft="40px"
      borderRadius="8px"
      flexDirection="column"
      width="360px"
      height="fit-content"
      position="sticky"
      right={0}
      top="100px"
    >
      <Flex>
        <Image src={futureIcon} height="56px" width="56px" marginRight="16px" />
        <div>
          <Text
            fontSize="24px"
            lineHeight="32px"
            fontWeight={600}
            marginBottom="4px"
          >
            Test sale
          </Text>
          <Text fontSize="12px" opacity={0.56}>
            1 PLPD = TBA
          </Text>
        </div>
      </Flex>
      <Flex marginTop="32px">
        <Text opacity={0.64} fontSize="14px">
          Gathered wherein. Open them was our own, said you&apos;ll in yielding
          bearing fowl. Days grass. May third very. Unto lesser she&apos;d,
          created years every...
        </Text>
      </Flex>
      <Flex marginTop="32px" gap="12px" flexDirection="column">
        <div>
          <TableHeader>Major Contributor</TableHeader>
          <TableData>Polkapad</TableData>
        </div>
        <div>
          <TableHeader>Token price</TableHeader>
          <TableData>0.1 PLPD</TableData>
        </div>
        <div>
          <TableHeader>Total raise</TableHeader>
          <TableData>1,000 PLPD</TableData>
        </div>
      </Flex>
      <Separator />
      <Flex justifyContent="space-between">
        <div>
          <TableHeader>Start date</TableHeader>
          <TableData>01.11.2022</TableData>
        </div>
        <Button variant="primary" width="157px">
          Join waitlist
        </Button>
      </Flex>
    </Flex>
  );
};

const TableData = styled(Text)`
  color: var(--chakra-colors-primary-basic);
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
`;

const TableHeader = styled(Text)`
  opacity: 0.56;
  font-size: 12px;
  line-height: 16px;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border: 1px solid var(--chakra-colors-background-gray);
  margin: 32px 0;
  opacity: 0.5;
`;
