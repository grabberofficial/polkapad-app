import { memo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/shared/providers';
import { MainLayout } from '@/layouts';
import { Header, GoogleAnalytics } from '@/components';
import { SWRConfig } from 'swr';
import fetchJson from '@/lib/fetchJson';

const meta = {
  title: 'Polkapad - Polkadot Fundraising Hub',
  description:
    'HMC (Heterogeneous Multi-Chain) Launchpad, matching the best new products with their relevant communities, parachain-agnostic.',
};

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="application-name" content={meta.title} />
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
        <GoogleAnalytics id="UA-224750182-1" />
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

export default AppWrapper;
