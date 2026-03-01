import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps {
  children?: React.ReactNode;
  className?: any;
  type?: 'primary' | 'default';
  variant?: 'solid' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

const buttonStyles = (type: ButtonProps['type'], variant: ButtonProps['variant']) => {
  switch (type) {
    case 'primary':
      if (variant === 'solid') {
        return 'bg-yellow-500 text-dark';
      }
      return 'border border-yellow-500 text-emerald-600';
    default:
      if (variant === 'solid') {
        return 'bg-white text-black';
      }
      return 'border border-yellow-500 text-yellow-500';
  }
};

const AppButton = (props: ButtonProps) => {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-sm px-6 py-3',
        buttonStyles(props.type ?? 'primary', props.variant ?? 'solid'),
        props.className
      )}
    >
      <span>{props.label}</span>
    </button>
  );
};

export default AppButton;
