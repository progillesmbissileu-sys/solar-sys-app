'use server';

import {
  callActionSafe,
  callActionWithIdSafe,
  deleteImageMediaAction,
  uploadImageAction,
} from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui';
import { redirect } from 'next/navigation';
import { CreateProductInput, UpdateProductInput } from '@/entities/product';
import { revalidatePath } from 'next/cache';
import { buildRoute } from '@/shared/lib/router';

export const createProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<CreateProductInput>(formData);

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
    const _payload = {
      designation: payload.designation,
      description: payload.description,
      categoryId: payload.categoryId,
      price: payload.price,
      brand: payload.brand,
      mainImageId: uploadedPictures[0]?.id as string,
      imagesIds:
        uploadedPictures.length > 1
          ? (uploadedPictures.slice(1) as any[]).map((picture) => picture?.id)
          : [null],
    };

    const resp = await callActionSafe<void>('/api/product', 'POST')(_payload);

    resp.success
      ? revalidatePath(routePaths.PRODUCTS)
      : await Promise.allSettled(
          uploadedPictures.map((picture) => deleteImageMediaAction(picture?.id ?? ''))
        );
    return resp;
  }
};

//update action
export const updateProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<UpdateProductInput & { id: string }>(formData);

  const _payload = {
    designation: payload.designation,
    description: payload.description,
    categoryId: payload.categoryId,
    price: payload.price,
    brand: payload.brand,
  };

  const resp = await callActionWithIdSafe<void>(`/api/product/:id`, 'PATCH')(payload.id, _payload);

  resp.success && redirect(buildRoute(routePaths.PRODUCTS_OVERVIEW, { id: payload.id }));

  return resp;
};
