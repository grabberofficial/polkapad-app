import { Image } from '@chakra-ui/react';
import supportIcon from '@/assets/support.svg';
import React from 'react';
import styled from '@emotion/styled';
import { Button as ChakraButton } from '@chakra-ui/button';
import { useIsMobile } from '@/hooks/useIsMobile';

export const SupportButton = () => {
  const isMobile = useIsMobile();
  return (
    <StyledButton
      top={['50px', '50px', '50px', '76px']}
      right={['10px', '10px', '10px', '96px']}
      _hover={{ backgroundColor: 'primary.hover' }}
      as="a"
      href="mailto:support@polkapad.network"
    >
      <Image
        src={supportIcon}
        width={isMobile ? '24px' : '32px'}
        height={isMobile ? '24px' : '32px'}
      />
    </StyledButton>
  );
};

const StyledButton = styled(ChakraButton)`
  border-radius: 100%;
  background-color: var(--chakra-colors-primary-basic);
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  padding: 0;

  @media (max-width: 1100px) {
    width: 32px;
    height: 32px;
  }
`;
