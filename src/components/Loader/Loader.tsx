import spinner from '@/assets/spinner.svg';
import styled from '@emotion/styled';
import { Image, ImageProps } from '@chakra-ui/react';

export const Loader = (props: ImageProps) => (
  <AnimatedImage {...props} src={spinner} />
);

const AnimatedImage = styled(Image)`
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotate 2s linear infinite;
`;
