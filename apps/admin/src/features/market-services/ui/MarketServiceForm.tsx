'use client';

import { formOptions } from '@tanstack/react-form';

import { FormComponent, FormField, FormWrapper } from '@/shared/ui';
import z from 'zod';
import { createServiceSchema, updateServiceSchema } from '../model/form-schemas';
import { createServiceAction } from '../lib/create-service-action';
import { updateServiceAction } from '../lib/update-service-action';

export default function MarketServiceForm({
  initialValues,
}: {
  initialValues?: Partial<z.infer<typeof updateServiceSchema>>;
}) {
  const isUpdate = !!initialValues?.id;

  const formOpts = formOptions({
    validators: {
      onSubmit: isUpdate ? updateServiceSchema : createServiceSchema,
    },
    defaultValues: initialValues,
  });

  return (
    <FormWrapper
      formOptions={formOpts}
      serverAction={isUpdate ? updateServiceAction : createServiceAction}
      onError={(error) => console.log('FORM_ERRORS', error)}
    >
      {/* hidden id for update */}
      <div data-testid="id" className="hidden">
        <FormField.Text name="id" className="h-0" />
      </div>

      <aside className="space-y-6">
        <div className="w-full" data-testid="designation">
          <FormField.Text
            name="designation"
            placeholder="common.designation"
            inputClassName="!h-12"
          />
        </div>

        <div className="w-full" data-testid="description">
          <FormField.Textarea name="shortDescription" placeholder="common.description" />
        </div>

        <div className="space-y-6">
          <div className="" data-testid="picture">
            <FormField.ImageField
              name="thumbnail"
              maxFiles={1}
              multiple={false}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div data-testid="picture-title">
              <FormField.Text
                name="thumbnailTitle"
                placeholder="common.imageTitle"
                inputClassName="!h-12"
              />
            </div>
            <div data-testid="picture-alt">
              <FormField.Text
                name="thumbnailAlt"
                placeholder="common.imageAlt"
                inputClassName="!h-12"
              />
            </div>
          </div>
        </div>

        <div className="h-full">
          <FormField.RichText name="contentDescription" editorClassName="min-h-72" />
        </div>

        <div>
          <FormComponent.SubmitButton label="actions.submit" className="w-full" />
        </div>
      </aside>
    </FormWrapper>
  );
}
