import {
  Box,
  Flex,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from '@chakra-ui/react';
import { BsTwitter } from 'react-icons/bs';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';

import web from '../../../assets/web.svg';
import some_other_social from '../../../assets/some_other_social.svg';
import github from '../../../assets/github.svg';
import { Button } from '../Button';

// size
// color scheme

const socials = [
  <Image src={web} color="#49C7DA" key="web" />,
  <Image as={BsTwitter} color="#49C7DA" key="twitter" />,
  <Image as={FaTelegramPlane} color="#49C7DA" key="twitter" />,
  <Image src={some_other_social} color="#49C7DA" key="wtf" />,
  <Image as={FaDiscord} color="#49C7DA" key="discord" />,
  <Image src={github} color="#49C7DA" key="github" />,
];

export const Card: React.FC<{ dark?: boolean }> = ({ children, ...props }) => {
  const { dark } = props;
  return (
    <Box
      bg={dark ? '#303030' : '#F6F5F5'}
      width="400px"
      color={dark ? 'white' : undefined}
    >
      <Flex
        width="400px"
        height="161px"
        background={`linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/images/f64181f6ce31cc452d8eb8b7b502e2cb.png)`}
        flexDirection="column"
        alignItems="flex-start"
      >
        <Tag
          background="rgba(48, 48, 48, 0.3)"
          borderRadius="4px"
          width="81px"
          height="19px"
          color="#E9E9E9"
          fontWeight="700"
          fontSize="10px"
          lineHeight="124%"
          marginTop="16px"
          marginLeft="34px"
        >
          PUBLIC SHO
        </Tag>
        <Text
          font-style="normal"
          font-weight="400"
          font-size="28px"
          line-height="124%"
          color="white"
          marginTop="35px"
          marginLeft="48px"
        >
          Backdoor
        </Text>
        <Box
          bg="#E46542"
          padding="6px 10px 7px"
          borderRadius="3px"
          fontWeight="600"
          fontSize="12px"
          lineHeight="124%"
          margin="auto 25px 0 auto"
        >
          Coming Soon
        </Box>
      </Flex>
      <HStack spacing="18px" padding="19px 25px 0">
        {socials.map((icon, index) => (
          <Tag
            key={index}
            bg={dark ? '#3E3E3E' : 'white'}
            width="30px"
            height="30px"
            cursor="pointer"
          >
            {icon}
          </Tag>
        ))}
      </HStack>
      <Tabs padding="25px">
        <TabList>
          <Tab
            color="#A5A5A5"
            _selected={{ color: '#303030', borderBottom: '3px solid #49c7da' }}
          >
            Offering
          </Tab>
          <Tab
            color="#A5A5A5"
            _selected={{ color: '#303030', borderBottom: '3px solid #49c7da' }}
          >
            Screening
          </Tab>
          <Tab
            color="#A5A5A5"
            _selected={{ color: '#303030', borderBottom: '3px solid #49c7da' }}
          >
            Description
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button variant="primary">See Details</Button>
    </Box>
  );
};
