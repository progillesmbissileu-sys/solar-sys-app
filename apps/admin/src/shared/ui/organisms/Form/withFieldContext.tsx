'use client';

import { cx } from '@/shared/lib/utils';
import { useFieldContext } from './form-config';
import { Label } from '../../atoms/Label';
import React from 'react';

type WithFormFieldProps = {
  name: string;
  label?: string;
  className?: string;
};

type InputValue = unknown;

export function withFieldContext<TProps extends object>(Component: React.ComponentType<TProps>) {
  return function Field(props: TProps & WithFormFieldProps) {
    const { label, className, name, ...componentProps } = props;
    const field = useFieldContext<InputValue>();

    const isFieldValid = field.state.meta.isValid;

    return (
      <div className={cx('relative', className)}>
        <div
          className={cx('mb-0 transition-all duration-200 ease-linear', {
            'pb-3': !isFieldValid,
          })}
        >
          {label && <Label>{label}</Label>}
          <Component
            {...(componentProps as TProps)}
            name={name}
            defaultValue={field.state.value}
            onChange={(value: any) => {
              field.handleChange(value);
            }}
          />
        </div>
        <div
          className={cx(
            'absolute bottom-0 text-transparent transition-all delay-200 duration-200 ease-linear',
            { '-bottom-4 text-green-600': !isFieldValid }
          )}
        >
          <span className="font-montserrat-sans block text-sm">
            {!isFieldValid && field.state.meta.errors.map((err: any) => err?.message)?.at(0)}
          </span>
        </div>
      </div>
    );
  };
}
