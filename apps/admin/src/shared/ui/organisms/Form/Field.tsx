'use client';

import { WithFormBlockProps } from './types';
import { useFormContext } from './use-form-context';
import {
  CheckboxInputProps,
  ImageUploadInputProps,
  ImageUploadFieldProps,
  MultiSearchInputProps,
  NumberInputProps,
  RichTextInputProps,
  SearchInputProps,
  SelectInputProps,
  TextInputProps,
  TextareaInputProps,
} from '../../molecules/inputs';

function Text(props: TextInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Input {...props} />} />;
}

function Number(props: NumberInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Number {...props} />} />;
}

function Password(props: TextInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Password {...props} />} />;
}

function Email(props: TextInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Email {...props} />} />;
}

function Select(props: SelectInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Select {...props} />} />;
}

function Checkbox(props: CheckboxInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Checkbox {...props} />} />;
}

function ImageUploadInput(props: ImageUploadInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.ImageUpload {...props} />} />;
}

function ImageField(props: ImageUploadFieldProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.ImageField {...props} />} />;
}

function Textarea(props: TextareaInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Textarea {...props} />} />;
}

function Search(props: SearchInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.Search {...props} />} />;
}

function MultiSearch(props: MultiSearchInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.MultiSearch {...props} />} />;
}

function RichText(props: RichTextInputProps & WithFormBlockProps) {
  const form = useFormContext();

  return <form.AppField name={props.name} children={(field) => <field.RichText {...props} />} />;
}

export {
  Text,
  Number,
  Password,
  Email,
  Select,
  Checkbox,
  ImageUploadInput,
  ImageField,
  Textarea,
  Search,
  MultiSearch,
  RichText,
};
