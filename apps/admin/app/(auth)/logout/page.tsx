'use client';

import { routePaths } from '@/shared/routes';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    (async () => {
      let canRedirect = false;

      try {
        let response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/session/logout`, {
          method: 'DELETE',
        });

        console.log(response);

        canRedirect = !!response.ok;
      } catch (error) {
        console.error(error);
      }

      // if (canRedirect) {
      redirect(routePaths.LOGIN);
      // }
    })();
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center text-white">Logout ...</div>
  );
}
