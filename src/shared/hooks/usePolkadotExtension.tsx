import { getWallets, Wallet } from '@talisman-connect/wallets';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useBalances } from '@talismn/api-react-hooks';
import { InjectedWindow } from '@polkadot/extension-inject/types';
import { POLKADOT_WALLET } from '@/constants/wallets';

const injectedWindow = window as Window & InjectedWindow;

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
  wallets: Wallet[];
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
  wallets: [],
  dotBalance: '',
  isPolkadotInstalled: false,
  isTalismanInstalled: false,
  isConnected: false,
});

export const PolkadotExtensionProvider = (props: any) => {
  const wallets = getWallets();
  const unsubscribe = useRef(() => null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const isConnected = !!accounts.length;

  const address = useMemo(() => accounts[POLKA_CHAIN_ID]?.address, [accounts]);

  const isPolkadotInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[POLKADOT_WALLET.extensionName];
  }, [injectedWindow?.injectedWeb3]);

  const isTalismanInstalled = useMemo(() => {
    return !!injectedWindow?.injectedWeb3?.[POLKADOT_WALLET.extensionName];
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
      const wallet = wallets.find(
        (wallet) => wallet.extensionName === walletName,
      );
      const injectedWindow = window as Window & InjectedWindow;
      const injectedExtension = injectedWindow?.injectedWeb3?.[walletName];

      try {
        await injectedExtension?.enable(DAPP_NAME);
      } catch (err) {
        console.error(err);
        return;
      }

      unsubscribe.current = wallet?.extension?.accounts.subscribe(
        (result: Account[]) => {
          setAccounts(result);
        },
      );
    },
    [wallets],
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
      wallets,
      dotBalance,
      isPolkadotInstalled,
      isTalismanInstalled,
      isConnected,
    }),
    [
      connectPolkadot,
      disconnect,
      address,
      accounts,
      wallets,
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
