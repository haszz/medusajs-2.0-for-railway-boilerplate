"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Text, Heading, Input, Button } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useEffect, useState } from "react"
import { FileDown, CheckCircle, XCircle } from "lucide-react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6">
        <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4 w-full">
          <div className="flex flex-col gap-y-2">
            <Heading level="h3" className="text-lg font-medium text-gray-900">
              Transfer an existing order
            </Heading>
            <Text className="text-gray-600">
              Can't find an order in your account? Enter the order ID to connect it to your profile.
            </Text>
          </div>
          <form
            action={formAction}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-y-2 w-full">
              <Input 
                className="w-full h-12 bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md" 
                name="order_id" 
                placeholder="Enter your order ID"
              />
              <div className="text-xs text-gray-500">
                The order ID can be found in your purchase confirmation email
              </div>
              <SubmitButton
                variant="secondary"
                className="w-full small:w-auto bg-blue-600 hover:bg-blue-700 text-white border-none mt-2"
              >
                <span className="flex items-center gap-2">
                  <FileDown size={16} />
                  Request transfer
                </span>
              </SubmitButton>
            </div>
          </form>
        </div>
        
        {!state.success && state.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center gap-2 text-red-700">
            <XCircle size={16} className="text-red-500" />
            <Text className="text-sm font-medium">
              {state.error}
            </Text>
          </div>
        )}
        
        {showSuccess && (
          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-md flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <CheckCircle size={18} className="text-green-500" />
              <div className="flex flex-col gap-y-1">
                <Text className="text-sm font-medium text-gray-900">
                  Transfer for order {state.order?.id} requested
                </Text>
                <Text className="text-sm text-gray-600">
                  Transfer request email sent to {state.order?.email}
                </Text>
              </div>
            </div>
            <Button
              variant="secondary"
              className="h-8 px-3 border border-gray-200 hover:bg-gray-50 text-sm rounded-md"
              onClick={() => setShowSuccess(false)}
            >
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
