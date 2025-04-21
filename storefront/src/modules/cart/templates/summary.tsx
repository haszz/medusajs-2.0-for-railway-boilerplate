"use client"

import { Button, Heading, Text } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const itemCount = cart.items?.length || 0

  return (
    <div className="flex flex-col gap-y-4">
      <div className="pb-2 border-b border-green-100/50">
        <Heading level="h2" className="text-2xl font-medium text-[#2d711c]">
          Order Summary
      </Heading>
        <Text className="text-sm text-gray-600 mt-1">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </Text>
      </div>
      
      {/* <div className="bg-green-50/50 rounded-md p-3 mb-2">
        <div className="flex items-center gap-2 text-[#2d711c]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span className="text-sm font-medium">Free shipping on orders over $50</span>
        </div>
      </div>
       */}
      <DiscountCode cart={cart} />
      <Divider className="bg-green-100/50" />
      <CartTotals totals={cart} />
      
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-12 bg-[#2d711c] hover:bg-[#3a8c26] text-white font-medium text-base rounded-full transition-colors duration-200 mt-2">
          <div className="flex items-center justify-center gap-x-2">
            <span>Proceed to Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </Button>
      </LocalizedClientLink>
      
      <div className="flex items-center justify-center gap-x-2 text-gray-500 text-sm mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Secure checkout</span>
      </div>
    </div>
  )
}

export default Summary
