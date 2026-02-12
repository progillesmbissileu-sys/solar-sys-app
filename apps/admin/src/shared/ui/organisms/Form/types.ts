import React, { ReactNode } from "react"
import { ZodSchema } from "zod"

export type InputType =
  | "text_input"
  | "email_input"
  | "numerical_input"
  | "select_input"
  | "multiple_select_input"
  | "password_input"
  | "submit_button"
  | "button"
  | "switch"
  | "search_input"
  | "textarea_input"
  | "enum_select"
  | "date_input"
  | "upload_input"
  | "country_block"
  | "phone_input"
  | "checkbox_input"

export interface BuilderInputProps {
  isInvalid?: boolean
  inputType: InputType
  label?: string | ReactNode
  name: string
  defaultValue?: any
  defaultChecked?: any
  validator?: any
  placeholder?: string
  enums?: object
  options?: Array<{ key?: any; value: any; label: string }>
  onChange?: any
  required?: boolean
  bucketName?: string
  fetchCollection?: (q?: string) => Promise<any>
  maxFiles?: number
  maxFileSize?: number
  className?: any
  asHtml?: boolean
  labelPlacement?: "top" | "left" | "right"
}

export interface FormBuilderProps<
  TSchema extends ZodSchema<any>,
  TFormData = any,
> {
  initialValues?: TFormData
  schema: TSchema
  onSubmit: (payload: TFormData) => Promise<void>
  children: React.ReactNode
}

export type WithFormBlockProps = {
  name: string
  label?: string
}
