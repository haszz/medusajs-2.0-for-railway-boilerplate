"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { CreditCard, CheckCircle, Gift, Wallet, Pencil } from "lucide-react"

type PaymentProps = {
  cart: any
  availablePaymentMethods: any[]
}

const Payment = ({ cart, availablePaymentMethods }: PaymentProps) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(selectedPaymentMethod)

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeFunc(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="w-full">
      {isOpen ? (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="mb-4">
              <Text className="font-medium text-gray-800 mb-1">
                Payment Method
              </Text>
              <Text className="text-sm text-gray-500">
                Choose how you'd like to pay for your order
              </Text>
            </div>

            {!paidByGiftcard && availablePaymentMethods?.length ? (
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
                className="space-y-3"
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id} className={clx(
                    "rounded-md transition-all duration-200",
                    isStripeFunc(paymentMethod.id) ? "overflow-hidden" : ""
                  )}>
                    {isStripeFunc(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <div className="relative">
                        <PaymentContainer
                          paymentInfoMap={paymentInfoMap}
                          paymentProviderId={paymentMethod.id}
                          selectedPaymentOptionId={selectedPaymentMethod}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            ) : paidByGiftcard ? (
              <div className="flex items-center gap-3 py-4 px-5 bg-green-50/50 rounded-md border border-green-100">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Gift size={16} />
                </div>
                <div>
                  <Text className="font-medium text-gray-900">
                    Paid with Gift Card
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Your order has been fully paid with gift card(s)
                  </Text>
                </div>
              </div>
            ) : null}

            <ErrorMessage
              error={error}
              data-testid="payment-method-error-message"
            />

            <div className="mt-5">
              <Button
                size="large"
                className="w-full sm:w-auto bg-[#2d711c] hover:bg-[#25601a] text-white"
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={
                  (isStripe && !cardComplete) ||
                  (!selectedPaymentMethod && !paidByGiftcard)
                }
                data-testid="submit-payment-button"
              >
                {!activeSession && isStripeFunc(selectedPaymentMethod)
                  ? "Enter card details"
                  : "Continue to review"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {cart && paymentReady && (activeSession || paidByGiftcard) ? (
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {paidByGiftcard ? (
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Gift size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
                    <Wallet size={20} />
                  </div>
                )}
                <div>
                  <Text className="font-medium text-gray-900 mb-0.5" data-testid="payment-method-summary">
                    {paidByGiftcard ? (
                      "Paid with Gift Card"
                    ) : (
                      paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id
                    )}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Payment method
                  </Text>
                </div>
              </div>
              
              {!paidByGiftcard && (
                <div className="flex flex-col items-end">
                  <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full" data-testid="payment-details-summary">
                    {paymentInfoMap[selectedPaymentMethod]?.icon ? (
                      <span className="mr-2">{paymentInfoMap[selectedPaymentMethod]?.icon}</span>
                    ) : (
                      <CreditCard size={16} className="mr-2 text-gray-600" />
                    )}
                    <Text className="text-sm font-medium">
                      {isStripeFunc(selectedPaymentMethod) && cardBrand
                        ? cardBrand
                        : "Processing details"}
                    </Text>
                  </div>
                  
                  <button
                    onClick={handleEdit}
                    className="text-sm text-[#2d711c] hover:text-[#25601a] font-medium flex items-center gap-1.5 mt-2"
                    data-testid="edit-payment-button"
                  >
                    <Pencil size={14} />
                    Change
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Payment
