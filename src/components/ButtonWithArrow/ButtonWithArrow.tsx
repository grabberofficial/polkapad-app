import React from 'react';
import { Arrow, ButtonStyled } from './ButtonWithArrow.style';

interface ButtonWithArrowProps {
  variant: 'primary' | 'secondary';
  fixedWidth?: number;
  icon?: React.ReactNode;
  iconPlacement: 'left' | 'right';
}

export const ButtonWithArrow: React.FC<ButtonWithArrowProps> = ({
  iconPlacement,
  variant,
  children,
  fixedWidth,
  icon,
}) => {
  return (
    <ButtonStyled fixedWidth={fixedWidth} variant={variant}>
      {iconPlacement === 'left' && icon}
      {children}
      {iconPlacement === 'right' && icon}
      <Arrow />
    </ButtonStyled>
  );
};
