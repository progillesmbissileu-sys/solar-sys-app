export const extractFormPayload = <TData>(formData: FormData): TData => {
  const payload = Object.fromEntries(formData.entries()) as TData

  return payload
}
