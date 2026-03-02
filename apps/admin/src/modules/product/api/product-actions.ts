'use server';

import { callAction, deleteImageMediaAction, uploadImageAction } from '@/shared/api';
import { routePaths } from '@/shared/routes';
import { extractFormPayload } from '@/shared/ui/organisms/Form';
import { redirect } from 'next/navigation';
import { ProductUpdateInput } from '@/entities/product/model/product';

export type ProductCreatePayload = Omit<ProductUpdateInput, 'isDeleted' | 'isAvailable'>;

export const createProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<ProductCreatePayload>(formData);

  const uploadDataObject = new FormData();
  uploadDataObject.append('image', formData.get('picture') as File);
  uploadDataObject.append('title', formData.get('pictureTitle') as string);
  uploadDataObject.append('alt', formData.get('pictureAlt') as string);

  const uploadedPicture = await uploadImageAction(uploadDataObject);

  if (uploadedPicture.id) {
    const resp = await callAction<ProductCreatePayload, void | { error?: string; errors?: any[] }>(
      '/api/product',
      'POST'
    )({
      designation: payload.designation,
      description: payload.description,
      categoryId: payload.categoryId,
      price: payload.price,
      pictureId: uploadedPicture.id,
      brand: payload.brand,
    });

    console.error('RESULT', resp);
    !resp ? redirect(routePaths.PRODUCTS) : await deleteImageMediaAction(uploadedPicture.id);
  }
};

export const updateProductAction = async (_prev: unknown, formData: FormData) => {
  const payload = extractFormPayload<ProductUpdateInput & { id: string }>(formData);

  const resp = await callAction<ProductUpdateInput, void | { error?: string; errors?: any[] }>(
    `/api/product/${payload.id}`,
    'PATCH'
  )(payload);

  console.error(resp);
  !resp && redirect(routePaths.PRODUCTS);
};
