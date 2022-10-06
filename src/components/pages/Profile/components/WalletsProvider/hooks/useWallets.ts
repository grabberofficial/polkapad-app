import { useCallback, useEffect, useMemo, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { serviceUrl } from '@/config/env';
import { User } from '@/hooks/useUser';

export type WalletsType = { name: string; value: string }[];

export const useWallets = (user?: User) => {
  const [wallets, setWallets] = useState<WalletsType>([]);

  const fetchWallets = useCallback(async () => {
    const wallets: Array<{
      name: string;
      value: string;
    }> = await fetchJson(`https://${serviceUrl}/wallets`, {});
    setWallets(wallets);
  }, []);

  useEffect(() => {
    if (user?.token?.length && !wallets.length) fetchWallets();
  }, [fetchWallets, user?.token?.length, wallets?.length]);

  const walletsAreVerified = useMemo(() => wallets.length === 2, [wallets]);

  return { wallets, walletsAreVerified, fetchWallets };
};
