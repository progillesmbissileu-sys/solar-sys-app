'use client';

import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui';
import { marketProductCollection } from '@/entities/product';
import { createProductPackAction } from '../../lib/create-product-pack-action';
import { updateProductPackAction } from '../../lib/update-product-pack-action';
import { createPackFormSchema, updatePackFormSchema } from '../../model/product-pack-form-schemas';
import z from 'zod';
import { useEvents } from '@repo/ui/event-provider';

export default function ProductPackageForm({
  initialValues,
}: {
  initialValues?: Partial<z.infer<typeof updatePackFormSchema>>;
}) {
  const isUpdate = !!initialValues?.id;
  const event = useEvents();

  const formOpts = formOptions({
    validators: {
      onSubmit: isUpdate ? updatePackFormSchema : createPackFormSchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={isUpdate ? updateProductPackAction : createProductPackAction}
      onSuccess={() => event.success('Product package updated successfully')}
      onError={() => event.error('Failed to update product package')}
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
          <FormField.MultiSearch
            name="items"
            placeholder="common.itemsList"
            inputClassName="h-20"
            onSearch={async (query: string) =>
              await marketProductCollection({ q: query, page: 1, limit: 10 })
            }
          />
        </div>

        <div className="w-full" data-testid="price">
          <FormField.Number name="price" placeholder="common.price" inputClassName="!h-12" />
        </div>

        <div className="w-full" data-testid="description">
          <FormField.Textarea name="description" placeholder="common.description" />
        </div>

        <div>
          <FormComponent.SubmitButton label="actions.submit" className="h-12 w-full" />
        </div>
      </div>
    </FormWrapper>
  );
}
