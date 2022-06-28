import { Input } from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller } from 'react-hook-form';

interface FormInputProps {
  control?: Control<any, any>;
  defaultValue?: string;
  fieldType?: HTMLInputTypeAttribute;
  fieldName: string;
  hasError?: boolean;
}

export const FormInput = ({
  fieldName,
  fieldType = 'text',
  defaultValue = '',
  control,
  hasError,
}: FormInputProps) => {
  if (control)
    return (
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            height="48px"
            paddingLeft="72px"
            fontWeight="600"
            fontSize="14px"
            lineHeight="21px"
            borderRadius="4px"
            id={fieldName}
            type={fieldType}
            errorBorderColor={hasError ? 'error' : undefined}
            color={hasError ? 'error' : undefined}
            {...field}
          />
        )}
      />
    );
  return (
    <Input
      height="48px"
      paddingLeft="72px"
      fontWeight="600"
      fontSize="14px"
      lineHeight="21px"
      borderRadius="4px"
      id={fieldName}
      type={fieldType}
      errorBorderColor={hasError ? 'error' : undefined}
      color={hasError ? 'error' : undefined}
    />
  );
};
