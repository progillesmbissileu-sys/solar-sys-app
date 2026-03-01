'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { withFieldContext } from '@/shared/ui/organisms/Form/withFieldContext';
import {
  CheckboxInput,
  CheckboxInputProps,
  EmailInput,
  EmailInputProps,
  ImageUploadInput,
  ImageUploadInputProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  SelectInput,
  SelectInputProps,
  TextInput,
  TextInputProps,
  TextareaInput,
  TextareaInputProps,
} from '@/shared/ui/molecules/inputs';
import { SubscribeButton } from './SubmitButton';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  formComponents: {
    SubscribeButton,
  },
  fieldComponents: {
    Input: withFieldContext<TextInputProps>(TextInput),
    Number: withFieldContext<NumberInputProps>(NumberInput),
    Password: withFieldContext<PasswordInputProps>(PasswordInput),
    Email: withFieldContext<EmailInputProps>(EmailInput),
    Select: withFieldContext<SelectInputProps>(SelectInput),
    Checkbox: withFieldContext<CheckboxInputProps>(CheckboxInput),
    ImageUpload: withFieldContext<ImageUploadInputProps>(ImageUploadInput),
    Textarea: withFieldContext<TextareaInputProps>(TextareaInput),
  },
});
