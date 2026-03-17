'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { withFieldContext } from './withFieldContext';
import {
  CheckboxInput,
  CheckboxInputProps,
  EmailInput,
  EmailInputProps,
  ImageUploadInput,
  ImageUploadInputProps,
  ImageUploadField,
  ImageUploadFieldProps,
  MultiSearchInput,
  MultiSearchInputProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  SearchInput,
  SearchInputProps,
  SelectInput,
  SelectInputProps,
  TextInput,
  TextInputProps,
  TextareaInput,
  TextareaInputProps,
} from '../../molecules/inputs';
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
    Search: withFieldContext<SearchInputProps>(SearchInput),
    MultiSearch: withFieldContext<MultiSearchInputProps>(MultiSearchInput),
    ImageUpload: withFieldContext<ImageUploadInputProps>(ImageUploadInput),
    ImageField: withFieldContext<ImageUploadFieldProps>(ImageUploadField),
    Textarea: withFieldContext<TextareaInputProps>(TextareaInput),
  },
});
