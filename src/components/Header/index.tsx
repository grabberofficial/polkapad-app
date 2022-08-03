import useUser from '@/hooks/useUser';
import { useMemo } from 'react';

import { Header as HeaderComponent } from './Header';

const Header = () => {
  const { user } = useUser();

  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

  return <HeaderComponent isLoggedIn={isLoggedIn} />;
};

export { HeaderComponent, Header };
