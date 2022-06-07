import { Button as ChakraButton, Flex, forwardRef } from '@chakra-ui/react';
import React from 'react';
import { Arrow, ButtonDivider } from './Button.style';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  fixedWidth?: number;
  icon?: React.ReactNode;
  iconPlacement?: 'left' | 'right';
  withArrow?: boolean;
  withIconDivider?: boolean;
}

export const Button: React.FC<ButtonProps & any> = forwardRef<
  ButtonProps,
  'button'
>(
  (
    {
      iconPlacement,
      variant,
      children,
      withArrow,
      fixedWidth,
      icon,
      withIconDivider,
      ...rest
    },
    ref,
  ) => {
    const { disabled } = rest;
    const hoverStyle =
      variant === 'primary'
        ? {
            backgroundColor: '#00BAD6',
            '& .button-arrow': {
              transform: 'translateX(3px)',
              color: 'green',
            },
            '& .arrow-container': {
              borderColor: '#12A8BF',
            },
          }
        : {
            color: '#49c7da',
            '& .button-arrow': {
              transform: 'translateX(3px)',
            },
          };

    const dividerColor = variant === 'primary' ? '#16B9D1' : '#E0E0E0';
    const border = `1px solid ${dividerColor}`;

    return (
      <ChakraButton
        backgroundColor={variant === 'primary' ? '#49C7DA' : '#FFFFFF'}
        color={variant === 'primary' ? '#FFFFFF' : '#303030'}
        fontSize={14}
        fontWeight={600}
        fontFamily="Poppins"
        _hover={disabled ? {} : hoverStyle}
        width="100%"
        height="48px"
        display="flex"
        align-items="center"
        border={variant === 'primary' ? undefined : '1px solid #E5E4E4'}
        maxWidth={fixedWidth ? `${fixedWidth}px` : '100%'}
        ref={ref}
        {...rest}
      >
        <Flex
          justifyContent="center"
          flexBasis="calc(100% - 50px)"
          gap="7px"
          maxHeight="100%"
          alignItems="center"
          padding={withArrow ? '0 10px' : undefined}
        >
          {iconPlacement === 'left' && icon}
          {iconPlacement === 'left' && withIconDivider && (
            <ButtonDivider
              style={{ marginLeft: '9px', marginRight: '6px' }}
              color={dividerColor}
            />
          )}
          {children}
          {iconPlacement === 'right' && withIconDivider && (
            <ButtonDivider
              style={{ marginLeft: '9px', marginRight: '6px' }}
              color={dividerColor}
            />
          )}
          {iconPlacement === 'right' && icon}
        </Flex>
        {withArrow && (
          <Flex
            flexBasis="50px"
            margin="0 0 0 auto"
            alignItems="center"
            justifyContent="center"
            height="21px"
            borderLeft={border}
            className="arrow-container"
          >
            <Arrow
              primary={variant === 'primary' || undefined}
              style={{
                marginLeft: '16px',
              }}
              className="button-arrow"
            />
          </Flex>
        )}
      </ChakraButton>
    );
  },
);
