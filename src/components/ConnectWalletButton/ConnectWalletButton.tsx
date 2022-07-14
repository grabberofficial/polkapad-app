import { FC } from 'react';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { ChainId } from '@usedapp/core';
import { Button } from '@/components/Button';
import { Image } from '@chakra-ui/react';
import { WalletsPopup } from './components/WalletsPopup/WalletsPopup';
import { useDisclosure } from '@chakra-ui/hooks';
import { WalletsInfo } from '@/components/ConnectWalletButton/components/WalletInfo/WalletInfo';
import bscIcon from '@/assets/bsc_icon.svg';
import { Loader } from '@/components/Loader/Loader';

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

  const { dotBalance, connected, account, chainId, switchToBSC } =
    useConnectBSC();

  const isWrongNetwork = chainId !== ChainId.BSC;

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
          {dotBalance ? (
            `${dotBalance} DOT`
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
      <WalletsInfo isOpen={isInfoOpen} onClose={onInfoClose} />
    </>
  );
};
