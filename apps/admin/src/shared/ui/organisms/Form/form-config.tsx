'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import {
  CheckboxInput,
  CheckboxInputProps,
  EmailInput,
  EmailInputProps,
  ImageUploadField,
  ImageUploadFieldProps,
  ImageUploadInput,
  ImageUploadInputProps,
  MultiSearchInput,
  MultiSearchInputProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  RichTextInput,
  RichTextInputProps,
  SearchInput,
  SearchInputProps,
  SelectInput,
  SelectInputProps,
  TextareaInput,
  TextareaInputProps,
  TextInput,
  TextInputProps,
} from '../../molecules/inputs';
import { SubscribeButton } from './SubmitButton';
import { withFieldContext } from './withFieldContext';

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
    RichText: withFieldContext<RichTextInputProps>(RichTextInput),
  },
});
