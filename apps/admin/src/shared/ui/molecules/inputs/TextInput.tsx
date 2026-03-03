"use client";

import { Input, InputProps } from '../../atoms/Input';

export type TextInputProps = InputProps & {
  onChange?: (value: string) => void;
};

export function TextInput({ onChange, ...props }: TextInputProps) {
  return <Input {...props} type="text" onChange={(evt) => onChange?.(evt.target.value)} />;
}
