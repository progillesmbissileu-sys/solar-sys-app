'use client';

import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper, ImageItem } from '@/shared/ui';
import { marketProductCollection, ProductCategory } from '@/entities/product';
import { ProductFormValues, productFormSchema } from '../../model/product-validators';
import { createProductAction } from '@/features/products';

export default function ProductPackageForm({
  initialValues,
}: {
  initialValues?: Partial<ProductFormValues>;
}) {
  const formOpts = formOptions({
    validators: {
      onSubmit: productFormSchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      // serverAction={!initialValues?.id ? createProductAction : updateProductAction}
      serverAction={createProductAction}
      onError={(error) => console.log(error)}
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

        <div className="w-full" data-testid="designation">
          <FormField.MultiSearch
            name="products"
            placeholder="common.products"
            onSearch={async (query: string) =>
              await marketProductCollection({ q: query, page: 1, limit: 10 })
            }
          />
        </div>

        <div>
          <FormComponent.SubmitButton label="actions.submit" className="w-full" />
        </div>
      </div>
    </FormWrapper>
  );
}
