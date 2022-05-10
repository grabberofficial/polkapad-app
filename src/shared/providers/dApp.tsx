import { ReactNode } from 'react';
import { ChainId, DAppProvider, Ropsten, Mainnet } from '@usedapp/core';

interface DAppProps {
  children: ReactNode;
}

const config = {
  networks: [Mainnet, Ropsten],
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Mainnet]: `https://eth-mainnet.alchemyapi.io/v2/${'ylE0wN4_2ALWd8ZK7hgvDMi4eRCfskQY'}`,
    [ChainId.Ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${'ylE0wN4_2ALWd8ZK7hgvDMi4eRCfskQY'}`,
  },
};

const _DAppProvider = ({ children }: DAppProps) => {
  return <DAppProvider config={config}>{children}</DAppProvider>;
};

export default _DAppProvider;
