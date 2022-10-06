import { useCallback, useEffect, useRef, useState } from 'react';
import fetchJson from '@/services/fetchJson';
import { API_KYC_STATUS_ROUTE } from '@/constants/routes';
import { User } from '@/hooks/useUser';

const KYC_STATUS_POLL_INTERVAL = 3000;

export enum KycStatusTypes {
  NOT_VERIFIED = 'NOT_VERIFIED',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  BLOCKED = 'BLOCKED',
}

export type KYCStatus = KycStatusTypes | null;

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

    if (newStatus !== KYCStatus) {
      newStatus;
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
