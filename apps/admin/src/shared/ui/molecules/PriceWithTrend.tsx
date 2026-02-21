"use client"

import PriceDisplay from "./PriceDisplay"

export const PriceWithTrend = ({
  current,
  previous,
}: {
  current: number
  previous: number
}) => {
  const diff = current - previous
  const isUp = diff >= 0

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <PriceDisplay amount={current} />
      <span style={{ color: isUp ? "green" : "red", fontSize: "0.85rem" }}>
        {isUp ? "▲" : "▼"} {Math.abs((diff / previous) * 100).toFixed(1)}%
      </span>
    </div>
  )
}
