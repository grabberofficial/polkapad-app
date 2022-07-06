import { useCallback, useState } from 'react';
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  Image,
} from '@chakra-ui/react';
import checkboxChecked from '@/assets/checkbox_checked.svg';
import { Control, Controller } from 'react-hook-form';

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
        <ChakraCheckbox
          icon={<Image src={checkboxChecked} transform="scale(1.3)" />}
          colorScheme="transparent"
          borderColor={isChecked ? '#fff' : undefined}
          onChange={({ target: { checked } }) => onCheck(checked, onChange)}
          {...props}
          {...field}
        >
          {children}
        </ChakraCheckbox>
      )}
    />
  );
};
