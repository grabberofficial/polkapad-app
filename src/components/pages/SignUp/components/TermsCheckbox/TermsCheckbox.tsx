import { Checkbox } from '@/components/common/Checkbox/Checkbox';
import { Flex, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';
import { Control, FieldError } from 'react-hook-form';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import styled from '@emotion/styled';
import {
  PRIVACY_LINK,
  TERMS_LINK,
} from '@/components/GoogleDocsViewer/GoogleDocsViewer.constants';

interface TermsCheckboxProps {
  control: Control<any, any>;
  errors?: FieldError;
}

export const TermsCheckbox = ({ errors, control }: TermsCheckboxProps) => {
  return (
    <FormControl isInvalid={!!errors} width="50%">
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
          fontSize={14}
          lineHeight="24px"
          color="primary.basic"
          fontFamily="Poppins"
        >
          Yes, I understand and agree to the
          <GoogleDocsViewer
            title="Terms and Service"
            fileUrl={TERMS_LINK}
            control={(props) => <DocUrl {...props}> Terms of Service</DocUrl>}
          />{' '}
          and
          <GoogleDocsViewer
            title="Privacy Policy"
            fileUrl={PRIVACY_LINK}
            control={(props) => <DocUrl {...props}> Privacy Policy</DocUrl>}
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
  color: var(--chakra-colors-accent-blue);
  cursor: pointer;
  transition: transform 300ms;

  &:hover {
    text-decoration: none;
    color: #5cbaec;
  }
`;
