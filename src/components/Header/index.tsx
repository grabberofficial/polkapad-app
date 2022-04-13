import { AccountButton } from './components/AccountButton/AccountButton';
import { HeaderItem } from './components/HeaderItems/HeaderItem';
import { Header as HeaderComponent } from './Header';

const Header = () => {
  return (
    <HeaderComponent right={[AccountButton]}>
      <HeaderItem url="/">Home</HeaderItem>
      <HeaderItem url="/about">About</HeaderItem>
      <HeaderItem url="/docs">Docs</HeaderItem>
      <HeaderItem url="/blog">Blog</HeaderItem>
      <HeaderItem url="/community">Community</HeaderItem>
    </HeaderComponent>
  );
};

export { HeaderComponent, Header };
