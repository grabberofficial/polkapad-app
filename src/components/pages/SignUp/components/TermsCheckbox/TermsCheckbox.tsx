import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Flex, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';
import { Control, FieldErrors } from 'react-hook-form';
import { SignupFormInput } from '@/components/pages/SignUp/SignUpPage';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import * as React from 'react';
import styled from '@emotion/styled';

interface TermsCheckboxProps {
  control: Control<SignupFormInput, any>;
  errors: FieldErrors<SignupFormInput>['terms'];
}

export const TermsCheckbox = ({ errors, control }: TermsCheckboxProps) => {
  return (
    <FormControl isInvalid={!!errors}>
      <Flex>
        <Checkbox
          control={control}
          fieldName="terms"
          alignItems="flex-start"
          hasError={!!errors}
        ></Checkbox>
        <Text
          marginLeft="11px"
          width="100%"
          fontSize={11}
          lineHeight="16px"
          color="secondary.textLight"
          fontFamily="Poppins"
        >
          Yes, I understand and agree to the Polkapad&nbsp;
          <GoogleDocsViewer
            title="Terms and Service"
            fileUrl="https://drive.google.com/file/d/1QxeZEdb-QzQy5Ra6eD8kJcmPS1khLiAq/preview"
            control={(props) => <DocUrl {...props}>Terms of Service</DocUrl>}
          />
          <br />
          and&nbsp;
          <GoogleDocsViewer
            title="Privacy Policy"
            fileUrl="https://drive.google.com/file/d/1kO34-LSkXup8c3vsspK0XILTKvKoxw8k/preview"
            control={(props) => <DocUrl {...props}>Privacy Policy</DocUrl>}
          />
        </Text>
      </Flex>

      {errors && (
        <FormErrorMessage
          fontWeight="400"
          fontSize="12px"
          lineHeight="18px"
          color="error"
        >
          {errors.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

const DocUrl = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;
