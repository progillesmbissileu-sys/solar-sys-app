"use client";

import { Textarea, TextareaProps } from '../../atoms/Textarea';

export type TextareaInputProps = TextareaProps & {
  onChange?: (value: string) => void;
};

export function TextareaInput({ onChange, ...props }: TextareaInputProps) {
  return <Textarea {...props} onChange={(evt) => onChange?.(evt.target.value)} />;
}

