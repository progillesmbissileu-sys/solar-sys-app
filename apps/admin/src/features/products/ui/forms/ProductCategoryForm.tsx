'use client';

import { FormField, FormWrapper, FormComponent, parseEnumOptions } from '@/shared/ui';
import { formOptions } from '@tanstack/react-form';
import z from 'zod';
import { ProductCategoryType } from '@/entities/product';
import { createProductCategoryAction } from '../../lib/create-product-category-action';
import { useEvents } from '@repo/ui/event-provider';

export const categorySchema = z.object({
  id: z.uuid().optional(),
  designation: z.string().min(1),
  type: z.enum(ProductCategoryType),
  parentId: z.uuid().optional(),
});

export default function UpdateCategoryForm({ initialValues }: { initialValues?: any }) {
  const event = useEvents();

  const formOpts = formOptions({
    validators: {
      onSubmit: categorySchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={createProductCategoryAction}
      onSuccess={() => event.success('Category created successfully')}
      onError={() => event.error('Failed to create category')}
    >
      <div data-testid="id">
        <FormField.Text name="id" className="hidden" />
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
          <FormField.Select
            name="type"
            placeholder="common.categoryType"
            options={parseEnumOptions(ProductCategoryType)}
            classNames={{ trigger: 'h-12' }}
          />
        </div>

        {/*<div className="w-full" data-testid="designation">
          <FormField.Select
            name="parentId"
            placeholder="common.parentCategory"
            options={(categories ?? []).map((category) => ({
              value: category.id as string,
              label: category.designation,
            }))}
            classNames={{ trigger: 'h-12' }}
          />
        </div>*/}

        <div className="flex flex-col items-center gap-2 pt-3">
          <FormComponent.SubmitButton label="actions.submit" className="w-full" />
        </div>
      </div>
    </FormWrapper>
  );
}
