import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/common/Button';
import { usePolkadotExtension } from '@/hooks/usePolkadotExtension';

export const StakePLPD = () => {
  const { plpdBalance } = usePolkadotExtension();
  return (
    <Grid
      height={['100%', '100%', '87px']}
      templateRows={['21px 48px 48px 48px', '21px 48px 48px 48px', '21px 48px']}
      templateColumns={['1fr 1fr', '1fr 1fr', '160px 1fr 200px']}
      gap="15px"
      marginBottom="50px"
    >
      <GridItem rowSpan={1} colSpan={1}>
        <Text
          textTransform="uppercase"
          color="secondary.text"
          lineHeight="21px"
          fontSize="14px"
          fontWeight="700"
        >
          <Text color="primary.basic" as="span">
            Stake
          </Text>{' '}
          PLPD
        </Text>
      </GridItem>
      <GridItem rowSpan={1} colSpan={[1, 1, 2]}>
        <Flex justifyContent="flex-end">
          <Text
            textTransform="uppercase"
            color="#303030"
            lineHeight="21px"
            fontSize="14px"
            fontWeight="700"
          >
            Max
          </Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
        <Flex flexDirection="column">
          <Text
            as="span"
            color="#303030"
            lineHeight="21px"
            fontSize="14px"
            fontWeight="400"
          >
            Balance:
          </Text>
          <Text as="span" fontWeight="700" display="flex" alignItems="center">
            {plpdBalance}
          </Text>
        </Flex>
      </GridItem>
      <GridItem
        rowSpan={1}
        colSpan={[2, 2, 1]}
        display="flex"
        alignItems="center"
        width="100%"
      >
        <Input text="PLPD" />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[2, 2, 1]}>
        <Flex justifyContent="flex-end" alignItems="center" height="100%">
          <Button withArrow variant="primary" iconPlacement="right">
            Deposit PLPD
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};
