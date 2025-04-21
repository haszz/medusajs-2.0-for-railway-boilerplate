"use client"

import { Button } from "@medusajs/ui"
import { ShoppingBag, ExternalLink } from "lucide-react"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="last:mb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-6 py-12 px-4 border border-dashed border-gray-200 rounded-lg bg-gray-50/50"
      data-testid="no-orders-container"
    >
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
        <ShoppingBag size={28} />
      </div>
      <div className="flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">No orders yet</h2>
        <p className="text-gray-600 max-w-sm mb-6">
          You haven't placed any orders yet. Browse our botanical collection to find the perfect brick sets for your projects.
        </p>
        <LocalizedClientLink href="/" passHref>
          <Button 
            data-testid="continue-shopping-button"
            className="bg-[#2d711c] hover:bg-[#25601a] text-white font-medium px-6 py-3 rounded-md flex items-center gap-2"
          >
            Browse collection
            <ExternalLink size={16} />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
