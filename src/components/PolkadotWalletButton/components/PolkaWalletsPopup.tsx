import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { usePolkadotExtension } from '@/shared/hooks/usePolkadotExtension';
import {
  CLOVER_WALLET,
  POLKADOT_WALLET,
  SUB_WALLET,
  TALISMAN_WALLET,
} from '@/constants/wallets';

interface PolkaWalletsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolkaWalletsPopup = ({
  isOpen,
  onClose,
}: PolkaWalletsPopupProps) => {
  const {
    connectPolkadot,
    isTalismanInstalled,
    isPolkadotInstalled,
    isSubwalletInstalled,
    isCloverInstalled,
  } = usePolkadotExtension();

  const onPolkaConnect = useCallback(() => {
    if (isPolkadotInstalled) {
      connectPolkadot(POLKADOT_WALLET);
    } else {
      window.open(POLKADOT_WALLET.installUrl);
    }
    onClose();
  }, [connectPolkadot, isPolkadotInstalled, onClose]);

  const onTalismanConnect = useCallback(() => {
    if (isTalismanInstalled) {
      connectPolkadot(TALISMAN_WALLET);
    } else {
      window.open(TALISMAN_WALLET.installUrl);
    }
    onClose();
  }, [connectPolkadot, isTalismanInstalled, onClose]);

  const onSubwalletConnect = useCallback(() => {
    if (isSubwalletInstalled) {
      connectPolkadot(SUB_WALLET);
    } else {
      window.open(SUB_WALLET.installUrl);
    }
    onClose();
  }, [connectPolkadot, isSubwalletInstalled, onClose]);

  const onCloverConnect = useCallback(() => {
    if (isCloverInstalled) {
      connectPolkadot(CLOVER_WALLET);
    } else {
      window.open(CLOVER_WALLET.installUrl);
    }
    onClose();
  }, [connectPolkadot, isCloverInstalled, onClose]);

  return (
    <WalletsPopup
      title="Connect a Polkadot wallet"
      isOpen={isOpen}
      onClose={onClose}
    >
      <WalletPopupItem
        text={isPolkadotInstalled ? 'Polkadot.js' : 'Install Polkadot.js'}
        icon="/images/polka_icon.svg"
        onClick={onPolkaConnect}
      />
      <WalletPopupItem
        text={isTalismanInstalled ? 'Talisman' : 'Install Talisman'}
        icon="/images/talisman_icon.svg"
        onClick={onTalismanConnect}
      />
      <WalletPopupItem
        text={isSubwalletInstalled ? 'Subwallet' : 'Install Subwallet'}
        icon="/images/subwallet_icon.svg"
        onClick={onSubwalletConnect}
      />
      <WalletPopupItem
        text={isCloverInstalled ? 'Clover' : 'Install Clover'}
        icon="/images/clover_icon.svg"
        onClick={onCloverConnect}
      />
    </WalletsPopup>
  );
};
