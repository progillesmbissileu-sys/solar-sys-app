'use server';

import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui';
import { CreatePackPayload, createProductPack } from '@/entities/product';
import { revalidatePath } from 'next/cache';

export const createProductPackAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<CreatePackPayload>(formData, ['id']);

  const resp = await createProductPack(payload);

  console.log({ payload }, { resp });

  resp.success && revalidatePath(routePaths.PRODUCTS_PACKAGES);

  return resp;
};
