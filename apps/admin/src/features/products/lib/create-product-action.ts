'use server';

import { deleteImageMediaAction, uploadImageAction } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormData } from '@/shared/ui';
import { createProduct, CreateProductPayload } from '@/entities/product';
import { revalidatePath } from 'next/cache';

export const createProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormData<CreateProductPayload>(formData);

  const images = formData.getAll('images') as File[];

  const imagesUploadObjectList = images.map((image) => {
    const uploadDataObject = new FormData();
    uploadDataObject.append('image', image);
    uploadDataObject.append('title', formData.get('pictureTitle') as string);
    uploadDataObject.append('alt', formData.get('pictureAlt') as string);
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
