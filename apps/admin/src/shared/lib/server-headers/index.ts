import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const getServerPathname = async (headers: Promise<ReadonlyHeaders>) => {
  return (await headers).get('x-pathname') ?? '';
};
