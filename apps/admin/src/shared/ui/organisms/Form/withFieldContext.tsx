import { cx } from "@/shared/lib/utils"
import { useFieldContext } from "./form-config"
import { Label } from "@/shared/ui/atoms/Label"
import React from "react"

type WithFormFieldProps = {
  name: string
  label?: string
  className?: string
}

type InputValue = string | number | boolean

export function withFieldContext<TProps extends object>(
  Component: React.ComponentType<TProps>,
) {
  return function Field(props: TProps & WithFormFieldProps) {
    const { label, className, name, ...componentProps } = props
    const field = useFieldContext<InputValue>()

    return (
      <div
        className={cx("text-foreground dark:text-foreground-dark", className)}
      >
        {label && <Label>{label}</Label>}
        <Component
          {...(componentProps as TProps)}
          name={name}
          defaultValue={field.state.value}
          onChange={(e: any) => field.handleChange(e.target?.value || e)}
        />
        {!field.state.meta.isValid && (
          <div>
            <span className="font-montserrat-sans mt-1.5 block text-xs italic text-red-600">
              {field.state.meta.errors.map((err: any) => err?.message)?.at(0)}
            </span>
          </div>
        )}
      </div>
    )
  }
}
