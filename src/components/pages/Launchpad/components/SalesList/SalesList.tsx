import { Flex, Image, Text } from '@chakra-ui/react';
import futureIcon from '@/assets/future_icon.svg';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { SALE_ROUTE } from '@/constants/routes';

export const SalesList = () => {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      padding={['40px 16px 40px', '40px 16px 40px', '56px 140px 56px']}
      backgroundColor="background.light"
    >
      <Text fontSize="32px" fontWeight={600}>
        Upcoming sales
      </Text>

      <Flex marginTop="56px" backgroundColor="#fff" borderRadius="8px">
        <Image src="/images/polka2.png" width="calc((100%-40px) / 2)" />
        <Flex padding="26px 40px" flexDirection="column">
          <Flex>
            <Image
              src={futureIcon}
              height="56px"
              width="56px"
              marginRight="16px"
            />
            <Flex flexDirection="column">
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
            </Flex>
          </Flex>
          <Flex marginTop="32px">
            <Text opacity={0.64} fontSize="14px">
              Gathered wherein. Open them was our own, said you&apos;ll in
              yielding bearing fowl. Days grass. May third very. Unto lesser
              she&apos;d, created years every...
            </Text>
          </Flex>
          <Flex marginTop="32px" gap="56px">
            <Flex flexDirection="column">
              <TableHeader>Lead investor</TableHeader>
              <TableData>Best investor</TableData>
            </Flex>
            <Flex flexDirection="column">
              <TableHeader>Token price</TableHeader>
              <TableData>283</TableData>
            </Flex>
            <Flex flexDirection="column">
              <TableHeader>Total raise</TableHeader>
              <TableData>$350 000</TableData>
            </Flex>
          </Flex>
          <Separator />
          <Flex justifyContent="space-between" alignItems="center">
            <Flex flexDirection="column">
              <TableHeader>Start date</TableHeader>
              <TableData>10.2022</TableData>
            </Flex>
            <Link href={SALE_ROUTE}>
              <Button variant="primary" width="157px">
                View details
              </Button>
            </Link>
          </Flex>
        </Flex>
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
  font-size: 14px;
  color: var(--chakra-colors-primary-basic);
  margin-bottom: 8px;
`;

const Separator = styled('div')`
  width: 100%;
  border: 1px solid var(--chakra-colors-background-gray);
  margin: 32px 0;
  opacity: 0.5;
`;
