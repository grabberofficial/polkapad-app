import { memo } from 'react';
import { AppProps } from 'next/app';
// import { CustomAppProps } from 'types';
// import { withCsp } from 'utils/withCsp';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

const MemoApp = memo(App);

const AppWrapper = (props: any): JSX.Element => {
  const { ...rest } = props;

  return <MemoApp {...rest} />;
};

export default AppWrapper;
