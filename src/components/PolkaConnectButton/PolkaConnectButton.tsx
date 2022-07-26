import React, { useCallback, useContext } from 'react';
import { UserContext } from '@/shared/providers/userContext';
import { Button } from '@/components/Button';
import { Image } from '@chakra-ui/react';
import { formatUnits } from '@ethersproject/units';
import { useSubstrate } from '@/shared/providers/substrate';
import { useDisclosure } from '@chakra-ui/hooks';
import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';
import { WalletsInfo } from '@/components/WalletInfo/WalletInfo';
import {
  convertSS58Address,
  POLKA_ADDRESS_PREFIX,
} from '@/shared/utils/convertSS58Address';
import { Loader } from '@/components/Loader/Loader';

export const PolkaConnentBtn = () => {
  const { polka } = useContext(UserContext);
  const { account, balance, keyringState, disconnect } = useSubstrate();
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

  const hasData = balance || (polka?.address && polka?.balance);
  const formattedBalance = balance && formatUnits(balance, 12);

  const onDisconnect = useCallback(async () => {
    await disconnect();
    onInfoClose();
  }, [disconnect, onInfoClose]);

  return (
    <>
      {hasData && (
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
          {formattedBalance ? (
            `${formattedBalance} DOT`
          ) : (
            <Loader width="32px" height="32px" />
          )}
        </Button>
      )}
      {!hasData && (
        <Button
          onClick={onPopupOpen}
          disabled={keyringState !== 'READY'}
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
      <WalletsPopup isPolka isOpen={isPopupOpen} onClose={onPopupClose} />
      {account && (
        <WalletsInfo
          isPolka
          account={convertSS58Address(account, POLKA_ADDRESS_PREFIX.POLKA)}
          balance={formattedBalance}
          walletName="Polkadot.js"
          onDisconnect={onDisconnect}
          isOpen={isInfoOpen}
          onClose={onInfoClose}
        />
      )}
    </>
  );
};
