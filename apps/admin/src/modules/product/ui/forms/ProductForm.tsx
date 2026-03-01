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
};

function toDefaultImageItems(product?: Partial<Product> | Partial<ProductFormValues>): ImageItem[] {
  if (!product) return [];
  // If backend provides a URL, we can show preview. If we only have id, show nothing.
  const anyProduct = product as any;
  if (typeof anyProduct.pictureUrl === 'string' && anyProduct.pictureUrl.length > 0)
    return [anyProduct.pictureUrl];
  return [];
}

export default function ProductForm({ initialValues, categories, serverAction }: ProductFormProps) {
  const formOpts = formOptions({
    validators: {
      onSubmit: productFormSchema,
    },
    defaultValues: initialValues,
  });

  // const [imageItems, setImageItems] = React.useState<ImageItem[]>(() =>
  //   toDefaultImageItems(initialValues)
  // );
  // const [isResolvingImageId, setIsResolvingImageId] = React.useState(false);

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
          <FormField.Textarea name="description" placeholder="common.description" />
        </div>

        <div className="space-y-3">
          <div className="w-full" data-testid="picture">
            <FormField.Images
              label="common.picture"
              name="picture"
              multiple={false}
              maxFiles={1}
              // disabled={isResolvingImageId}
              // defaultValue={imageItems}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div data-testid="picture-title">
              <FormField.Text
                name="pictureTitle"
                placeholder="common.title"
                inputClassName="!h-12"
              />
            </div>
            <div data-testid="picture-alt">
              <FormField.Text name="pictureAlt" placeholder="common.alt" inputClassName="!h-12" />
            </div>
          </div>
        </div>

        <div className="w-full" data-testid="brand">
          <FormField.Text name="brand" placeholder="common.brand" inputClassName="!h-12" />
        </div>

        <div>
          <FormComponent.SubmitButton label="actions.submit" className="w-full" />
        </div>
      </div>
    </FormWrapper>
  );
}
