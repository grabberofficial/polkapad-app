import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { ButtonDivider } from '../ButtonDivider/ButtonDivider';
import { Arrow } from './ButtonWithArrow.style';

interface ButtonWithArrowProps {
  variant: 'primary' | 'secondary';
  fixedWidth?: number;
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
}

export const ButtonWithArrow: React.FC<ButtonWithArrowProps> = ({
  iconPlacement,
  variant,
  children,
  // fixedWidth,
  icon,
}) => {
  const hoverStyle =
    variant === 'primary'
      ? {
          backgroundColor: '#00BAD6',
          '& .button-arrow': {
            transform: 'translateX(3px)',
            color: 'green',
          },
        }
      : {
          color: '#49c7da',
          '& .button-arrow': {
            transform: 'translateX(3px)',
            color: 'green',
          },
        };

  return (
    <Button
      backgroundColor={variant === 'primary' ? '#49C7DA' : '#FFFFFF'}
      color={variant === 'primary' ? '#FFFFFF' : '#303030'}
      fontSize={14}
      fontWeight={600}
      fontFamily="Poppins"
      lineHeight={21}
      _hover={hoverStyle}
      width="100%"
      height="48px"
      display="flex"
      align-items="center"
      border={variant === 'primary' ? undefined : '1px solid #E5E4E4'}
    >
      <Flex
        justifyContent="center"
        flexBasis="calc(100% - 50px)"
        gap="7px"
        maxHeight="100%"
        alignItems="center"
      >
        {iconPlacement === 'left' && icon}
        {children}
        {iconPlacement === 'right' && icon}
      </Flex>
      <Flex flexBasis="50px" margin="0 0 0 auto" alignItems="center">
        <ButtonDivider color={variant === 'primary' ? '#16B9D1' : '#E0E0E0'} />
        <Arrow
          primary={variant === 'primary' || undefined}
          className="button-arrow"
        />
      </Flex>
    </Button>
  );
};
