'use client';

import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui';
import { ProductCategory } from '@/entities/product';
import { productUpdateFormSchema, ProductUpdateFormValues } from '../../model/product-validators';
import { updateProductAction } from '../../lib/update-product-action';

type ProductUpdateFormProps = {
  initialValues: ProductUpdateFormValues;
  categories: ProductCategory[];
};

export default function ProductUpdateForm({ initialValues, categories }: ProductUpdateFormProps) {
  const formOpts = formOptions({
    validators: {
      onSubmit: productUpdateFormSchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={updateProductAction}
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
