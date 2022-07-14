import { Flex, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface WalletPopupItemProps {
  text: string;
  icon: string;
  onClick?: () => void;
}

export const WalletPopupItem = ({
  text,
  icon,
  onClick,
}: WalletPopupItemProps) => {
  return (
    <Flex
      width="100%"
      display="flex"
      height="48px"
      padding="6px"
      marginTop="16px"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={'row'}
      border="1px solid var(--chakra-colors-primary-border)"
      borderColor={'primary.border'}
      _hover={{ borderColor: 'primary.basic', color: 'primary.basic' }}
      borderRadius="4px"
      cursor="pointer"
      onClick={onClick}
    >
      <Flex alignItems={'center'}>
        <Image
          margin="0px 14px 0px 11px"
          src={icon}
          alt={text}
          width="29px"
          height="29px"
        />
        <WalletText>{text}</WalletText>
      </Flex>
    </Flex>
  );
};

const WalletText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 700;
  padding-left: 25px;
  height: 20px;
  border-left: 1px solid #e0e0e0;

  @media (max-width: 500px) {
    padding-left: 10px;
  }
`;
