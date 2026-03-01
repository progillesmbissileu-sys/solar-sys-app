'use client';

import {
  FormField,
  FormWrapper,
  FormComponent,
  parseEnumOptions,
} from '@/shared/ui/organisms/Form';
import { formOptions } from '@tanstack/react-form';
import z from 'zod';
import { createProductCategoryAction, updateProductCategoryAction } from '../../api/actions';
import { CategoryUpdatePayload, ProductCategory, ProductCategoryType } from '@/entities/product';

export default function UpdateCategoryForm({
  initialValues,
  // categories,
}: {
  initialValues?: CategoryUpdatePayload;
  categories?: ProductCategory[];
}) {
  const formOpts = formOptions({
    validators: {
      onSubmit: z.object({
        id: z.uuid(),
        designation: z.string().min(1),
        type: z.enum(ProductCategoryType),
        parentId: z.uuid().optional(),
      }),
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={!initialValues?.id ? createProductCategoryAction : updateProductCategoryAction}
    >
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
