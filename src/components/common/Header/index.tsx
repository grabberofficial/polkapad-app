import useUser from '@/hooks/useUser';
import { useMemo } from 'react';

import { Header as HeaderComponent } from './Header';

const Header = () => {
  const { user, isLoading } = useUser();

  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);

  return <HeaderComponent isLoggedIn={isLoggedIn} isLoading={isLoading} />;
};

export { HeaderComponent, Header };
