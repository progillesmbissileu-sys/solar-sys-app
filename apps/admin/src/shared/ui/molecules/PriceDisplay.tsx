"use client"

const PriceDisplay = ({
  amount,
  currency = "XAF",
  locale = "fr-FR",
  showSymbol = true,
  className = "",
}: {
  amount: number
  currency?: string
  locale?: string
  showSymbol?: boolean
  className?: string
}) => {
  // Format the parts using Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  })

  const parts = formatter.formatToParts(amount)

  return (
    <div
      className={`price-display ${className}`}
      aria-label={`${amount} ${currency}`}
    >
      {parts.map((part, index) => {
        // We can style currency symbols or decimals differently if needed
        const isSymbol = part.type === "currency"
        const isFraction = part.type === "fraction"

        if (isSymbol && !showSymbol) return null

        return (
          <span
            key={index}
            className={`price-${part.type}`}
            style={
              isSymbol ? { fontSize: "0.8em", verticalAlign: "super" } : {}
            }
          >
            {part.value}
          </span>
        )
      })}
    </div>
  )
}

export default PriceDisplay
