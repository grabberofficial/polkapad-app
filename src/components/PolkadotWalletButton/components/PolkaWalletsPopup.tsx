import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { usePolkadotExtension } from '@/hooks/usePolkadotExtension';
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
    connectPolkadot(POLKADOT_WALLET);
    onClose();
  }, [connectPolkadot, onClose]);

  const onTalismanConnect = useCallback(() => {
    connectPolkadot(TALISMAN_WALLET);
    onClose();
  }, [connectPolkadot, onClose]);

  const onSubwalletConnect = useCallback(() => {
    connectPolkadot(SUB_WALLET);
    onClose();
  }, [connectPolkadot, onClose]);

  const onCloverConnect = useCallback(() => {
    connectPolkadot(CLOVER_WALLET);
    onClose();
  }, [connectPolkadot, onClose]);

  return (
    <WalletsPopup
      title="Connect a Polkadot wallet"
      isOpen={isOpen}
      onClose={onClose}
    >
      <WalletPopupItem
        text={isPolkadotInstalled ? 'Polkadot{.js}' : 'Install Polkadot{.js}'}
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
        icon="/images/clv_icon.svg"
        onClick={onCloverConnect}
      />
    </WalletsPopup>
  );
};
