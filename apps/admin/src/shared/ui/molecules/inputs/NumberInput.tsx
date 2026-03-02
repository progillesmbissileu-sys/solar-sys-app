import { Input, InputProps } from '@/shared/ui/atoms/Input';

export type NumberInputProps = InputProps & {
  onChange?: (value: number) => void;
};

export function NumberInput({ onChange, ...props }: NumberInputProps) {
  return (
    <Input {...props} type="number" onChange={(evt) => onChange?.(parseInt(evt.target.value))} />
  );
}
