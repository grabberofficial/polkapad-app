import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { API_USER_ROUTE } from '@/constants/routes';
import fetchJson from '@/services/fetchJson';
import { KycStatusTypes } from '@/components/pages/Profile/components/KYCProvider/hooks/useKYCStatus';

export type User = {
  isLoggedIn: boolean;
  email: string;
  id: string;
  name: string;
  token: string;
  kycStatus: KycStatusTypes | null;
};

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const {
    data,
    error,
    mutate: mutateUser,
  } = useSWR<User>(API_USER_ROUTE, fetchJson, { refreshInterval: 0 });
  const router = useRouter();

  const isLoading = !data && !error;

  const user = useMemo(() => {
    return (
      data && {
        ...data,
        isLoggedIn: true,
      }
    );
  }, [data]);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo.length) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo.length > 0 &&
        !redirectIfFound &&
        (!user?.isLoggedIn || user === undefined)) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, router]);

  return { user, mutateUser, isLoading };
}
