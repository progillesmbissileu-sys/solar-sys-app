'use server';

import { callAction } from '../client/helpers';

type UploadImageActionResponse = { url: string; id: string; signedUrl: string };

export async function uploadImageAction(formData: FormData): Promise<UploadImageActionResponse> {
  console.log('Upload Action', formData);
  const response = await callAction<FormData, UploadImageActionResponse>(
    '/api/image-media',
    'POST',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )(formData);

  return response;
}

export async function deleteImageMediaAction(imageId: string): Promise<any> {
  const response = await callAction(`/api/image-media/${imageId}`, 'DELETE')();

  return response;
}
