import { TabList as TabListChakra, Tab } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const TabList = styled(TabListChakra)({
  borderBottom: 'none',
});

export const HeaderItemStyled = styled(Tab)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #303030;
  height: 80px;

  &[aria-selected='true'] {
    color: #303030;
    border-bottom: 3px solid #49C7DA;
  }
`;
