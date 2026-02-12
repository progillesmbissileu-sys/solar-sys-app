"use client"

import React from "react"

import type { FormBuilderProps } from "./types"
import { ZodSchema } from "zod"
import { useAppForm } from "./form-config"
import { FormContext } from "./use-form-context"

export function FormWrapper<TSchema extends ZodSchema<any>>(
  props: FormBuilderProps<TSchema>,
) {
  const defaultValues = React.useDeferredValue(props.initialValues)

  const form = useAppForm({
    defaultValues: defaultValues,
    validators: { onSubmit: props.schema },
    onSubmit: async ({ value }) => await props.onSubmit(value),
  })

  return (
    <FormContext value={form as any}>
      <form.AppForm>{props.children}</form.AppForm>
    </FormContext>
  )
}
