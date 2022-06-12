import React from 'react';
import Link from 'next/link';

import { HeaderItemStyled } from './HeaderItems.style';
import { useRouter } from 'next/router';

export const HeaderItem: React.FC<{ url: string }> = ({ url, children }) => {
  const router = useRouter();

  return (
    <Link href={url}>
      <HeaderItemStyled isSelected={router.pathname === url}>
        <div>
          {children}
        </div>
      </HeaderItemStyled>
    </Link>
  );
};
