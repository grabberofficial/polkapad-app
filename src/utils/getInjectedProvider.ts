import detectEthereumProvider from '@metamask/detect-provider';
import { providers } from 'ethers';

export const isWebSocketProvider = (provider: any) => {
  return (
    provider instanceof providers.WebSocketProvider || !!provider._websocket
  ); // Could be a different instance of ethers.
};

export async function getInjectedProvider() {
  const injectedProviders: any[] = (window?.ethereum as any).providers || [];
  const injectedProvider: any =
    injectedProviders.find((provider) => {
      return provider.isMetaMask ?? false;
    }) ?? (await detectEthereumProvider());

  if (!injectedProvider) {
    return undefined;
  }

  const provider = new providers.Web3Provider(injectedProvider, 'any');
  if (!isWebSocketProvider(provider)) {
    provider.pollingInterval = 15000;
  }
  return provider;
}
