import React, { memo, useCallback } from 'react';
import { Button } from '@/components/Button';
import { Image } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { WalletsInfo } from '@/components/WalletInfo/WalletInfo';
import {
  convertSS58Address,
  POLKA_ADDRESS_PREFIX,
} from '@/shared/utils/convertSS58Address';
import { Loader } from '@/components/Loader/Loader';
import { usePolkadotExtension } from '@/shared/hooks/usePolkadotExtension';
import { PolkaWalletsPopup } from '@/components/PolkaConnectButton/components/PolkaWalletsPopup';

export const PolkaConnectBtn = memo(() => {
  const { disconnect, dotBalance, address, isConnected } =
    usePolkadotExtension();

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

  return (
    <>
      {isConnected && dotBalance ? (
        <Button
          onClick={onInfoOpen}
          variant="secondary"
          width="auto"
          minWidth="150px"
          flexShrink={0}
          flexGrow={0}
          iconPlacement="left"
          iconGap="10px"
          padding="0 16px"
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
          {dotBalance ? (
            `${dotBalance} DOT`
          ) : (
            <Loader width="32px" height="32px" />
          )}
        </Button>
      ) : (
        <Button
          onClick={onPopupOpen}
          variant="secondary"
          width="auto"
          minWidth="150px"
          flexShrink={0}
          flexGrow={0}
          iconGap="10px"
          iconPlacement="left"
          padding="0 16px"
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
          Connect
        </Button>
      )}
      <PolkaWalletsPopup isOpen={isPopupOpen} onClose={onPopupClose} />
      {address && dotBalance && (
        <WalletsInfo
          isPolka
          account={convertSS58Address(address, POLKA_ADDRESS_PREFIX.POLKA)}
          balance={dotBalance}
          walletName="Polkadot.js"
          onDisconnect={onDisconnect}
          isOpen={isInfoOpen}
          onClose={onInfoClose}
        />
      )}
    </>
  );
});
