import { FC, useCallback } from 'react';
import { formatEther } from 'ethers/lib/utils';
import bscIcon from '@/assets/bsc_icon.svg';
import { Button } from '@/components/Button';
import { WalletsInfo } from '@/components/WalletInfo/WalletInfo';
import { Loader } from '@/components/Loader/Loader';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { isProduction } from '@/shared/utils/general';
import { useDisclosure } from '@chakra-ui/hooks';
import { Image } from '@chakra-ui/react';
import { ChainId } from '@usedapp/core';
import { WalletsPopup } from '@/components/WalletsPopup/WalletsPopup';

export const ConnectWalletButton: FC = () => {
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

  const {
    dotBalance,
    connected,
    account,
    chainId,
    disconnectFromBSC,
    switchToBSC,
    walletName,
  } = useConnectBSC();

  const network = isProduction ? ChainId.BSC : ChainId.BSCTestnet;
  const isWrongNetwork = chainId !== network;
  const formattedBalance =
    dotBalance && parseFloat(formatEther(dotBalance)).toFixed(3);

  const onDisconnect = useCallback(() => {
    disconnectFromBSC();
    onInfoClose();
  }, [disconnectFromBSC, onInfoClose]);

  return (
    <>
      {connected && account && !isWrongNetwork && (
        <Button
          onClick={onInfoOpen}
          variant="secondary"
          width="auto"
          flexShrink={0}
          padding="0px 16px"
          iconPlacement="left"
          icon={
            <Image
              marginRight="5px"
              src={bscIcon}
              alt="BSC"
              width="29px"
              height="29px"
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
      {connected && account && isWrongNetwork && (
        <Button
          onClick={switchToBSC}
          variant="secondary"
          width="auto"
          flexShrink={0}
          color="error"
          padding="0 16px"
          iconPlacement="left"
          icon={<Image src={bscIcon} alt="BSC" width="29px" height="29px" />}
        >
          Wrong network
        </Button>
      )}
      {!account && (
        <Button
          onClick={onPopupOpen}
          variant="secondary"
          width="auto"
          flexShrink={0}
          iconPlacement="left"
          padding="0 16px"
          icon={<Image src={bscIcon} alt="BSC" width="29px" height="29px" />}
        >
          Connect
        </Button>
      )}
      <WalletsPopup isOpen={isPopupOpen} onClose={onPopupClose} />
      {account && formattedBalance && (
        <WalletsInfo
          isOpen={isInfoOpen}
          account={account}
          walletName={walletName}
          balance={formattedBalance}
          onClose={onInfoClose}
          onDisconnect={onDisconnect}
        />
      )}
    </>
  );
};
