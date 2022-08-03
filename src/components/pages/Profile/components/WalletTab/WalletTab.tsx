import { Flex } from '@chakra-ui/react';
import { Button } from '@/components/Button';
import useUser from '@/hooks/useUser';
import { Dispatch, SetStateAction, useContext } from 'react';
import { WalletsContext } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import { KYCContext } from '@/components/pages/Profile/components/KYCProvider/KYCProvider';
import { LOGIN_ROUTE } from '@/constants/routes';

import WalletCard from './components/WalletCard/WalletCard';

interface WalletTabProps {
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

export const WalletTab = ({ setSelectedTab }: WalletTabProps) => {
  const { user } = useUser({
    redirectTo: LOGIN_ROUTE,
  });
  const { wallets, walletsAreVerified, fetchWallets } =
    useContext(WalletsContext);
  const { isKYCAccepted } = useContext(KYCContext);

  return (
    <Flex
      paddingBottom="100px"
      width={['100%', '100%', '100%', '100%', '466px']}
      flexDirection="column"
      key="wallet"
      alignItems="flex-end"
    >
      <WalletCard type="eth" wallets={wallets} verifyCallback={fetchWallets} />
      <WalletCard
        type="polka"
        wallets={wallets}
        verifyCallback={fetchWallets}
      />
      {user && !isKYCAccepted && (
        <Button
          width="120px"
          marginTop="20px"
          variant="primary"
          onClick={() => setSelectedTab(2)}
          disabled={!walletsAreVerified}
        >
          Start KYC
        </Button>
      )}
    </Flex>
  );
};
