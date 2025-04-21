"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"
import { clx } from "@medusajs/ui"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    shipping_subtotal?: number | null
    items?: Array<any>  // Add items to allow manual subtotal calculation
  }
  className?: string
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals, className }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
    items,
  } = totals

  // Calculate true subtotal from items if available, otherwise use provided subtotal
  const calculatedSubtotal = items?.reduce((sum, item) => sum + (item.total || 0), 0) || subtotal || 0;
  
  // Only use shipping_subtotal if it's defined, otherwise use 0
  const shippingCost = shipping_subtotal || 0;
  
  return (
    <div className={className}>
      <div className="flex flex-col gap-y-2 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            Subtotal (excl. shipping and taxes)
          </span>
          <span className="font-medium" data-testid="cart-subtotal" data-value={calculatedSubtotal}>
            {convertToLocale({ amount: calculatedSubtotal, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-green-600"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shippingCost}>
            {convertToLocale({ amount: shippingCost, currency_code })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-green-600"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-900">Total</span>
        <span
          className="text-xl text-[#2d711c]"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
