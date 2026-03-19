'use server';

import { extractFormData } from '@/shared/ui';
import { deleteImageMediaAction, uploadImageAction } from '@/shared/api';
import { CreateMarketServicePayload } from '@/entities/market-service';
import { marketServiceCreate } from '@/entities/market-service';
import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { createServiceSchema } from '../model/form-schemas';

export async function createServiceAction(_prev: unknown, formData: FormData) {
  const _payload = extractFormData<z.infer<typeof createServiceSchema>>(formData);

  const thumbnail = formData.getAll('thumbnail') as File[] | null;
  const imageUploadObject = new FormData();

  if (thumbnail) {
    imageUploadObject.append('image', thumbnail[0]);
    imageUploadObject.append('alt', _payload['thumbnailAlt']);
  }


  const uploadResponse = await uploadImageAction(imageUploadObject);

  if (uploadResponse) {
    const servicePayload: CreateMarketServicePayload = {
      thumbnailId: uploadResponse.id,
      designation: _payload.designation,
      contentDescription: _payload.contentDescription,
      shortDescription: _payload.shortDescription,
      features: _payload.features,
    };

    const response = await marketServiceCreate(servicePayload);

    response.success
      ? revalidatePath(routePaths.MARKET_SERVICES)
      : await deleteImageMediaAction(servicePayload.thumbnailId);
    return response;
  }
}
