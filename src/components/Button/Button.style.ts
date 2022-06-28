import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Arrow = styled.div<{ primary?: boolean }>`
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid
    ${({ primary }) =>
      primary ? 'white' : 'var(--chakra-colors-primary-textHover)'};
  border-radius: 1px;
  transition: 0.3s ease-in-out;
`;

export const ButtonStyled = styled(Button)`
  position: relative;
  &:after {
    content: '""';
    position: absolute;
  }
`;

export const ButtonDivider = styled.div<{ color?: string }>`
  width: 0;
  height: 21px;
  border-left: 1px solid ${({ color }) => color || '#f6f5f5'};
  margin-left: 16px;
  margin-right: 13px;
`;
