import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { useEffect, useState } from 'react';

export const useWalletConnect = () => {
  const [walletConnect, setWalletConnect] = useState<WalletConnect | null>(
    null,
  );

  useEffect(() => {
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal: QRCodeModal,
    });

    setWalletConnect(connector);

    if (!connector.connected) {
      connector.createSession();
    }

    connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.info(accounts, '[accounts]');
      console.info(chainId, '[chainId]');
    });

    connector.on('session_update', (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      console.info(accounts, '[accounts]');
      console.info(chainId, '[chainId]');
    });

    connector.on('disconnect', (error) => {
      if (error) {
        throw error;
      }

      // Delete connector
    });

    return () => {
      walletConnect?.killSession();
    };
  }, []);

  return { walletConnect };
};
