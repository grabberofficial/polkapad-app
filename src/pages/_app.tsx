import { memo } from 'react';
import { AppProps } from 'next/app';
// import { CustomAppProps } from 'types';
// import { withCsp } from 'utils/withCsp';
import Providers from '@/shared/providers';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
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
