"use client"

import React from "react"

import type { FormBuilderProps } from "./types"
import { ZodSchema } from "zod"
import { useAppForm } from "./form-config"
import { FormContext } from "./use-form-context"
import {
  initialFormState,
  useTransform,
  mergeForm,
} from "@tanstack/react-form-nextjs"

export function FormWrapper<TSchema extends ZodSchema<any>>(
  props: FormBuilderProps<TSchema>,
) {
  const [state, action] = React.useActionState(
    props.serverAction,
    initialFormState,
  )

  const form = useAppForm({
    ...props.formOptions,
    onSubmit: async ({ value }) => props.onSubmit?.(value),
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state!),
      [state],
    ) as any,
  })

  return (
    <FormContext value={form as any}>
      <form
        action={action}
        onSubmit={() => {
          form.handleSubmit().catch((error) => console.error(error))
        }}
      >
        <form.AppForm>{props.children}</form.AppForm>
      </form>
    </FormContext>
  )
}
