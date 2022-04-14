import { Heading, styled } from '@chakra-ui/react';

export const HeadingWithUnderlineStyled = styled(Heading)`
  &::after {
    content: '';
    width: 43px;
    height: 5px;
  }
`;
