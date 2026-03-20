'use server';

import { deleteImageMediaAction, uploadImageAction } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { createProduct, CreateProductPayload } from '@/entities/product';
import { revalidatePath } from 'next/cache';
import { createProductSchema } from '../model/product-form-schemas';
import z from 'zod';

export const createProductAction = async (payload: z.infer<typeof createProductSchema>) => {
  const images = payload.images;

  const imagesUploadObjectList = images.map((image) => {
    const uploadDataObject = new FormData();
    uploadDataObject.append('image', image);
    uploadDataObject.append('title', payload.pictureTitle ?? '');
    uploadDataObject.append('alt', payload.pictureAlt ?? '');
    return uploadDataObject;
  });

  const results = await Promise.allSettled(
    imagesUploadObjectList.map((uploadDataObject) => uploadImageAction(uploadDataObject))
  );

  const uploadedPictures = results
    .map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return null;
    })
    .filter(Boolean);

  if (uploadedPictures.length > 0) {
    const _payload: CreateProductPayload = {
      designation: payload.designation,
      description: payload.description,
      categoryId: payload.categoryId,
      price: payload.price,
      brand: payload.brand,
      mainImageId: uploadedPictures[0]?.id as string,
      imageIds:
        uploadedPictures.length > 1
          ? (uploadedPictures.slice(1) as any[]).map((picture) => picture?.id)
          : [null],
    };

    const resp = await createProduct(_payload);

    resp.success
      ? revalidatePath(routePaths.PRODUCTS)
      : await Promise.allSettled(
          uploadedPictures.map((picture) => deleteImageMediaAction(picture?.id ?? ''))
        );

    return resp;
  }

  return { success: false };
};
