import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useBalances } from '@talismn/api-react-hooks';
import {
  Injected,
  InjectedWindow,
  InjectedWindowProvider,
} from '@polkadot/extension-inject/types';
import { POLKADOT_WALLET, TALISMAN_WALLET } from '@/constants/wallets';

export type Account = {
  name?: string;
  type?: string;
  address: string;
};

const DAPP_NAME = 'Polkapad';
const POLKA_CHAIN_ID = '0';
const CHAIN_IDS = [POLKA_CHAIN_ID];

type PolkadotExtensionContextType = {
  connectPolkadot: (walletName: string) => void;
  disconnect: () => void;
  address: string;
  accounts: Account[];
  extension?: Injected;
  dotBalance?: string;
  isPolkadotInstalled: boolean;
  isTalismanInstalled: boolean;
  isConnected: boolean;
};

const PolkadotExtensionContext = createContext<PolkadotExtensionContextType>({
  connectPolkadot: () => null,
  disconnect: () => null,
  address: '',
  accounts: [],
  dotBalance: '',
  isPolkadotInstalled: false,
  isTalismanInstalled: false,
  isConnected: false,
});

export const PolkadotExtensionProvider = (props: any) => {
  const injectedWindow = window as Window & InjectedWindow;
  const unsubscribe = useRef<() => void>(() => null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [extension, setExtension] = useState<Injected>();
  const isConnected = !!accounts.length;

  const address = useMemo(() => accounts[POLKA_CHAIN_ID]?.address, [accounts]);

  const isPolkadotInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[POLKADOT_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const isTalismanInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[TALISMAN_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const addresses = useMemo(() => {
    return accounts?.map((account) => account.address);
  }, [accounts]);

  const { balances } = useBalances(addresses, CHAIN_IDS);
  const dotBalance = useMemo(() => {
    return balances[0]?.free;
  }, [balances]);

  const connectPolkadot = useCallback(
    async (walletName: string) => {
      const injectedExtension: InjectedWindowProvider =
        injectedWindow?.injectedWeb3?.[walletName];

      try {
        const enabledExtension = await injectedExtension?.enable(DAPP_NAME);
        setExtension(enabledExtension);

        unsubscribe.current = enabledExtension?.accounts.subscribe(
          (result: Account[]) => {
            setAccounts(result);
          },
        );
      } catch (err) {
        console.error(err);
      }
    },
    [injectedWindow?.injectedWeb3],
  );

  const disconnect = useCallback(async () => {
    setAccounts([]);
    unsubscribe.current();
  }, [setAccounts, unsubscribe]);

  const value = useMemo(
    () => ({
      connectPolkadot,
      disconnect,
      accounts,
      address,
      dotBalance,
      isPolkadotInstalled,
      isTalismanInstalled,
      isConnected,
      extension,
    }),
    [
      connectPolkadot,
      disconnect,
      address,
      accounts,
      extension,
      dotBalance,
      isPolkadotInstalled,
      isTalismanInstalled,
      isConnected,
    ],
  );

  return (
    <PolkadotExtensionContext.Provider value={value}>
      {props.children}
    </PolkadotExtensionContext.Provider>
  );
};

export const usePolkadotExtension = () => useContext(PolkadotExtensionContext);
