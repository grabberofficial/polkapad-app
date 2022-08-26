import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { useConnectBSC } from '@/hooks/useConnectBSC';
import {
  BINANCE_WALLET,
  CLOVER_WALLET,
  METAMASK,
  TALISMAN_WALLET,
  UNKNOWN_INJECTED_WALLET,
  WALLET_CONNECT,
} from '@/constants/wallets';

interface BSCWalletsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BSCWalletsPopup = ({ isOpen, onClose }: BSCWalletsPopupProps) => {
  const {
    connectInjected,
    connectWC,
    connectExtension,
    isMetamaskInstalled,
    isTalismanInstalled,
    isCloverInstalled,
    isBinanceWalletInstalled,
    isOtherEvmWalletInstalled,
  } = useConnectBSC();

  const onMetamaskConnect = useCallback(() => {
    if (isMetamaskInstalled) {
      connectInjected();
    } else {
      window.open(METAMASK.installUrl);
    }
    onClose();
  }, [connectInjected, isMetamaskInstalled, onClose]);

  const onInjectedConnect = useCallback(() => {
    connectInjected();
    onClose();
  }, [connectInjected, onClose]);

  const onTalismanConnect = useCallback(() => {
    connectExtension(TALISMAN_WALLET);
    onClose();
  }, [connectExtension, onClose]);

  const onCloverConnect = useCallback(() => {
    connectExtension(CLOVER_WALLET);
    onClose();
  }, [connectExtension, onClose]);

  const onBinanceWalletConnect = useCallback(() => {
    connectExtension(BINANCE_WALLET);
    onClose();
  }, [connectExtension, onClose]);

  const onWalletConnect = useCallback(() => {
    connectWC();
    onClose();
  }, [connectWC, onClose]);

  return (
    <WalletsPopup
      title="Connect an Ethereum Wallet"
      isOpen={isOpen}
      onClose={onClose}
    >
      {isOtherEvmWalletInstalled && (
        <WalletPopupItem
          text="Your Ethereum Wallet"
          icon={UNKNOWN_INJECTED_WALLET.icon}
          onClick={onInjectedConnect}
        />
      )}
      <WalletPopupItem
        text={isMetamaskInstalled ? 'Metamask' : 'Install Metamask'}
        icon={METAMASK.icon}
        onClick={onMetamaskConnect}
      />
      <WalletPopupItem
        text={isTalismanInstalled ? 'Talisman' : 'Install Talisman'}
        icon={TALISMAN_WALLET.icon}
        onClick={onTalismanConnect}
      />
      <WalletPopupItem
        text={isCloverInstalled ? 'Clover' : 'Install Clover'}
        icon={CLOVER_WALLET.icon}
        onClick={onCloverConnect}
      />
      <WalletPopupItem
        text={
          isBinanceWalletInstalled ? 'Binance Wallet' : 'Install Binance Wallet'
        }
        icon="/images/icon_bsc.png"
        onClick={onBinanceWalletConnect}
      />
      <WalletPopupItem
        text="Wallet connect"
        icon={WALLET_CONNECT.icon}
        onClick={onWalletConnect}
      />
      <WalletPopupItem
        isComingSoon
        text="Fortmatic"
        icon="/images/fortmatic.png"
      />
    </WalletsPopup>
  );
};
