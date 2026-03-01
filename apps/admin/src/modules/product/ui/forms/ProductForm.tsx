'use client';

import React from 'react';
import z from 'zod';
import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui/organisms/Form';
import { ImageItem } from '@/shared/ui/molecules/inputs';
import { Product, ProductCategory } from '@/entities/product';
import { ProductFormValues, productFormSchema } from '../../model/product-form';

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>;
  categories: ProductCategory[];
  serverAction: any;
  /**
   * Called when the user removes an already uploaded image (value is an imageId string).
   * The actual API implementation is intentionally left to the caller.
   */
  onDeleteImageAction?: (imageId: string) => Promise<void> | void;
  /**
   * Called when user selects a new file.
   * Expected to return the created imageId.
   * (Caller wires the real API; form only orchestrates.)
   */
  onCreateImageIdAction?: (file: File) => Promise<string>;
};

function toDefaultImageItems(product?: Partial<Product> | Partial<ProductFormValues>): ImageItem[] {
  if (!product) return [];
  // If backend provides a URL, we can show preview. If we only have id, show nothing.
  const anyProduct = product as any;
  if (typeof anyProduct.pictureUrl === 'string' && anyProduct.pictureUrl.length > 0)
    return [anyProduct.pictureUrl];
  return [];
}

export default function ProductForm({
  initialValues,
  categories,
  serverAction,
  onDeleteImageAction,
  onCreateImageIdAction,
}: ProductFormProps) {
  const formOpts = formOptions({
    validators: {
      onSubmit: productFormSchema,
    },
    defaultValues: initialValues,
  });

  const [imageItems, setImageItems] = React.useState<ImageItem[]>(() =>
    toDefaultImageItems(initialValues)
  );
  const [isResolvingImageId, setIsResolvingImageId] = React.useState(false);

  return (
    <FormWrapper formOptions={formOpts} serverAction={serverAction}>
      {/* hidden id for update */}
      <div data-testid="id">
        <FormField.Text name="id" className="h-0" />
      </div>

      <div className="space-y-6">
        <div className="w-full" data-testid="designation">
          <FormField.Text
            name="designation"
            placeholder="common.designation"
            inputClassName="!h-12"
          />
        </div>

        <div className="w-full" data-testid="categoryId">
          <FormField.Select
            name="categoryId"
            placeholder="common.category"
            options={(categories ?? []).map((category) => ({
              value: category.id as string,
              label: category.designation,
            }))}
            classNames={{ trigger: 'h-12' }}
          />
        </div>

        <div className="w-full" data-testid="price">
          <FormField.Number name="price" placeholder="common.price" inputClassName="!h-12" />
        </div>

        <div className="w-full" data-testid="description">
          <FormField.Textarea
            name="description"
            placeholder="common.description"
            // className="min-h-28"
          />
        </div>

        <div className="w-full" data-testid="brand">
          <FormField.Text name="brand" placeholder="common.brand" inputClassName="!h-12" />
        </div>

        <div className="w-full" data-testid="pictureId">
          <FormField.Images
            name="pictureId"
            multiple={false}
            maxFiles={1}
            disabled={isResolvingImageId}
            defaultValue={imageItems}
            onChange={async (items) => {
              setImageItems(items);

              const first = items[0];
              // new file selected -> ask caller for imageId and set pictureId
              if (first instanceof File) {
                if (!onCreateImageIdAction) return;
                setIsResolvingImageId(true);
                try {
                  const imageId = await onCreateImageIdAction(first);
                  // write into form value
                  // We cannot directly access the field here; rely on hidden input approach.
                  // Submit payload will include pictureId from this field's value.
                  (formOpts.defaultValues as any).pictureId = imageId;
                } finally {
                  setIsResolvingImageId(false);
                }
              }

              // if cleared
              if (!first) {
                (formOpts.defaultValues as any).pictureId = null;
              }
            }}
            onRemove={async ({ removed }) => {
              // Only delete if it's an id string (already uploaded).
              if (typeof removed === 'string') {
                // In this app, removed could also be a URL string; treat non-uuid as non-deletable.
                const maybeId = removed;
                const isUuid = z.uuid().safeParse(maybeId).success;
                if (isUuid) await onDeleteImageAction?.(maybeId);
              }
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-2 pt-3">
          <FormComponent.SubmitButton label="actions.submit" className="w-full" />
        </div>
      </div>
    </FormWrapper>
  );
}
