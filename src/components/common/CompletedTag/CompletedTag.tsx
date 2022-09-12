import { Flex, Image, Text } from '@chakra-ui/react';
import checkIcon from '@/assets/check_all.svg';

export const CompletedTag = () => (
  <Flex alignItems="center">
    <Text fontSize="14px">Complete</Text>
    <Image
      src={checkIcon}
      alt="BSC"
      width="18px"
      height="18px"
      marginLeft="8px"
    />
  </Flex>
);
