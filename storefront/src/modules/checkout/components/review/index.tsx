"use client"

import { Text } from "@medusajs/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { ClipboardCheck, ShieldCheck } from "lucide-react"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="w-full">
      {isOpen && previousStepsCompleted && (
        <div className="space-y-6">

          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-start gap-4 mb-6">
              <div className="mt-1 text-green-600 flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <Text className="text-sm text-gray-600 leading-relaxed">
                  By clicking the Place Order button, you confirm that you have
                  read, understand and accept our <span className="text-[#2d711c] font-medium hover:underline cursor-pointer">Terms of Use</span>, <span className="text-[#2d711c] font-medium hover:underline cursor-pointer">Terms of Sale</span> and
                  <span className="text-[#2d711c] font-medium hover:underline cursor-pointer"> Returns Policy</span> and acknowledge that you have read Bricks Botanical Collection's <span className="text-[#2d711c] font-medium hover:underline cursor-pointer">Privacy Policy</span>.
                </Text>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <PaymentButton 
                cart={cart} 
                data-testid="submit-order-button"
                className="w-full sm:w-auto bg-[#2d711c] hover:bg-[#25601a] text-white"
              />
              <p className="text-xs text-gray-500 mt-3">
                Your order will be processed securely. You can review all details before placing your order.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
