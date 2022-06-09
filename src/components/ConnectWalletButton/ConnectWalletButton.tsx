import React from 'react';
import { useConnectBSC } from '@/shared/hooks/useConnectBSC';
import { ChainId } from '@usedapp/core';
import { Button } from '@/components/Button';

export const ConnectWalletButton: React.FC = () => {
  const {
    connenctToBSC,
    dotBalance,
    ksmBalance,
    connected,
    account,
    chainId,
    switchToBSC,
  } = useConnectBSC();

  const isWrongNetwork = chainId !== ChainId.BSC;

  return (
    <>
      {connected && account && !isWrongNetwork && (
        <Button variant="secondary" fixedWidth={220} padding={'0px 32px'}>
          {`${dotBalance} DOT | ${ksmBalance} KSM`}
        </Button>
      )}
      {connected && account && isWrongNetwork && (
        <Button
          onClick={switchToBSC}
          variant="secondary"
          fixedWidth={220}
          color="#EC305D"
        >
          Wrong network
        </Button>
      )}
      {!account && (
        <Button onClick={connenctToBSC} variant="secondary" fixedWidth={220}>
          Connect BSC
        </Button>
      )}
    </>
  );
};
