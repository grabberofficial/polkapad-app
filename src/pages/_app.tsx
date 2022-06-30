import { memo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/shared/providers';
import { MainLayout } from '@/layouts';
import { Header, GoogleAnalytics } from '@/components';
import { SWRConfig } from 'swr';
import fetchJson from '@/lib/fetchJson';
import dynamic from 'next/dynamic';
import { googleAnalyticsId } from '@/config/env';
import { checkIsIOS } from '@/shared/utils/checkIsIOS';

const meta = {
  title: 'Polkapad - HMC Launchpad',
  description:
    'Heterogeneous Multi-Chain Launchpad is the first Polkadot-Native Launchpad.',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
};

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="application-name" content={meta.title} />
        {checkIsIOS() && <meta name="viewport" content={meta.viewport} />}
        <meta name="apple-mobile-web-app-title" content={meta.title} />
        <meta property="og:title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
      </Head>
      <SWRConfig
        value={{
          fetcher: fetchJson,
        }}
      >
        <MainLayout>
          <Header />
          <Component {...pageProps} />
        </MainLayout>
        {googleAnalyticsId && <GoogleAnalytics id={googleAnalyticsId} />}
      </SWRConfig>
    </>
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
