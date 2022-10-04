import useUser from '@/hooks/useUser';
import { useMemo } from 'react';

import { Header as HeaderComponent } from './Header';

const Header = () => {
  const { user } = useUser();

  const isLoggedIn = useMemo(() => !!user && user.isLoggedIn, [user]);
  const isLoading = useMemo(() => !user, [user]);

  return <HeaderComponent isLoggedIn={isLoggedIn} isLoading={isLoading} />;
};

export { HeaderComponent, Header };
