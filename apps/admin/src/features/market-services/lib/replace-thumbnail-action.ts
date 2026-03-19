'use server';

import { replaceServiceThumbnail } from '@/entities/market-service';
import { deleteImageMediaAction, uploadImageAction } from '@/shared/api';
import { buildRoute } from '@/shared/lib/router';
import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';

export async function replaceServiceThumbnailAction(serviceId: string, thumbnail: File) {
  const formData = new FormData();
  formData.append('image', thumbnail);
  formData.append('title', '...');
  formData.append('alt', '...');

  const uploadImage = await uploadImageAction(formData);

  if (!uploadImage) {
    return { error: 'Failed to upload image', success: false };
  }

  const response = await replaceServiceThumbnail(serviceId, { thumbnailId: uploadImage.id });

  if (response.success) {
    revalidatePath(buildRoute(routePaths.MARKET_SERVICES_DETAILS, { id: serviceId }));
  } else {
    await deleteImageMediaAction(uploadImage.id);
  }

  return response;
}
