"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"
import { ArrowLeft, Leaf, Package } from "lucide-react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-6">
      <div className="relative">
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-50 flex-shrink-0 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#2d711c]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#2d711c]">
              Order #{order.display_id}
            </h1>
          </div>
          <LocalizedClientLink
            href="/account/orders"
            className="flex gap-2 items-center text-gray-600 hover:text-[#2d711c] transition-colors duration-150 text-sm font-medium"
            data-testid="back-to-overview-button"
          >
            <ArrowLeft size={16} /> Back to orders
          </LocalizedClientLink>
        </div>
        
        <div className="text-gray-600 mt-2 text-sm">
          Thank you for your order. Below you'll find all details related to your purchase.
        </div>
      </div>
      
      <div
        className="flex flex-col gap-6"
        data-testid="order-details-container"
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <OrderDetails order={order} showStatus />
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <Items order={order} />
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <ShippingDetails order={order} />
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <OrderSummary order={order} />
        </div>
        
        <div className="bg-green-50/50 rounded-lg border border-green-100 p-6">
          <Help />
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
