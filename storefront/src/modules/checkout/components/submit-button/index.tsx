"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size="large"
      className={`h-11 font-medium flex items-center justify-center transition-all duration-200 ${className || "bg-[#2d711c] hover:bg-[#25601a] text-white"}`}
      type="submit"
      disabled={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <Loader2 size={18} className="animate-spin" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </Button>
  )
}
