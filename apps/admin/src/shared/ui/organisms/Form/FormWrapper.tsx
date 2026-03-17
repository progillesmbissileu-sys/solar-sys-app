'use client';

import React from 'react';

import type { FormBuilderProps, FormActionResult } from './types';
import { ZodSchema } from 'zod';
import { useAppForm } from './form-config';
import { FormContext } from './use-form-context';
import { initialFormState, useTransform, mergeForm } from '@tanstack/react-form-nextjs';

export function FormWrapper<TSchema extends ZodSchema<any>, TResult = unknown>(
  props: FormBuilderProps<TSchema, any, TResult>
) {
  const [state, action] = React.useActionState(props.serverAction, initialFormState);

  // Track previous state to detect changes
  const prevActionIdRef = React.useRef(0);
  const currentActionId = React.useMemo(() => {
    // Increment action ID when state changes (after form submission)
    if (state && typeof state === 'object' && !Array.isArray(state)) {
      return prevActionIdRef.current + 1;
    }
    return prevActionIdRef.current;
  }, [state]);

  // Handle success/error callbacks when state changes
  React.useEffect(() => {
    if (!state || currentActionId === prevActionIdRef.current) return;

    prevActionIdRef.current = currentActionId;

    // Check if state has a result structure
    if (typeof state === 'object' && state !== null) {
      // Check for error
      if ('error' in state && state.error) {
        props.onError?.({
          message: state.error as string,
          errors: 'errors' in state ? (state.errors as any[]) : undefined,
        });
        return;
      }

      // Check for success data
      if ('data' in state && state.data !== undefined) {
        props.onSuccess?.(state.data as TResult);
        return;
      }

      // If state is the result directly (no error property), treat as success
      if (!('error' in state)) {
        // The entire state might be the result (e.g., { id: '123' })
        props.onSuccess?.(state as TResult);
      }
    }
  }, [state, currentActionId, props]);

  const form = useAppForm({
    ...props.formOptions,
    onSubmit: async ({ value }) => props.onSubmit?.(value),
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]) as any,
  });

  return (
    <FormContext value={form as any}>
      <form
        action={action}
        onSubmit={(evt) => {
          console.log('Form submitted', evt);
          form.handleSubmit().catch((error) => console.error(error));
        }}
      >
        <form.AppForm>{props.children}</form.AppForm>
      </form>
    </FormContext>
  );
}
