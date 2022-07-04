import { createContext, Dispatch, SetStateAction } from 'react';
import { useKYCStatus } from '@/components/pages/Profile/components/KYCProvider/hooks/useKYCStatus';
import useUser from '@/lib/hooks/useUser';
import { KycStatusTypes } from '@/pages/api/kycStatus';

export type KYCContextType = {
  isKYCAccepted: boolean;
  isKYCNotVerified: boolean;
  isKYCInProgress: boolean;
  isKYCDeclined: boolean;
  isKYCBlocked: boolean;
  setKYCStatus: Dispatch<SetStateAction<KycStatusTypes | null | undefined>>;
};

export const KYCContext = createContext<KYCContextType>({
  isKYCAccepted: false,
  isKYCNotVerified: false,
  isKYCInProgress: false,
  isKYCDeclined: false,
  isKYCBlocked: false,
  setKYCStatus: () => null,
});

interface KYCProviderProps {
  children: React.ReactNode;
}

export const KYCProvider = ({ children }: KYCProviderProps) => {
  const { user } = useUser({
    redirectTo: '/auth/login',
  });
  const kycStatus = useKYCStatus(user);

  return (
    <KYCContext.Provider value={kycStatus}>{children}</KYCContext.Provider>
  );
};
