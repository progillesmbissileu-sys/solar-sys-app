'use client';

import { cx } from '@/shared/lib/utils';

import { Button, ButtonProps } from '../../atoms/Button';
import { useFormContext } from './form-config';

export function SubscribeButton({ label, className, ...props }: ButtonProps & { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(s) => s.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className={cx('h-12 w-full', className)}
          {...props}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}
