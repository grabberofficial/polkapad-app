import fetchJson from '@/services/fetchJson';
import { serviceUrl } from '@/config/env';
import { User } from '@/pages/api/user';

type NetworkType = 'bsc' | 'polka';

export async function sendWalletLogs(
  name: string,
  network: NetworkType,
  address?: string,
  user?: User,
) {
  try {
    if (address && user?.token) {
      await fetchJson(
        `https://${serviceUrl}/wallet-logs`,
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            network,
            address,
          }),
        },
        user.token,
      );
    }
  } catch (e) {
    console.error(e);
  }
}
