'use server';

import { callAction } from '../client/helpers';

type UploadImageActionResponse = { url: string; id: string; signedUrl: string };

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResponse> {
  const response = await callAction<FormData, UploadImageActionResponse>(
    '/api/image-media',
    'POST'
  )(formData);

  return response;
}

export async function deleteImageMediaAction(imageId: string): Promise<any> {
  const response = await callAction(`/api/image-media/${imageId}`, 'DELETE')();

  return response;
}
