import { Dispatch, SetStateAction, useCallback } from 'react';
import { AiTwotoneEye } from 'react-icons/ai';
import { TbEye } from 'react-icons/tb';
import { FieldError } from 'react-hook-form';
import styled from '@emotion/styled';
import { Image, ImageProps } from '@chakra-ui/react';

import { PasswordTypes } from '@/components/common/PasswordControl/PasswordControl.constants';

interface PasswordButtonProps extends ImageProps {
  passwordType: string;
  setPasswordType: Dispatch<SetStateAction<PasswordTypes>>;
  error?: FieldError;
}

export const PasswordButton = ({
  error,
  passwordType,
  setPasswordType,
}: PasswordButtonProps) => {
  const togglePasswordVisibility = useCallback(() => {
    passwordType === PasswordTypes.PASSWORD
      ? setPasswordType(PasswordTypes.TEXT)
      : setPasswordType(PasswordTypes.PASSWORD);
  }, [passwordType, setPasswordType]);

  return (
    <StyledImage
      stroke={error ? 'error' : 'primary.basic'}
      as={passwordType === PasswordTypes.PASSWORD ? TbEye : AiTwotoneEye}
      onClick={togglePasswordVisibility}
    />
  );
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

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.98);
  }
`;
