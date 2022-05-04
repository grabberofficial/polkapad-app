import { Card } from '@/components/Card/Card';
import { HStack } from '@chakra-ui/react';

const Launchpad = () => {
  return (
    <HStack spacing="24px">
      <Card />
      <Card dark />
    </HStack>
  );
};

export default Launchpad;
