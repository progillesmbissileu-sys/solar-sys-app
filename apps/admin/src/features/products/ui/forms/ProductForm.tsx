'use client';

import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui';
import { ProductFormValues, createProductSchema } from '../../model/product-form-schemas';
import { createProductAction } from '../../lib/create-product-action';
import { useEvents } from '@repo/ui/event-provider';
import { getCategoriesAction } from '../../lib/category-collection-action';

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>;
};

export default function ProductForm({ initialValues }: ProductFormProps) {
  const event = useEvents();

  const formOpts = formOptions({
    validators: {
      onSubmit: createProductSchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={createProductAction}
      onSuccess={() => event.success('Product created successfully')}
      onError={() => event.error('Failed to create product')}
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

        <div className="space-y-3">
          <div className="w-full" data-testid="picture">
            <FormField.ImageField
              label="common.pictures"
              name="images"
              maxFiles={3}
              multiple={true}
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
