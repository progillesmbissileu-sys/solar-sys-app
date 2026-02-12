import React from "react"
import { useAppForm } from "@/shared/ui/organisms/Form/form-config"

export const FormContext = React.createContext<ReturnType<
  typeof useAppForm
> | null>(null)

export const useFormContext = () => {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error("Form fields must be used within a FormWrapper")
  }
  return context as ReturnType<typeof useAppForm>
}
