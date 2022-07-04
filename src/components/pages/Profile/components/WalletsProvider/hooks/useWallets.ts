import { useCallback, useEffect, useMemo, useState } from 'react';
import fetchJson from '@/lib/fetchJson';
import { serviceUrl } from '@/config/env';
import { sendMetricsWalletAdded } from '@/services/metrics';
import { mailchimpSendWalletAdded } from '@/services/mailchimp';
import { User } from '@/pages/api/user';

export type WalletsType = { name: string; value: string }[];

export const useWallets = (user?: User) => {
  const [wallets, setWallets] = useState<WalletsType>([]);

  const fetchWallets = useCallback(async () => {
    const wallets: Array<{
      name: string;
      value: string;
    }> = await fetchJson(`https://${serviceUrl}/wallets`, {}, user?.token);
    setWallets(wallets);
    sendMetricsWalletAdded();

    if (user?.email) {
      mailchimpSendWalletAdded(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (user?.token?.length && !wallets.length) fetchWallets();
  }, [fetchWallets, user?.token?.length, wallets?.length]);

  const walletsAreVerified = useMemo(() => wallets.length === 2, [wallets]);

  return { wallets, walletsAreVerified, fetchWallets };
};
