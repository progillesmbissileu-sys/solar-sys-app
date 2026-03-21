'use client';

import { TriangleAlert, XCircle } from 'lucide-react';
import Link from 'next/link';

import { routePaths } from '@/shared/routes';

export const FailedRequestDisplay = ({ status }: { status: number }) => {
  switch (status) {
    case 401:
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <div className="flex items-center justify-center gap-x-1.5">
            <XCircle />
            <span className="text-lg capitalize">Votre session a expirée</span>
          </div>
          <Link href={routePaths.LOGOUT}>
            <button className="rounded-md border border-gray-300 px-6 py-2">Se conneter</button>
          </Link>
        </div>
      );
    case 403:
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <div className="flex items-center justify-center gap-x-1.5">
            <XCircle />
            <span className="text-lg capitalize">
              Vous n'avez pas la permission d'accéder à cette ressource
            </span>
          </div>
        </div>
      );
    case 404:
      return (
        <div className="flex h-full w-full items-center justify-center gap-x-1.5">
          <TriangleAlert />
          <span className="text-lg capitalize">Ressource non trouvée</span>
        </div>
      );
    default:
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <div className="flex items-center justify-center gap-x-1.5">
            <TriangleAlert />
            <span className="text-lg capitalize">Une erreur est survenue</span>
          </div>
          <button
            className="rounded-md border border-gray-300 px-6 py-2"
            onClick={() => window.location.reload()}
          >
            Essayer de nouveau
          </button>
        </div>
      );
  }
};
