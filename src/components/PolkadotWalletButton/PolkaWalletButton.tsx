import React, { memo, useCallback } from 'react';
import { Button } from '@/components/common/Button';
import { Image, Spinner } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { WalletsInfo } from '@/components/WalletInfo/WalletInfo';
import { Loader } from '@/components/common/Loader/Loader';
import { usePolkadotExtension } from '@/hooks/usePolkadotExtension';
import { PolkaWalletsPopup } from '@/components/PolkadotWalletButton/components/PolkaWalletsPopup';
import {
  convertSS58Address,
  formatPolkaBalance,
  POLKA_ADDRESS_PREFIX,
} from '@/utils/wallets';

interface PolkadotWalletButtonProps {
  isVerify?: boolean;
}

export const PolkadotWalletButton = memo(
  ({ isVerify }: PolkadotWalletButtonProps) => {
    const {
      disconnect,
      dotBalance,
      address,
      connectedWallet,
      isConnected,
      isLoading,
    } = usePolkadotExtension();

    const {
      isOpen: isPopupOpen,
      onOpen: onPopupOpen,
      onClose: onPopupClose,
    } = useDisclosure();
    const {
      isOpen: isInfoOpen,
      onOpen: onInfoOpen,
      onClose: onInfoClose,
    } = useDisclosure();

    const onDisconnect = useCallback(async () => {
      await disconnect();
      onInfoClose();
    }, [disconnect, onInfoClose]);

    const formattedBalance = formatPolkaBalance(dotBalance);

    return (
      <>
        {isConnected && (
          <Button
            onClick={onInfoOpen}
            variant="transparent"
            width="auto"
            minWidth="120px"
            flexShrink={0}
            flexGrow={0}
            iconPlacement="left"
            iconGap="10px"
            fontSize="16px"
            padding="0"
            icon={
              <Image
                src="/images/polkadot-logo.svg"
                alt="Polkapad"
                width="29px"
                height="29px"
                borderRadius="50%"
              />
            }
          >
            {formattedBalance ? (
              `${formattedBalance} DOT`
            ) : (
              <Spinner width="24px" height="24px" />
            )}
          </Button>
        )}
        {!isConnected && !isVerify && (
          <Button
            onClick={onPopupOpen}
            variant="transparent"
            width="auto"
            minWidth="120px"
            flexShrink={0}
            flexGrow={0}
            iconGap="10px"
            fontSize="16px"
            disabled={isLoading}
            iconPlacement="left"
            padding="0"
            icon={
              <Image
                src="/images/polkadot-logo.svg"
                alt="Polkapad"
                width="29px"
                height="29px"
                borderRadius="50%"
              />
            }
          >
            {isLoading ? <Loader width="29px" height="29px" /> : 'Connect'}
          </Button>
        )}
        {!isConnected && isVerify && (
          <Button
            height="36px"
            variant="primary"
            onClick={onPopupOpen}
            isLoading={isLoading}
          >
            Connect
          </Button>
        )}
        <PolkaWalletsPopup isOpen={isPopupOpen} onClose={onPopupClose} />
        {address && dotBalance && connectedWallet?.title && (
          <WalletsInfo
            isPolka
            account={convertSS58Address(address, POLKA_ADDRESS_PREFIX.POLKA)}
            balance={formattedBalance}
            walletName={connectedWallet?.title}
            walletIcon={connectedWallet?.icon}
            onDisconnect={onDisconnect}
            isOpen={isInfoOpen}
            onClose={onInfoClose}
          />
        )}
      </>
    );
  },
);
