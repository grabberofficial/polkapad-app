import { memo } from 'react';
import { AppProps } from 'next/app';
import Providers from '@/shared/providers';
import { MainLayout } from '@/layouts';
import { Header } from '@/components';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <MainLayout>
      <Header />
      <Component {...pageProps} />
    </MainLayout>
  );
};

const MemoApp = memo(App);

const AppWrapper = (props: any): JSX.Element => {
  const { ...rest } = props;

  return (
    <Providers>
      <MemoApp {...rest} />
    </Providers>
  );
};

export default AppWrapper;
