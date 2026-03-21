'use server';

import { callActionSafe } from '../../api/client/helpers';

export async function uploadImageAction(
  formData: FormData
): Promise<{ url: string; id: string; signedUrl: string } | null> {
  const response = await callActionSafe<{ url: string; id: string; signedUrl: string }>(
    '/api/image-media',
    'POST',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )(undefined, formData);

  return response.success ? response.data : null;
}

export async function deleteImageMediaAction(imageId: string): Promise<unknown> {
  const response = await callActionSafe(`/api/image-media/${imageId}`, 'DELETE')();

  return response;
}
