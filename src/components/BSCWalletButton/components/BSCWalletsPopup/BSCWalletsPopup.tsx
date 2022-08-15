import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { useConnectBSC } from '@/hooks/useConnectBSC';
import {
  BINANCE_WALLET,
  CLOVER_WALLET,
  METAMASK_INSTALL_URL,
  TALISMAN_WALLET,
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
      window.open(METAMASK_INSTALL_URL);
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
      title="Connect an EVM Wallet"
      isOpen={isOpen}
      onClose={onClose}
    >
      <WalletPopupItem
        text={isMetamaskInstalled ? 'Metamask' : 'Install Metamask'}
        icon="/images/metamask.svg"
        onClick={onMetamaskConnect}
      />
      {isOtherEvmWalletInstalled && (
        <WalletPopupItem
          text="Your Ethereum Wallet"
          icon="/images/smart_chain.svg"
          onClick={onInjectedConnect}
        />
      )}
      <WalletPopupItem
        text={isTalismanInstalled ? 'Talisman' : 'Install Talisman'}
        icon="/images/talisman_icon.svg"
        onClick={onTalismanConnect}
      />
      <WalletPopupItem
        text={isCloverInstalled ? 'Clover' : 'Install Clover'}
        icon="/images/clv_icon.svg"
        onClick={onCloverConnect}
      />
      <WalletPopupItem
        text="Wallet connect"
        icon="/images/wallet_connect.svg"
        onClick={onWalletConnect}
      />
      <WalletPopupItem
        text={
          isBinanceWalletInstalled ? 'Binance Wallet' : 'Install Binance Wallet'
        }
        icon="/images/icon_bsc.png"
        onClick={onBinanceWalletConnect}
      />
      <WalletPopupItem
        isComingSoon
        text="Fortmatic"
        icon="/images/fortmatic.png"
      />
    </WalletsPopup>
  );
};
