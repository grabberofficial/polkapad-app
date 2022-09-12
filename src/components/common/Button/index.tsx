import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Flex,
  forwardRef,
} from '@chakra-ui/react';
import React from 'react';
import { Arrow, ButtonDivider } from './Button.style';

interface ButtonProps extends ChakraButtonProps {
  variant: 'primary' | 'secondary' | 'transparent';
  fixedWidth?: number;
  icon?: React.ReactNode;
  iconGap?: number;
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
      iconGap,
      withIconDivider,
      ...rest
    },
    ref,
  ) => {
    const { disabled } = rest;
    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary';
    const isTransparent = variant === 'transparent';

    const hoverStyle = isPrimary
      ? {
          color: 'var(--chakra-colors-primary-textHover)',
          '& .button-arrow': {
            transform: 'translateX(3px)',
            color: 'green',
          },
          '& .arrow-container': {
            borderColor: 'yellow',
          },
        }
      : {
          color: 'var(--chakra-colors-primary-text)',
          backgroundColor: isSecondary
            ? 'var(--chakra-colors-primary-basic)'
            : undefined,
          borderColor: 'var(--chakra-colors-primary-text)',
          '& .button-arrow': {
            transform: 'translateX(3px)',
          },
        };

    const dividerColor = isPrimary ? 'var(--chakra-colors-border)' : '#E0E0E0';
    const border = `1px solid ${dividerColor}`;

    return (
      <ChakraButton
        backgroundColor={isPrimary ? 'primary.basic' : 'transparent'}
        color={isPrimary ? 'primary.text' : 'secondary.text'}
        fontSize={14}
        fontWeight={600}
        fontFamily="Poppins"
        _hover={disabled ? {} : hoverStyle}
        width="100%"
        height="48px"
        display="flex"
        align-items="center"
        _active={
          isTransparent
            ? { backgroundColor: 'transparent', opacity: 0.6 }
            : undefined
        }
        border={
          isSecondary ? '1px solid var(--chakra-colors-borderDark)' : undefined
        }
        maxWidth={fixedWidth ? `${fixedWidth}px` : '100%'}
        ref={ref}
        {...rest}
      >
        <Flex
          justifyContent="center"
          flexBasis="calc(100% - 50px)"
          gap={iconGap || '7px'}
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
              primary={isPrimary || undefined}
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
