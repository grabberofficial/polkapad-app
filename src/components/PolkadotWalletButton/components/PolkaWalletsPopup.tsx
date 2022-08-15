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
        icon={POLKADOT_WALLET.icon}
        onClick={onPolkaConnect}
      />
      <WalletPopupItem
        text={isTalismanInstalled ? 'Talisman' : 'Install Talisman'}
        icon={TALISMAN_WALLET.icon}
        onClick={onTalismanConnect}
      />
      <WalletPopupItem
        text={isSubwalletInstalled ? 'Subwallet' : 'Install Subwallet'}
        icon={SUB_WALLET.icon}
        onClick={onSubwalletConnect}
      />
      <WalletPopupItem
        text={isCloverInstalled ? 'Clover' : 'Install Clover'}
        icon={CLOVER_WALLET.icon}
        onClick={onCloverConnect}
      />
    </WalletsPopup>
  );
};
