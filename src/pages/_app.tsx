import { memo } from 'react';
import { AppProps } from 'next/app';
import Providers from '@/shared/providers';
import { MainLayout } from '@/layouts';
import { Header, GoogleAnalytics } from '@/components';
import { SWRConfig } from 'swr';
import fetchJson from '@/lib/fetchJson';
import dynamic from 'next/dynamic';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
      }}
    >
      <MainLayout>
        <Header />
        <Component {...pageProps} />
      </MainLayout>
      <GoogleAnalytics id="UA-224750182-1" />
    </SWRConfig>
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

export default dynamic(() => Promise.resolve(AppWrapper), {
  ssr: false,
});
