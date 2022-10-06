import { useCallback, useState } from 'react';
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  Image,
} from '@chakra-ui/react';
import checkboxChecked from '@/assets/checkbox_checked.svg';
import { Control, Controller } from 'react-hook-form';
import styled from '@emotion/styled';

interface ICheckboxProps extends CheckboxProps {
  control?: Control<any, any>;
  fieldName: string;
  hasError?: boolean;
  onChange?: () => void;
}

export const Checkbox = ({
  children,
  fieldName,
  control,
  hasError,
  ...props
}: ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const onCheck = useCallback((value, fieldOnChange) => {
    setIsChecked(value);
    fieldOnChange(value);
  }, []);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <StyledCheckbox
          icon={<Image src={checkboxChecked} />}
          colorScheme="transparent"
          _hover={{ borderColor: 'primary.basic' }}
          backgroundColor={isChecked ? 'primary.basic' : undefined}
          borderColor={isChecked ? 'primary.basic' : undefined}
          onChange={({ target: { checked } }) => onCheck(checked, onChange)}
          {...props}
          {...field}
        >
          {children}
        </StyledCheckbox>
      )}
    />
  );
};

const StyledCheckbox = styled(ChakraCheckbox)`
  height: 15px;
  border-radius: 4px;

  span {
    border-width: 1px;
    border-radius: 4px;
  }
`;
