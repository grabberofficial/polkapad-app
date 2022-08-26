import styled from '@emotion/styled';
import { Image, ImageProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface PasswordButtonProps extends ImageProps {
  passwordType: string;
  setPasswordType: Dispatch<SetStateAction<'text' | 'password'>>;
}

export const PasswordButton = ({
  passwordType,
  setPasswordType,
  ...props
}: PasswordButtonProps) => {
  const togglePasswordVisibility = useCallback(() => {
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password');
  }, [passwordType, setPasswordType]);

  return <StyledImage {...props} onClick={togglePasswordVisibility} />;
};

const StyledImage = styled(Image)`
  color: var(--chakra-colors-primary-basic);
  width: 24px;
  height: 24px;
  position: absolute;
  top: 13px;
  right: 15px;
  cursor: pointer;
  transition: transform 0.25s, opacity 0.25s;
  z-index: 1;
  opacity: 0.5;

  &:hover {
    transform: scale(1.03);
    color: var(--chakra-colors-primary-hover);
    opacity: 1;
  }

  &:active {
    transform: scale(0.98);
  }
`;
