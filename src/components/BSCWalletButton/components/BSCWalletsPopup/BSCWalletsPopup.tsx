import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { BSCProvider, useConnectBSC } from '@/shared/hooks/useConnectBSC';

interface BSCWalletsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BSCWalletsPopup = ({ isOpen, onClose }: BSCWalletsPopupProps) => {
  const isMetamaskAvailable = !!window.ethereum;
  const { connectToBSC } = useConnectBSC();

  const onMetamaskConnect = useCallback(() => {
    connectToBSC(BSCProvider.METAMASK);
    onClose();
  }, [connectToBSC, onClose]);

  const onWalletConnect = useCallback(() => {
    connectToBSC(BSCProvider.WALLETCONNECT);
    onClose();
  }, [connectToBSC, onClose]);

  return (
    <WalletsPopup
      title="Connect an EVM Wallet"
      isOpen={isOpen}
      onClose={onClose}
    >
      <WalletPopupItem
        text={isMetamaskAvailable ? 'Metamask' : 'Install Metamask'}
        icon="/images/metamask.svg"
        onClick={onMetamaskConnect}
      />
      <WalletPopupItem
        onClick={onWalletConnect}
        text="Wallet connect"
        icon="/images/wallet_connect.svg"
      />
      <WalletPopupItem
        isComingSoon
        text="Binance Wallet"
        icon="/images/icon_bsc.png"
      />
      <WalletPopupItem
        isComingSoon
        text="Fortmatic"
        icon="/images/fortmatic.png"
      />
    </WalletsPopup>
  );
};
