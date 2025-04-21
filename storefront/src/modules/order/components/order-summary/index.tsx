import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Receipt, Tag, CreditCard, Truck, Calculator } from "lucide-react"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return "0.00"
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
          <Receipt className="h-4 w-4 text-[#2d711c]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between text-gray-700 mb-3">
            <span className="font-medium">Subtotal</span>
            <span>{getAmount(order.subtotal)}</span>
          </div>
          
          <div className="space-y-2 text-sm">
            {order.discount_total > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Tag size={14} className="text-[#2d711c]" />
                  <span>Discount</span>
                </div>
                <span className="text-red-600">- {getAmount(order.discount_total)}</span>
              </div>
            )}
            
            {order.gift_card_total > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CreditCard size={14} className="text-[#2d711c]" />
                  <span>Gift card</span>
                </div>
                <span className="text-red-600">- {getAmount(order.gift_card_total)}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#2d711c]" />
                <span>Shipping</span>
              </div>
              <span>{getAmount(order.shipping_total)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Calculator size={14} className="text-[#2d711c]" />
                <span>Taxes</span>
              </div>
              <span>{getAmount(order.tax_total)}</span>
            </div>
          </div>
        </div>
        
        <div className="h-px w-full border-b border-gray-200" />
        
        <div className="bg-gray-50 p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Total</span>
            <span className="text-lg font-semibold text-[#2d711c]">{getAmount(order.total)}</span>
          </div>
          
          {order.payment_status && (
            <div className="mt-3 flex justify-end">
              <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                order.payment_status === "captured" 
                  ? "bg-green-50 text-green-700" 
                  : order.payment_status === "awaiting" 
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-gray-50 text-gray-700"
              }`}>
                {order.payment_status === "captured" 
                  ? "Paid" 
                  : order.payment_status === "awaiting" 
                  ? "Awaiting Payment"
                  : order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
