'use client';

import { useEvents } from '@repo/core';
import { formOptions } from '@tanstack/react-form';
import z from 'zod';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui';

import { getCategoriesAction } from '../../lib/category-collection-action';
import { createProductAction } from '../../lib/create-product-action';
import { updateProductAction } from '../../lib/update-product-action';
import { createProductSchema, updateProductSchema } from '../../model/product-form-schemas';

type ProductFormProps = {
  initialValues?: Partial<z.infer<typeof updateProductSchema>>;
};

export default function ProductForm({ initialValues }: ProductFormProps) {
  const event = useEvents();

  const formOpts = formOptions({
    validators: {
      onSubmit: initialValues?.id ? updateProductSchema : createProductSchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={initialValues?.id ? updateProductAction : createProductAction}
      onSuccess={() =>
        event.success(
          !initialValues?.id ? 'Product ajoute avec succes' : 'Product modifie avec succes'
        )
      }
      onError={() =>
        event.error(
          !initialValues?.id
            ? 'Echec de la creation du produit'
            : 'Echec de la modification du produit'
        )
      }
    >
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

        <div className="w-full" data-testid="product-items">
          <FormField.Search
            name="categoryId"
            placeholder="common.selectCategory"
            inputClassName="h-12"
            onSearchAction={async (query: string) =>
              await getCategoriesAction({ q: query, page: 1, limit: 10 })
            }
          />
        </div>

        <div className="w-full" data-testid="price">
          <FormField.Number name="price" placeholder="common.price" inputClassName="!h-12" />
        </div>

        <div className="w-full" data-testid="description">
          <FormField.Textarea name="description" placeholder="common.description" />
        </div>

        {!initialValues?.id && (
          <div className="space-y-3">
            <div className="w-full" data-testid="picture">
              <FormField.ImageField
                label="common.pictures"
                name="images"
                maxFiles={3}
                multiple={true}
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
        )}

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
