import { EnumHelper } from '@/shared/lib/types';

export const extractFormPayload = <TData = any>(
  formData: FormData,
  skip: string[] = [],
  parseCallback?: (entries: Record<string, unknown>) => unknown
): TData => {
  const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;

  const expectedEntries = skip.reduce((acc, key) => {
    delete acc[key];
    return acc;
  }, payload);

  return parseCallback ? (parseCallback(expectedEntries) as TData) : (expectedEntries as TData);
};

export const parseEnumOptions = <TEnum extends object>(enumType: TEnum) => {
  return EnumHelper.toList(enumType).map((item) => ({
    label: item.value,
    value: item.value,
  }));
};
