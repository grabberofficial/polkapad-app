import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Injected,
  InjectedWindowProvider,
} from '@polkadot/extension-inject/types';
import { WalletMeta } from '@/constants/wallets';
import { CONNECTED_POLKA_WALLET_KEY } from '@/constants/localStorage';
import { gearService } from '@/hooks/gearService';
import { Balance } from '@polkadot/types/interfaces';
import {
  checkIsPolkaWalletInstalled,
  cleanPolkaStorage,
} from '@/utils/wallets';
import { callOnDocumentReady } from '@/utils/common';
import useUser from '@/hooks/useUser';
import { Signer } from '@polkadot/api/types';

export type Account = {
  name?: string;
  type?: string;
  address: string;
};

const DAPP_NAME = 'Polkapad';
// const POLKA_CHAIN_ID = '0';
// const KUSAMA_CHAIN_ID = '2';
// const CHAIN_IDS = [POLKA_CHAIN_ID];

type PolkadotExtensionContextType = {
  connectPolkadot: (wallet: WalletMeta) => void;
  disconnect: () => void;
  address: string;
  accounts: Account[];
  extension?: Injected;
  connectedWallet?: WalletMeta;
  dotBalance?: string;
  balance?: Balance | null;
  plpdBalance?: string | null;
  stakedBalance?: string | null;
  stakePlpd: (amount: string) => Promise<void>;
  withdrawPlpd: (amount: string) => Promise<void>;
  updateBalance: () => Promise<void>;
  updateStakedBalance: () => Promise<void>;
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
  balance: null,
  plpdBalance: null,
  stakePlpd: () => new Promise(() => null),
  withdrawPlpd: () => new Promise(() => null),
  updateBalance: () => new Promise(() => null),
  updateStakedBalance: () => new Promise(() => null),
  isConnected: false,
  isLoading: false,
});

export const PolkadotExtensionProvider = (props: any) => {
  const unsubscribe = useRef<() => void>(() => null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [extension, setExtension] = useState<Injected>();
  const [signer, setSigner] = useState<Signer>();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<Balance | null>();
  const [plpdBalance, setPlpdBalance] = useState<string | null>();
  const [stakedBalance, setStakedBalance] = useState<string>();
  const { user } = useUser();
  const isConnected = !!accounts.length;
  const connectedWallet = getConnectedWallet();

  const address = useMemo(() => accounts[0]?.address, [accounts]);
  // const { balances } = useBalances([address], CHAIN_IDS);
  // const dotBalance = useMemo(() => {
  //   return balances.find((balance) => balance?.address === address)?.free;
  // }, [address, balances]);

  const connectPolkadot = useCallback(async (wallet: WalletMeta) => {
    const injectedExtension: InjectedWindowProvider =
      window?.injectedWeb3?.[wallet.extensionName];

    if (!injectedExtension) {
      window.open(wallet.installUrl);
      return;
    }

    try {
      setIsLoading(true);
      const enabledExtension = await injectedExtension?.enable(DAPP_NAME);
      setExtension(enabledExtension);

      const accounts = await enabledExtension.accounts.get();
      const accountAddress = accounts[0]?.address;
      setAccounts(accounts);
      localStorage.setItem(CONNECTED_POLKA_WALLET_KEY, JSON.stringify(wallet));

      if (enabledExtension?.accounts.subscribe) {
        unsubscribe.current = enabledExtension?.accounts.subscribe(
          (result: Account[]) => {
            setAccounts(result);
          },
        );
      }

      setSigner(enabledExtension?.signer);

      await gearService.connect();
      Promise.all([
        gearService.getBalance(accountAddress),
        gearService.getPLPDBalance(accountAddress),
        gearService.getStakedPLPDBalance(accountAddress),
      ]).then(([gearBalance, plpdContractBalance, stakedPlpdBalance]) => {
        setBalance(gearBalance);
        setPlpdBalance(plpdContractBalance?.Balance);
        setIsLoading(false);
        setStakedBalance(stakedPlpdBalance?.Staked);
      });
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, []);

  const updateBalance = useCallback(async () => {
    setBalance(await gearService.getBalance(address));
    setPlpdBalance((await gearService.getPLPDBalance(address))?.Balance);
  }, [address]);

  const updateStakedBalance = useCallback(async () => {
    setStakedBalance((await gearService.getStakedPLPDBalance(address))?.Staked);
  }, [address]);

  const stakePlpd = useCallback(
    async (amount: string) => {
      if (signer) {
        await gearService.stakePLPD(address, signer, amount);
        await updateBalance();
        await updateStakedBalance();
      }
    },
    [address, signer, updateBalance, updateStakedBalance],
  );

  const withdrawPlpd = useCallback(
    async (amount: string) => {
      if (signer) {
        await gearService.withdrawPLPD(address, signer, amount);
        await updateBalance();
        await updateStakedBalance();
      }
    },
    [address, signer, updateBalance, updateStakedBalance],
  );

  const disconnect = useCallback(async () => {
    setAccounts([]);
    setBalance(null);
    setPlpdBalance(null);
    unsubscribe.current();
    cleanPolkaStorage();
  }, [setAccounts, unsubscribe]);

  useEffect(() => {
    callOnDocumentReady(() => {
      if (
        user?.isLoggedIn &&
        !isConnected &&
        !isLoading &&
        connectedWallet &&
        checkIsPolkaWalletInstalled(connectedWallet)
      ) {
        connectPolkadot(connectedWallet);
      }
    });
  }, [user?.isLoggedIn]);

  const value = useMemo(
    () => ({
      connectPolkadot,
      disconnect,
      address,
      accounts,
      extension,
      connectedWallet,
      // dotBalance,
      balance,
      plpdBalance,
      stakedBalance,
      stakePlpd,
      withdrawPlpd,
      updateBalance,
      updateStakedBalance,
      isLoading,
      isConnected,
    }),
    [
      connectPolkadot,
      disconnect,
      address,
      accounts,
      extension,
      connectedWallet,
      // dotBalance,
      balance,
      plpdBalance,
      stakePlpd,
      withdrawPlpd,
      stakedBalance,
      updateBalance,
      updateStakedBalance,
      isLoading,
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
