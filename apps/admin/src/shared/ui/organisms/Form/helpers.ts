import { EnumHelper } from '@/shared/lib/types';

export const extractFormPayload = <TData = any>(formData: FormData): TData => {
  const payload = Object.fromEntries(formData.entries()) as TData;

  return payload;
};

export const parseEnumOptions = <TEnum extends object>(enumType: TEnum) => {
  return EnumHelper.toList(enumType).map((item) => ({
    label: item.value,
    value: item.value,
  }));
};
