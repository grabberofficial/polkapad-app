import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '@/pages/api/user';
import { API_USER_ROUTE } from '@/constants/routes';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>(API_USER_ROUTE);
  const router = useRouter();

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

  return { user, mutateUser };
}
