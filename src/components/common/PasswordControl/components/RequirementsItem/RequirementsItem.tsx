import { Flex, Text } from '@chakra-ui/react';

export const RequirementsItem = (props: { color: string; text: string }) => (
  <Flex alignItems="center" marginRight="12px">
    <Flex
      width="6px"
      height="6px"
      borderRadius="100%"
      backgroundColor={props.color}
      marginRight="4px"
    />
    <Text color={props.color} fontSize="14px">
      {props.text}
    </Text>
  </Flex>
);
