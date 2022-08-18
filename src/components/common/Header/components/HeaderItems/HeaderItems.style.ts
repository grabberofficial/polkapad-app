import {
  TabList as TabListChakra,
  Tab,
  ComponentWithAs,
  TabProps,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const TabList = styled(TabListChakra)({
  borderBottom: 'none',
});

export const HeaderItemStyled = styled<
  { isSelected?: boolean } & ComponentWithAs<'button', TabProps>
>(Tab)`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #303030;
  height: 80px;
  border-bottom: none;
  opacity: 0.64;

  div {
    transition: color 0.2s, transform 0.2s;
  }

  &[aria-selected='true'] {
    color: var(--chakra-colors-secondary-text);
    opacity: 1;
  }

  &:focus {
    box-shadow: none;
  }

  &:hover {
    div {
      color: var(--chakra-colors-primary-hover);
      transform: scale(1.03);
    }
  }

  &:active {
    background-color: transparent;
  }
`;
