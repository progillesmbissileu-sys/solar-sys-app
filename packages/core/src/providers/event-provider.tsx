"use client";

import React from "react";
import { Toaster } from "sonner";

interface EventProviderProps {
  children: React.ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          duration: 5000,
          // style: {
          //   background: "white",
          //   border: "1px solid hsl(var(--border))",
          //   color: "hsl(var(--foreground))",
          // },
        }}
      />
    </>
  );
}
