import React, { ReactNode } from 'react';
import { ZodSchema } from 'zod';
import { FormOptions } from '@tanstack/react-form';

export type InputType =
  | 'text_input'
  | 'email_input'
  | 'numerical_input'
  | 'select_input'
  | 'multiple_select_input'
  | 'password_input'
  | 'submit_button'
  | 'button'
  | 'switch'
  | 'search_input'
  | 'textarea_input'
  | 'richtext_input'
  | 'enum_select'
  | 'date_input'
  | 'upload_input'
  | 'country_block'
  | 'phone_input'
  | 'checkbox_input';

export interface BuilderInputProps {
  isInvalid?: boolean;
  inputType: InputType;
  label?: string | ReactNode;
  name: string;
  defaultValue?: any;
  defaultChecked?: any;
  validator?: any;
  placeholder?: string;
  enums?: object;
  options?: Array<{ key?: any; value: any; label: string }>;
  onChange?: any;
  required?: boolean;
  bucketName?: string;
  fetchCollection?: (q?: string) => Promise<any>;
  maxFiles?: number;
  maxFileSize?: number;
  className?: any;
  asHtml?: boolean;
  labelPlacement?: 'top' | 'left' | 'right';
}

/**
 * Result type for server actions used with FormWrapper.
 * Server actions should return an object with optional data and error fields.
 */
export type FormActionResult<T = unknown> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: string; errors?: any[] }
  | void;

export interface FormBuilderProps<
  TSchema extends ZodSchema<any>,
  TFormData = any,
  TResult = unknown,
> {
  initialValues?: TFormData;
  onSubmit?: (payload: TFormData) => Promise<void>;
  /**
   * Callback fired when the server action completes successfully.
   * Receives the data returned by the server action.
   */
  onSuccess?: (data: TResult) => void;
  /**
   * Callback fired when the server action returns an error.
   */
  onError?: (error: { message: string; errors?: any[] }) => void;
  children: React.ReactNode;
  serverAction: any;
  formOptions: Omit<FormOptions<any, any, any, any, any, any, any, any, any, any, any>, 'onSubmit'>;
}

export type WithFormBlockProps = {
  name: string;
  label?: string;
};
