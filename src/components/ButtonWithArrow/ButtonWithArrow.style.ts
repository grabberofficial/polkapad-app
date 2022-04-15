import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid blue;
`;

export const ButtonStyled = styled(Button)`
  position: relative;
  /* separator here somehow */
  &:after {
    content: '""';
    position: absolute;
  }
`;
