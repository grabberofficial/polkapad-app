import { useState } from 'react';
import { useSubstrate } from '../providers/substrate';

export const POLKA_CONNECT_KEY = 'shouldConnectPolka';

export const useConnectPolka = () => {
  const { api, keyring, keyringState } = useSubstrate();

  console.log({
    keyring,
    keyringState,
  });

  const [balance, setBalance] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const getExtensionAddress = async () => {
    const keyringOptions = keyring.getPairs().map((account: any) => ({
      key: account.address,
      value: account.address,
      text: account.meta.name.toUpperCase(),
      icon: 'user',
    }));
    setAccount(keyringOptions[0].value);

    const {
      data: { free: polkaBalance },
    } = await api.query.system.account(keyringOptions[0].value);
    setBalance(polkaBalance.toString());
    localStorage.setItem(POLKA_CONNECT_KEY, 'true');
  };

  // TODO: balance subscription and account disconnect

  return {
    balance,
    account,
    connectToPolka: getExtensionAddress,
  };
};
