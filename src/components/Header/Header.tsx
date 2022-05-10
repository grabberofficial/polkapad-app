import React, { useEffect, useState } from 'react';

import { Flex, Tabs } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { TabList } from './components/HeaderItems/HeaderItems.style';
import { useRouter } from 'next/router';
import { RightContainer } from './Header.style';
import Link from 'next/link';

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
      padding={'0 78px 0 70px'}
      bg="#F7F5F5"
      position="sticky"
      top={0}
      zIndex="2"
    >
      <Link href="/">
        <Image
          src="/images/logo_header.png"
          alt="Polkapad"
          padding={'24px 0'}
          cursor="pointer"
        />
      </Link>
      <Tabs height={'100%'} index={selectedTab} position="absolute" left="32%">
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
