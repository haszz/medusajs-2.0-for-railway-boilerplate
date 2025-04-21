import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { MapPin, Phone, Mail, Truck } from "lucide-react"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
          <Truck className="h-4 w-4 text-[#2d711c]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Delivery Information</h3>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="flex flex-col" data-testid="shipping-address-summary">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-[#2d711c]" />
              <Text className="font-medium text-gray-800">Shipping Address</Text>
            </div>
            <div className="ml-6 space-y-1">
              <Text className="text-gray-700">
                {order.shipping_address?.first_name}{" "}
                {order.shipping_address?.last_name}
              </Text>
              <Text className="text-gray-700">
                {order.shipping_address?.address_1}
                {order.shipping_address?.address_2 && (
                  <span>, {order.shipping_address?.address_2}</span>
                )}
              </Text>
              <Text className="text-gray-700">
                {order.shipping_address?.postal_code}, {order.shipping_address?.city}
              </Text>
              <Text className="text-gray-700">
                {order.shipping_address?.country_code?.toUpperCase()}
              </Text>
            </div>
          </div>

          <div className="flex flex-col" data-testid="shipping-contact-summary">
            <div className="flex items-center gap-2 mb-3">
              <Phone size={16} className="text-[#2d711c]" />
              <Text className="font-medium text-gray-800">Contact Details</Text>
            </div>
            <div className="ml-6 space-y-1">
              {order.shipping_address?.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={14} className="text-gray-400" />
                  <Text className="text-gray-700">{order.shipping_address?.phone}</Text>
                </div>
              )}
              {order.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={14} className="text-gray-400" />
                  <Text className="text-gray-700">{order.email}</Text>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col" data-testid="shipping-method-summary">
            <div className="flex items-center gap-2 mb-3">
              <Truck size={16} className="text-[#2d711c]" />
              <Text className="font-medium text-gray-800">Shipping Method</Text>
            </div>
            <div className="ml-6">
              <div className="inline-flex px-3 py-1.5 bg-green-50 rounded-lg text-[#2d711c] text-sm font-medium">
                {(order as any).shipping_methods[0]?.name}{" "}
                <span className="ml-1 text-gray-600">
                  (
                  {convertToLocale({
                    amount: order.shipping_methods?.[0].total ?? 0,
                    currency_code: order.currency_code,
                  })
                    .replace(/,/g, "")
                    .replace(/\./g, ",")}
                  )
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
