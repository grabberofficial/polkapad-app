import { formatEther } from 'ethers/lib/utils';
import { useContext, useEffect, useState } from 'react';
import { useSubstrate } from '../providers/substrate';
import { UserContext } from '../providers/userContext';

export const POLKA_CONNECT_KEY = 'shouldConnectPolka';

export const useConnectPolka = () => {
  const { api, keyring } = useSubstrate();

  const [balance, setBalance] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const userContext = useContext(UserContext);

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

  useEffect(() => {
    if (account && balance && !userContext?.polka?.address) {
      userContext.setContext({
        ...userContext,
        polka: {
          address: account as string,
          balance: parseFloat(formatEther(balance)).toFixed(3),
        },
      });
    }
  }, [account, balance, userContext]);

  // TODO: balance subscription and account disconnect

  return {
    balance,
    account,
    connectToPolka: getExtensionAddress,
  };
};
