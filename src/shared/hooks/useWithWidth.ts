import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useWithWidth = (): [
  number | null,
  Dispatch<SetStateAction<number>>,
] => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return [width, setWidth];
};
