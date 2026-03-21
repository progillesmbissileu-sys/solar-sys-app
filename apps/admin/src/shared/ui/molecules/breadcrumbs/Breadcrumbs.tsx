'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { cx } from '@/shared/lib/utils';
import { useBreadcrumbs } from '@/widgets/container';

export function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs('page-header');

  return (
    <>
      <nav aria-label="Breadcrumb" className="ml-2">
        <ol role="list" className="flex items-center space-x-3 text-sm">
          {(breadcrumbs?.segments ?? []).map((segment, index) => (
            <React.Fragment key={index}>
              <li key={index} className="flex">
                <Link
                  href={segment.href as string}
                  className={cx(
                    'text-gray-500 transition dark:text-gray-400 hover:dark:text-gray-300',
                    {
                      'text-gray-900 hover:text-gray-900':
                        index === (breadcrumbs?.segments ?? []).length - 1,
                    }
                  )}
                >
                  {segment.label}
                </Link>
              </li>
              {index < (breadcrumbs?.segments ?? []).length - 1 && (
                <ChevronRight
                  className="size-4 shrink-0 text-gray-600 dark:text-gray-400"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  );
}
