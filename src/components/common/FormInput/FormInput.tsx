import { Input, InputProps } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormInputProps extends InputProps {
  control?: Control<any, any>;
  defaultValue?: string;
  fieldType?: HTMLInputTypeAttribute;
  placeholder?: string;
  hasRightElement?: boolean;
  fieldName: string;
  hasError?: boolean;
  onChange?: () => void;
}

export const FormInput = ({
  fieldName,
  fieldType = 'text',
  defaultValue = '',
  placeholder,
  hasRightElement,
  control,
  hasError,
  ...rest
}: FormInputProps) => {
  if (control)
    return (
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, ...field } }) => (
          <Input
            height="48px"
            paddingLeft={hasRightElement ? '16px' : '72px'}
            fontWeight="600"
            fontSize="14px"
            lineHeight="21px"
            borderRadius="4px"
            border="none"
            placeholder={placeholder}
            backgroundColor="#fff"
            _disabled={{ backgroundColor: 'background.gray' }}
            id={fieldName}
            type={fieldType}
            errorBorderColor={hasError ? 'error' : undefined}
            color={hasError ? 'error' : undefined}
            onChange={onChange}
            {...field}
            {...rest}
          />
        )}
      />
    );
  return (
    <Input
      height="48px"
      paddingLeft={hasRightElement ? '16px' : '72px'}
      fontWeight="600"
      fontSize="14px"
      lineHeight="21px"
      borderRadius="4px"
      border="none"
      backgroundColor="#fff"
      _disabled={{ backgroundColor: 'background.gray' }}
      placeholder={placeholder}
      id={fieldName}
      type={fieldType}
      errorBorderColor={hasError ? 'error' : undefined}
      color={hasError ? 'error' : undefined}
      {...rest}
    />
  );
};
