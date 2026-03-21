'use client';

import { routePaths } from '@/shared/routes';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let canRedirect = false;

      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/session/logout`, {
          method: 'DELETE',
        });

        canRedirect = !!response.ok;
      } catch (error) {
        console.error(error);
      }

      if (canRedirect) {
        router.replace(routePaths.LOGIN);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center text-white">Logout ...</div>
  );
}
