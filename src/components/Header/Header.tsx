import React, { useEffect, useState } from 'react';

import { Flex, Tabs } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { useRouter } from 'next/router';
import { RightContainer } from './Header.style';

export const Header: React.FC<{ right?: React.FC[] }> = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();

  const childrenUrls = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) return child?.props?.url;
  });

  useEffect(() => {
    const selectedIndex = (childrenUrls ?? []).findIndex(
      (url) => url === router.pathname,
    );
    setSelectedTab(selectedIndex);
  }, [router, childrenUrls]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={'0 78px 0 70px'}
      bg="#F7F5F5"
      position="sticky"
      top={0}
      zIndex="2"
    >
      <Image src="/images/logo_header.png" alt="Polkapad" padding={'24px 0'} />
      <Tabs height={'100%'} index={selectedTab}>
        <TabList>{props.children}</TabList>
      </Tabs>
      <RightContainer>
        {props?.right?.map((Elem, i) => (
          <Elem key={i} />
        ))}
      </RightContainer>
    </Flex>
  );
};
