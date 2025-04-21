"use client"

import { Button } from "@medusajs/ui"
import { useMemo } from "react"
import { ShoppingBag, ArrowRight, Calendar, DollarSign, Package } from "lucide-react"
import { useParams } from "next/navigation"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const params = useParams()
  const locale = params?.countryCode === 'fr' ? 'fr-FR' : 'en-US'
  
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  const getOrderStatusColor = (status: string | null) => {
    switch (status) {
      case "fulfilled":
        return "bg-green-50 text-green-700 border-green-200";
      case "not_fulfilled":
      case "partially_fulfilled":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "canceled":
        return "bg-red-50 text-red-700 border-red-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getOrderStatusText = (status: string | null) => {
    console.log("status", status)
    switch (status) {
      case "fulfilled":
        return "Completed";
      case "not_fulfilled":
        return "Processing";
      case "partially_fulfilled":
        return "Partially Fulfilled";
      case "canceled":
        return "Canceled";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200 hover:shadow-sm p-5" data-testid="order-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <ShoppingBag className="w-4 h-4 text-[#2d711c]" />
          <div className="font-medium text-gray-900 text-lg">
            Order #<span data-testid="order-display-id">{order.display_id}</span>
          </div>
          <div className={`text-xs px-2 py-0.5 rounded-full ${getOrderStatusColor(order.fulfillment_status)}`}>
            {getOrderStatusText(order.fulfillment_status)}
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1" data-testid="order-created-at">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(order.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1" data-testid="order-amount">
            <DollarSign className="w-3.5 h-3.5" />
            <span>
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="w-3.5 h-3.5" />
            <span>{`${numberOfLines} ${numberOfLines > 1 ? "items" : "item"}`}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 small:grid-cols-4 gap-3 my-4">
        {order.items?.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2 bg-gray-50/50 p-2 rounded-md"
              data-testid="order-item"
            >
              <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span
                  className="font-medium truncate flex-1"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2 text-gray-500">×</span>
                <span className="ml-1" data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          )
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50/50 p-2 rounded-md">
            <span className="text-sm text-gray-700 font-medium">
              + {numberOfProducts - 3}
            </span>
            <span className="text-xs text-gray-500">more items</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button 
            data-testid="order-details-link" 
            variant="secondary"
            className="border border-green-200 text-[#2d711c] hover:bg-green-50/50 font-medium rounded-md transition-colors flex items-center gap-1"
          >
            View details
            <ArrowRight size={16} />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
