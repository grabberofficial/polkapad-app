import { useCallback, useEffect, useRef, useState } from 'react';
import { KYCStatus, KycStatusTypes } from '@/pages/api/kycStatus';
import fetchJson from '@/services/fetchJson';
import { User } from '@/pages/api/user';
import { API_KYC_STATUS_ROUTE } from '@/constants/routes';

const KYC_STATUS_POLL_INTERVAL = 3000;

export const useKYCStatus = (user?: User) => {
  const [KYCStatus, setKYCStatus] = useState<KycStatusTypes | null | undefined>(
    user?.kycStatus,
  );
  const intervalID = useRef<NodeJS.Timer | null>(null);

  const isKYCAccepted = KYCStatus === KycStatusTypes.ACCEPTED;
  const isKYCBlocked = KYCStatus === KycStatusTypes.BLOCKED;
  const isKYCDeclined = KYCStatus === KycStatusTypes.DECLINED;
  const isKYCNotVerified = KYCStatus === KycStatusTypes.NOT_VERIFIED;
  const isKYCInProgress = KYCStatus === KycStatusTypes.IN_PROGRESS;

  const getKycStatus = useCallback(async () => {
    const newStatus: KYCStatus = await fetchJson(API_KYC_STATUS_ROUTE);

    if (newStatus.kycStatus !== KYCStatus) {
      newStatus.kycStatus;
    }
  }, [KYCStatus]);

  // Init
  useEffect(() => {
    if (!KYCStatus && user?.kycStatus) {
      user.kycStatus;
    }
  }, [getKycStatus, KYCStatus, user?.kycStatus]);

  useEffect(() => {
    if (KYCStatus === KycStatusTypes.IN_PROGRESS && !intervalID.current) {
      intervalID.current = setInterval(getKycStatus, KYC_STATUS_POLL_INTERVAL);
    }

    if (KYCStatus !== KycStatusTypes.IN_PROGRESS && intervalID.current) {
      clearInterval(intervalID.current);
      intervalID.current = null;
    }
  }, [getKycStatus, KYCStatus]);

  useEffect(() => {
    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current);
        intervalID.current = null;
      }
    };
  }, []);

  return {
    isKYCAccepted,
    isKYCBlocked,
    isKYCDeclined,
    isKYCNotVerified,
    isKYCInProgress,
    setKYCStatus,
  };
};
