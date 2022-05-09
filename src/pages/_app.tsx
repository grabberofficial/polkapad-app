import { memo } from 'react';
import { ChainId, DAppProvider, Ropsten } from '@usedapp/core';
import { AppProps } from 'next/app';
import Providers from '@/shared/providers';
import { MainLayout } from '@/layouts';
import { Header } from '@/components';
import { SWRConfig } from 'swr';
import fetchJson from '@/lib/fetchJson';

//TODO: fix process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

const config = {
  networks: [Ropsten],
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${'ylE0wN4_2ALWd8ZK7hgvDMi4eRCfskQY'}`,
  },
};

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <MainLayout>
        <Header />
        <Component {...pageProps} />
      </MainLayout>
    </SWRConfig>
  );
};

const MemoApp = memo(App);

const AppWrapper = (props: any): JSX.Element => {
  const { ...rest } = props;

  return (
    <Providers>
      <DAppProvider config={config}>
        <MemoApp {...rest} />
      </DAppProvider>
    </Providers>
  );
};

export default AppWrapper;
