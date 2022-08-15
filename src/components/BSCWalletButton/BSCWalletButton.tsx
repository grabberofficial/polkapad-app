import { useCallback, useEffect } from 'react';
import bscIcon from '@/assets/bsc_icon.svg';
import { Button } from '@/components/common/Button';
import { WalletsInfo } from '@/components/WalletInfo/WalletInfo';
import { Loader } from '@/components/common/Loader/Loader';
import { useConnectBSC } from '@/hooks/useConnectBSC';
import { isProduction } from '@/utils/general';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex, Image } from '@chakra-ui/react';
import { ChainId } from '@usedapp/core';
import { ChangeWalletConnectNetwork } from '@/components/BSCWalletButton/components/ChangeWalletConnectNetwork/ChangeWalletConnectNetwork';
import { BSCWalletsPopup } from '@/components/BSCWalletButton/components/BSCWalletsPopup/BSCWalletsPopup';
import { formatEtherBalance } from '@/utils/wallets';
import { WALLET_CONNECT } from '@/constants/wallets';

interface BSCWalletButtonProps {
  isVerify?: boolean;
}

export const BSCWalletButton = ({ isVerify }: BSCWalletButtonProps) => {
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
    isOpen: isChangeNetworkOpen,
    onOpen: onChangeNetworkOpen,
    onClose: onChangeNetworkClose,
  } = useDisclosure();

  const {
    dotBalance,
    connected,
    account,
    chainId,
    disconnectFromBSC,
    switchToBSC,
    connectedWallet,
    isLoading,
  } = useConnectBSC();

  const network = isProduction ? ChainId.BSC : ChainId.BSCTestnet;
  const isWrongNetwork = chainId !== network;
  const formattedBalance = formatEtherBalance(dotBalance);

  const onDisconnect = useCallback(() => {
    disconnectFromBSC();
    onInfoClose();
  }, [disconnectFromBSC, onInfoClose]);

  const onChangeNetwork = useCallback(() => {
    if (connectedWallet === WALLET_CONNECT) {
      onChangeNetworkOpen();
    } else {
      switchToBSC();
    }
  }, [onChangeNetworkOpen, switchToBSC, connectedWallet]);

  useEffect(() => {
    if (!isWrongNetwork && isChangeNetworkOpen) {
      onChangeNetworkClose();
    }
  }, [isChangeNetworkOpen, isWrongNetwork, onChangeNetworkClose]);

  return (
    <>
      {connected && account && !isWrongNetwork && (
        <Button
          onClick={onInfoOpen}
          variant="secondary"
          width="auto"
          minWidth="150px"
          padding="0px 16px"
          iconGap="10px"
          iconPlacement="left"
          icon={<Image src={bscIcon} alt="BSC" width="29px" height="29px" />}
        >
          {formattedBalance ? (
            `${formattedBalance} DOT`
          ) : (
            <Flex width="80px" justifyContent="center">
              <Loader width="28px" height="28px" />
            </Flex>
          )}
        </Button>
      )}
      {connected && account && isWrongNetwork && (
        <Button
          onClick={onChangeNetwork}
          variant="secondary"
          width="auto"
          minWidth="150px"
          flexShrink={0}
          iconGap="10px"
          color="error"
          padding="0 16px"
          iconPlacement="left"
          icon={<Image src={bscIcon} alt="BSC" width="29px" height="29px" />}
        >
          Wrong network
        </Button>
      )}
      {!account && !isVerify && (
        <Button
          onClick={onPopupOpen}
          variant="secondary"
          width="auto"
          minWidth="150px"
          flexShrink={0}
          iconGap="10px"
          iconPlacement="left"
          padding="0 16px"
          icon={<Image src={bscIcon} alt="BSC" width="29px" height="29px" />}
        >
          Connect
        </Button>
      )}
      {!account && isVerify && (
        <Button
          height="36px"
          variant="primary"
          onClick={onPopupOpen}
          isLoading={isLoading}
        >
          Connect
        </Button>
      )}
      <BSCWalletsPopup isOpen={isPopupOpen} onClose={onPopupClose} />
      {account && formattedBalance && (
        <WalletsInfo
          isOpen={isInfoOpen}
          account={account}
          walletName={connectedWallet.title}
          walletIcon={connectedWallet.icon}
          balance={formattedBalance}
          onClose={onInfoClose}
          onDisconnect={onDisconnect}
        />
      )}
      <ChangeWalletConnectNetwork
        isOpen={isChangeNetworkOpen}
        onClose={onChangeNetworkClose}
      />
    </>
  );
};
