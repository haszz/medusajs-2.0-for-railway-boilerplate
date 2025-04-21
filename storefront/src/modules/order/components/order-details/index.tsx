"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { Mail, Calendar, ShoppingBag, CreditCard, Truck, Info } from "lucide-react"
import { useParams } from "next/navigation"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const params = useParams()
  const locale = params?.countryCode === 'fr' ? 'fr-FR' : 'en-US'
  
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  const getStatusColor = (status: string | null) => {

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
      case "captured":
        return "bg-green-50 text-green-700 border-green-200";
      case "awaiting":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "refunded":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "authorized":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
          <Info className="h-4 w-4 text-[#2d711c]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Order Information</h3>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email</div>
                <div className="text-sm font-medium text-gray-900 break-all" data-testid="order-email">
                  {order.email}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order Date</div>
                <div className="text-sm font-medium text-gray-900" data-testid="order-date">
                  {new Date(order.created_at).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="h-4 w-4 text-[#2d711c]" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order ID</div>
                <div className="text-sm font-medium text-[#2d711c]" data-testid="order-id">
                  #{order.display_id}
                </div>
              </div>
            </div>
          </div>

          {showStatus && (
            <div className="mt-5 pt-5 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order Status</div>
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full inline-flex border ${getStatusColor(order.fulfillment_status)}`} data-testid="order-status">
                      {formatStatus(order.fulfillment_status || "unknown")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Payment Status</div>
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full inline-flex border ${getStatusColor(order.payment_status)}`} data-testid="order-payment-status">
                      {formatStatus(order.payment_status || "awaiting")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
