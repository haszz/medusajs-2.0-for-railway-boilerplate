import { Text } from "@medusajs/ui"
import { ShoppingBag, CreditCard, Tag } from "lucide-react"
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal } from "react-icons/fa"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  const itemCount = cart?.items?.length || 0
  
  return (
    <div className="h-fit rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
              <ShoppingBag size={15} />
            </div>
            <Text className="text-lg font-medium text-gray-900">
              Order Summary
            </Text>
          </div>
          <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>
      
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Tag size={14} className="text-[#2d711c]" />
          <Text className="font-medium text-gray-800">
            Your Items
          </Text>
        </div>
        <div className="max-h-[300px] overflow-auto pr-1 -mr-1">
          <ItemsPreviewTemplate cart={cart} />
        </div>
      </div>
      
      <div className="p-6 border-b border-gray-100">
        <CartTotals totals={cart} className="mb-0" />
      </div>
      
      <div className="p-6 border-b border-gray-100">
        <DiscountCode cart={cart} />
      </div>
      
      <div className="p-5 text-center bg-gray-50 rounded-b-lg">
        <Text className="text-xs text-gray-600">
          Shipping and taxes will be calculated at checkout
        </Text>
        <div className="mt-2 flex justify-center gap-3">
          <FaCcVisa size={28} className="text-gray-500" />
          <FaCcMastercard size={28} className="text-gray-500" />
          <FaCcAmex size={28} className="text-gray-500" />
          <FaCcDiscover size={28} className="text-gray-500" />
          <FaCcPaypal size={28} className="text-gray-500" />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
