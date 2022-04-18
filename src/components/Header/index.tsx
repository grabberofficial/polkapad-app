import { useMemo } from 'react';
import { Button } from '../Button';
import { AccountButtonIcon } from './components/AccountButtonIcon';
import { HeaderItem } from './components/HeaderItems/HeaderItem';
import { Header as HeaderComponent } from './Header';

const ConnectWalletButton: React.FC = () => {
  return (
    <Button variant="secondary" fixedWidth={150}>
      Connect Wallet
    </Button>
  );
};

const AccountButton: React.FC = () => {
  return (
    <Button
      variant="secondary"
      iconPlacement="left"
      icon={<AccountButtonIcon />}
      fixedWidth={152}
      withIconDivider
    >
      Account
    </Button>
  );
};

const Header = () => {
  const headerButtons = useMemo(() => [ConnectWalletButton, AccountButton], []);

  return (
    <HeaderComponent right={headerButtons}>
      <HeaderItem url="/">Home</HeaderItem>
      <HeaderItem url="/launchpad">Launchpad</HeaderItem>
      <HeaderItem url="/about">About</HeaderItem>
      <HeaderItem url="/docs">Docs</HeaderItem>
      <HeaderItem url="/blog">Blog</HeaderItem>
      <HeaderItem url="/community">Community</HeaderItem>
    </HeaderComponent>
  );
};

export { HeaderComponent, Header };
