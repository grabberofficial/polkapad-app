import { useCallback } from 'react';

import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletPopupItem } from '@/components/WalletsPopup/components/WalletPopupItem';
import { usePolkadotExtension } from '@/shared/hooks/usePolkadotExtension';
import { POLKADOT_WALLET, TALISMAN_WALLET } from '@/constants/wallets';

interface PolkaWalletsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolkaWalletsPopup = ({
  isOpen,
  onClose,
}: PolkaWalletsPopupProps) => {
  const { connectPolkadot, isTalismanInstalled, isPolkadotInstalled } =
    usePolkadotExtension();

  const onPolkaConnect = useCallback(() => {
    if (isPolkadotInstalled) {
      connectPolkadot(POLKADOT_WALLET.extensionName);
    } else {
      window.open(POLKADOT_WALLET.installUrl);
    }
    onClose();
  }, [connectPolkadot, isPolkadotInstalled, onClose]);

  const onTalismanConnect = useCallback(() => {
    if (isTalismanInstalled) {
      connectPolkadot(TALISMAN_WALLET.extensionName);
    } else {
      window.open(TALISMAN_WALLET.installUrl);
    }
    onClose();
  }, [connectPolkadot, isTalismanInstalled, onClose]);

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
        isComingSoon
        text="Subwallet"
        icon="/images/subwallet_icon.png"
      />
      <WalletPopupItem
        isComingSoon
        text="Clover"
        icon="/images/clover_icon.svg"
      />
    </WalletsPopup>
  );
};
