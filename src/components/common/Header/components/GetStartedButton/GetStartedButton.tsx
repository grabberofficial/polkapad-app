import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/common/Button';
import { AUTH_EMAIL_ROUTE } from '@/constants/routes';

export const GetStartedButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="primary"
      width="140px"
      borderRadius="100px"
      flexGrow={0}
      onClick={() => router.push(AUTH_EMAIL_ROUTE)}
    >
      Get started
    </Button>
  );
};
