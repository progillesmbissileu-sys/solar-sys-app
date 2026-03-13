'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { buildRoute } from './utils';

export function useNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse query into object
  const urlQuery = (): Record<string, string> => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };

  const navigate = (
    route: string,
    routeParams: Record<string, any> = {},
    withoutHash?: boolean
  ) => {
    const hash = !withoutHash ? globalThis?.location?.hash || '' : '';

    // Replace path params like /user/:id
    const path = Object.keys(routeParams).reduce((acc, key) => {
      return acc.replace(`:${key}`, routeParams[key]);
    }, route);

    // const backUrl = encodeURIComponent(pathname)
    const url = `${path}${hash}`;

    router.push(url);
  };

  const queryNavigate = (queries: Record<string, string> = {}) => {
    const path = buildRoute(pathname, {}, queries);
    const hash = globalThis?.location?.hash || '';
    router.push(hash ? `${path}${hash}` : path);
  };

  const goBack = () => {
    const backUrl = searchParams.get('backUrl');
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  const isActive = (route: string) => {
    return pathname === route;
  };

  return {
    hash: globalThis?.location?.hash?.replace('#', '') || '',
    params: searchParams,
    path: pathname,
    navigate,
    queryNavigate,
    goBack,
    isActive,
    urlQuery,
  };
}
