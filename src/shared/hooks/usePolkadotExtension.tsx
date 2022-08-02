import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import {
  CLOVER_WALLET,
  POLKADOT_WALLET,
  SUB_WALLET,
  TALISMAN_WALLET,
  WalletMeta,
} from '@/constants/wallets';
import { CONNECTED_POLKA_WALLET_KEY } from '@/constants/localStorage';

export type Account = {
  name?: string;
  type?: string;
  address: string;
};

const DAPP_NAME = 'Polkapad';
const POLKA_CHAIN_ID = '0';
const CHAIN_IDS = [POLKA_CHAIN_ID];

type PolkadotExtensionContextType = {
  connectPolkadot: (wallet: WalletMeta) => void;
  disconnect: () => void;
  address: string;
  accounts: Account[];
  extension?: Injected;
  connectedWallet?: WalletMeta;
  dotBalance?: string;
  isPolkadotInstalled: boolean;
  isTalismanInstalled: boolean;
  isSubwalletInstalled: boolean;
  isCloverInstalled: boolean;
  isConnected: boolean;
  isLoading: boolean;
};

const getConnectedWallet = () => {
  const connectedWallet = localStorage.getItem(CONNECTED_POLKA_WALLET_KEY);
  return connectedWallet ? JSON.parse(connectedWallet) : null;
};

const PolkadotExtensionContext = createContext<PolkadotExtensionContextType>({
  connectPolkadot: () => null,
  disconnect: () => null,
  address: '',
  accounts: [],
  dotBalance: '',
  isPolkadotInstalled: false,
  isTalismanInstalled: false,
  isSubwalletInstalled: false,
  isCloverInstalled: false,
  isConnected: false,
  isLoading: false,
});

export const PolkadotExtensionProvider = (props: any) => {
  const injectedWindow = window as Window & InjectedWindow;
  const unsubscribe = useRef<() => void>(() => null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [extension, setExtension] = useState<Injected>();
  const [isLoading, setIsLoading] = useState(false);
  const isConnected = !!accounts.length;
  const connectedWallet = getConnectedWallet();

  const address = useMemo(() => accounts[POLKA_CHAIN_ID]?.address, [accounts]);
  const { balances } = useBalances([address], CHAIN_IDS);
  const dotBalance = useMemo(() => {
    return balances[0]?.free;
  }, [balances]);

  const isPolkadotInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[POLKADOT_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const isTalismanInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[TALISMAN_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const isSubwalletInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[SUB_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const isCloverInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[CLOVER_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const connectPolkadot = useCallback(
    async (wallet: WalletMeta) => {
      const injectedExtension: InjectedWindowProvider =
        injectedWindow?.injectedWeb3?.[wallet.extensionName];

      try {
        setIsLoading(true);
        const enabledExtension = await injectedExtension?.enable(DAPP_NAME);
        setExtension(enabledExtension);

        const accounts = await enabledExtension.accounts.get();
        setAccounts(accounts);
        setIsLoading(false);
        localStorage.setItem(
          CONNECTED_POLKA_WALLET_KEY,
          JSON.stringify(wallet),
        );

        if (enabledExtension?.accounts.subscribe) {
          unsubscribe.current = enabledExtension?.accounts.subscribe(
            (result: Account[]) => {
              setAccounts(result);
            },
          );
        }
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    },
    [injectedWindow?.injectedWeb3],
  );

  const disconnect = useCallback(async () => {
    setAccounts([]);
    unsubscribe.current();
    localStorage.removeItem(CONNECTED_POLKA_WALLET_KEY);
  }, [setAccounts, unsubscribe]);

  useEffect(() => {
    const storageWallet = localStorage.getItem(CONNECTED_POLKA_WALLET_KEY);
    if (!isConnected && !isLoading && storageWallet) {
      const wallet = JSON.parse(storageWallet) as WalletMeta;
      connectPolkadot(wallet);
    }
  }, []);

  const value = useMemo(
    () => ({
      connectPolkadot,
      disconnect,
      address,
      accounts,
      extension,
      connectedWallet,
      dotBalance,
      isLoading,
      isConnected,
      isPolkadotInstalled,
      isTalismanInstalled,
      isSubwalletInstalled,
      isCloverInstalled,
    }),
    [
      connectPolkadot,
      disconnect,
      address,
      accounts,
      extension,
      connectedWallet,
      dotBalance,
      isLoading,
      isConnected,
      isPolkadotInstalled,
      isTalismanInstalled,
      isSubwalletInstalled,
      isCloverInstalled,
    ],
  );

  return (
    <PolkadotExtensionContext.Provider value={value}>
      {props.children}
    </PolkadotExtensionContext.Provider>
  );
};

export const usePolkadotExtension = () => useContext(PolkadotExtensionContext);
