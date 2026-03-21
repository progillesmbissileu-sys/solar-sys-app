'use client';

import z from 'zod';

import { ApiError } from '@/shared/api';

import { useAppForm } from './form-config';
import type { FormBuilderProps } from './types';
import { FormContext } from './use-form-context';

function getErrorMessage(error: ApiError | string | undefined): string {
  if (!error) return "Echec de l'opération";
  if (typeof error === 'string') return error;
  return error.message ?? "Echec de l'opération";
}

export function FormWrapper<TResult = unknown, TSchema extends z.ZodType<any> = any>(
  props: FormBuilderProps<TSchema, any, TResult>
) {
  const form = useAppForm({
    ...props.formOptions,
    onSubmit: async ({ value }) => {
      const result = await props.serverAction(value);

      if (result?.success) {
        props.onSuccess?.('data' in result ? (result.data as TResult) : undefined);
      } else {
        props.onError?.({
          message: getErrorMessage(result?.error),
          errors: result?.errors,
        });
      }
    },
  });

  return (
    <FormContext value={form as any}>
      <form
        onSubmit={(evt) => {
          console.log({ evt });
          evt.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppForm>{props.children}</form.AppForm>
      </form>
    </FormContext>
  );
}
