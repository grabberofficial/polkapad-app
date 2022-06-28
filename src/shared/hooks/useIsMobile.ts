import { useWithWidth } from '@/shared/hooks/useWithWidth';

export const useIsMobile = () => {
  const [width] = useWithWidth();

  return width ? width <= 1100 : null;
};
