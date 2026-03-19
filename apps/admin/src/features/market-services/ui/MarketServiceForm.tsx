'use client';

import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui';
import { marketProductCollection } from '@/entities/product';
import z from 'zod';

export default function MarketServiceForm({
  initialValues,
}: {
  initialValues?: Partial<z.infer<typeof updatePackFormSchema>>;
}) {
  const isUpdate = !!initialValues?.id;

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
