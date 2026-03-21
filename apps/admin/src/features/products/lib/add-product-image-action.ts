'use server';

import { callActionWithIdSafe } from '@/shared/api';
import { deleteImageMediaAction, uploadImageAction } from '@/shared/lib';
import { routePaths } from '@/shared/routes';
import { revalidatePath } from 'next/cache';

export const addProductImageAction = async (
  image: { file: File[]; alt?: string; title?: string },
  productId: string,
  isMainImage: boolean = false
) => {
  console.log({ image, productId, isMainImage });

  const formData = new FormData();

  formData.append('image', image.file[0]);

  if (image.alt) formData.append('alt', image.alt);
  if (image.title) formData.append('title', image.title);

  const upload = await uploadImageAction(formData);

  console.log({ upload });

  if (upload) {
    const response = await callActionWithIdSafe('/api/product/media/{id}/images', 'POST')(
      productId,
      { imageId: upload.id, isMainImage }
    );

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
