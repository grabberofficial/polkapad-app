import { Heading as HeadingChakra, HeadingProps } from '@chakra-ui/react';

export const Heading: React.FC<{ withUnderline?: boolean } & HeadingProps> = ({
  withUnderline,
  children,
  ...props
}) => {
  return (
    <HeadingChakra
      lineHeight={'52px'}
      fontWeight={600}
      fontSize={52}
      style={{ position: 'relative' }}
      _after={
        withUnderline
          ? {
              content: '""',
              width: '43px',
              height: '5px',
              backgroundColor: '#49C7DA',
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
