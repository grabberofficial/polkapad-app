import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputText = styled.span`
  position: absolute;
  top: 22%;
  right: 20px;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
  color: #e0e0e0;
`;

export const Input: React.FC<
  {
    text?: string;
    value?: any;
  } & InputProps
> = ({ text, ...props }) => {
  return (
    <Container>
      <ChakraInput
        background="white"
        border="1px solid #E5E4E4"
        borderRadius="4px"
        position="relative"
        fontWeight="600"
        fontSize="14px"
        lineHeight="21px"
        color="#303030"
        height="48px"
        {...props}
      />
      {text && <InputText>{text}</InputText>}
    </Container>
  );
};
