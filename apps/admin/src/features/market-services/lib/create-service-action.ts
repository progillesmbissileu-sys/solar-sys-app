'use server';

import { deleteImageMediaAction, uploadImageAction } from '@/shared/lib';
import { CreateMarketServicePayload } from '@/entities/market-service';
import { marketServiceCreate } from '@/entities/market-service';
import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';
import { createServiceSchema } from '../model/form-schemas';
import z from 'zod';

export async function createServiceAction(payload: z.infer<typeof createServiceSchema>) {
  const thumbnail = payload.thumbnail;

  const imageUploadObject = new FormData();
  imageUploadObject.append('image', thumbnail[0]);
  imageUploadObject.append('alt', payload.thumbnailAlt);

  const uploadResponse = await uploadImageAction(imageUploadObject);

  if (uploadResponse) {
    const servicePayload: CreateMarketServicePayload = {
      thumbnailId: uploadResponse.id,
      designation: payload.designation,
      contentDescription: payload.contentDescription,
      shortDescription: payload.shortDescription,
      features: payload.features,
    };

    const response = await marketServiceCreate(servicePayload);

    response.success
      ? revalidatePath(routePaths.MARKET_SERVICES)
      : await deleteImageMediaAction(servicePayload.thumbnailId);
    return response;
  }

  return { success: false };
}
