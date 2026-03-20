import { EnumHelper } from '@/shared/lib/types';

// export const extractFormData = <TData = any>(
//   formData: FormData,
//   skip: string[] = [],
//   parseCallback?: (entries: Record<string, unknown>) => unknown
// ): TData => {
//   const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;

//   const parsedEntries = parseCallback ? parseCallback(payload) : payload;

//   const expectedEntries = skip.reduce(
//     (acc, key) => {
//       delete acc[key];
//       return acc;
//     },
//     parsedEntries as Record<string, unknown>
//   );

//   return expectedEntries as TData;
// };

export const parseEnumOptions = <TEnum extends object>(enumType: TEnum) => {
  return EnumHelper.toList(enumType).map((item) => ({
    label: item.value,
    value: item.value,
  }));
};
