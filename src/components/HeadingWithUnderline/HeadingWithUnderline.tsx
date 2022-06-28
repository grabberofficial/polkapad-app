import { Heading as HeadingChakra, HeadingProps } from '@chakra-ui/react';

export const Heading: React.FC<{ withUnderline?: boolean } & HeadingProps> = ({
  withUnderline,
  children,
  ...props
}) => {
  return (
    <HeadingChakra
      lineHeight="62px"
      fontWeight="600"
      fontSize="50px"
      style={{ position: 'relative' }}
      _after={
        withUnderline
          ? {
              content: '""',
              width: '43px',
              height: '5px',
              backgroundColor: 'primary.basic',
              position: 'absolute',
              bottom: '-11px',
              left: 0,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </HeadingChakra>
  );
};
