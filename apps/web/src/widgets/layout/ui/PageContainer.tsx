import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import { APP_ROUTES } from '@/shared/config/app-routes';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <header className="h-14 w-full content-center border-t border-gray-200 bg-gray-100">
        <nav className="container flex items-center">
          <div className="">
            <Link href="/" className="text-md text-dark">
              Acceuil
            </Link>
          </div>
          <ChevronRight size={16} />
          <div className="text-dark/60 flex items-center">
            <a href={APP_ROUTES.IN_STORE} className="text-md">
              Boutique
            </a>
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </Fragment>
  );
};
