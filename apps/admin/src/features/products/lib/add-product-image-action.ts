'use server';

import { revalidatePath } from 'next/cache';

import { callActionWithId } from '@/shared/api';
import { deleteImageMediaAction, uploadImageAction } from '@/shared/lib';
import { routePaths } from '@/shared/routes';

export const addProductImageAction = async (
  image: { file: File[]; alt?: string; title?: string },
  productId: string,
  isMainImage: boolean = false
) => {
  const formData = new FormData();

  formData.append('image', image.file[0]);

  if (image.alt) formData.append('alt', image.alt);
  if (image.title) formData.append('title', image.title);

  const upload = await uploadImageAction(formData);

  if (upload) {
    const response = await callActionWithId('/api/product/media/{id}/images', 'POST')(productId, {
      imageId: upload.id,
      isMainImage,
    });

    if (response.success) {
      revalidatePath(routePaths.PRODUCTS_OVERVIEW.replace('{id}', productId));
      return response;
    } else {
      await deleteImageMediaAction(upload.id);
      return response;
    }
  }

  return { success: false };
};
