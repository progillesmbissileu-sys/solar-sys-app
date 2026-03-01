import { SelectProps } from "@radix-ui/react-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/atoms/Select"
import { cx } from "@/shared/lib/utils"

export type SelectInputProps = SelectProps & {
  onChange?: (value: string) => void
  options?: Array<{ label: string; value: string }>
  placeholder?: string
  classNames?: { trigger?: any; content?: any }
}

export function SelectInput({
  onChange,
  placeholder,
  options,
  classNames,
  ...props
}: SelectInputProps) {
  return (
    <Select {...props} onValueChange={(value) => onChange?.(value)}>
      <SelectTrigger className={cx("h-10 w-full", classNames?.trigger)}>
        <SelectValue placeholder={`${placeholder || "Select an option"}...`} />
      </SelectTrigger>
      <SelectContent align="end" className={classNames?.content}>
        {options?.map(({ label, value }) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
