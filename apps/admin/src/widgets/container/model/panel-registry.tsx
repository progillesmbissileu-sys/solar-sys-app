"use client"

import React, { createContext, useContext, useCallback, useMemo } from "react"
import { RightPanelType } from "./right-panel-store"

export type PanelComponentProps = {
  panelProps: Record<string, unknown>
}

export type PanelRegistryConfig = Record<string, React.ComponentType<PanelComponentProps>>

const PanelRegistryContext = createContext<PanelRegistryConfig | null>(null)

export function PanelRegistryProvider({ 
  children,
  panels 
}: { 
  children: React.ReactNode
  panels: PanelRegistryConfig 
}) {
  return (
    <PanelRegistryContext.Provider value={panels}>
      {children}
    </PanelRegistryContext.Provider>
  )
}

export function usePanelComponent(panelType: RightPanelType) {
  const registry = useContext(PanelRegistryContext)
  
  return useMemo(() => {
    if (!panelType || !registry) return null
    return registry[panelType] ?? null
  }, [panelType, registry])
}

export function usePanelRegistry() {
  return useContext(PanelRegistryContext)
}
