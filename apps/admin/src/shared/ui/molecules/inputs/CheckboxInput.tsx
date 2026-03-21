"use client";

import { CheckboxProps } from '@radix-ui/react-checkbox';

import { Checkbox } from '../../atoms/Checkbox';

export type CheckboxInputProps = CheckboxProps;

export function CheckboxInput(props: CheckboxInputProps) {
  return <Checkbox {...props} />;
}
