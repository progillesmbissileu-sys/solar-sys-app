import { format, formatDistanceToNow, isValid } from "date-fns"
import { enUS, fr } from "date-fns/locale"

// Map of supported locales
const locales = { "en-US": enUS, fr: fr }

const DateDisplay = ({
  date,
  variant = "standard", // 'standard' | 'relative' | 'short'
  localeKey = "fr",
  className = "",
}: {
  date: Date | string
  variant?: "standard" | "relative" | "short"
  localeKey?: keyof typeof locales
  className?: string
}) => {
  const dateObj = typeof date === "string" ? new Date(date) : date

  if (!isValid(dateObj)) {
    return <span className="text-red-500">Invalid Date</span>
  }

  const selectedLocale = locales[localeKey] || enUS

  // Choose formatting logic
  const renderDate = () => {
    switch (variant) {
      case "relative":
        return formatDistanceToNow(dateObj, {
          addSuffix: true,
          locale: selectedLocale,
        })
      case "short":
        return format(dateObj, "MM/dd/yy")
      default:
        return format(dateObj, "PPP", { locale: selectedLocale }) // e.g., April 28th, 2026
    }
  }

  return (
    <time dateTime={dateObj.toISOString()} className={`${className}`}>
      {renderDate()}
    </time>
  )
}

export default DateDisplay
