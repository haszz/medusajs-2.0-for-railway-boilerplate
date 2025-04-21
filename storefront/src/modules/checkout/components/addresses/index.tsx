"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import { CheckCircle, Pencil, MapPin, Phone, Mail, Home } from "lucide-react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="w-full">
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-6">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <Home className="w-4 h-4 text-[#2d711c]" />
                  <h2 className="text-lg font-medium text-gray-900">Billing Address</h2>
                </div>

                <BillingAddress cart={cart} />
              </div>
            )}
            
            <div className="mt-8">
              <SubmitButton className="w-full sm:w-auto bg-[#2d711c] hover:bg-[#25601a]" data-testid="submit-address-button">
                Continue to delivery
              </SubmitButton>
              <ErrorMessage error={message} data-testid="address-error-message" />
            </div>
          </div>
        </form>
      ) : (
        <div>
          {cart && cart.shipping_address ? (
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Shipping Address */}
                <div className="flex flex-col" data-testid="shipping-address-summary">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-[#2d711c]" />
                    <Text className="font-medium text-gray-800">Shipping Address</Text>
                  </div>
                  <div className="ml-6 space-y-1 text-gray-600 text-sm">
                    <p>
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </p>
                    <p>
                      {cart.shipping_address.address_1}
                      {cart.shipping_address.address_2 && (
                        <span>, {cart.shipping_address.address_2}</span>
                      )}
                    </p>
                    <p>
                      {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                    </p>
                    <p>
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col" data-testid="shipping-contact-summary">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone size={16} className="text-[#2d711c]" />
                    <Text className="font-medium text-gray-800">Contact</Text>
                  </div>
                  <div className="ml-6 space-y-1 text-gray-600 text-sm">
                    {cart.shipping_address.phone && (
                      <div className="flex items-center gap-1.5">
                        <p>{cart.shipping_address.phone}</p>
                      </div>
                    )}
                    {cart.email && (
                      <div className="flex items-center gap-1.5">
                        <p className="break-all">{cart.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Billing Address */}
                <div className="flex flex-col" data-testid="billing-address-summary">
                  <div className="flex items-center gap-2 mb-3">
                    <Home size={16} className="text-[#2d711c]" />
                    <Text className="font-medium text-gray-800">Billing Address</Text>
                  </div>
                  <div className="ml-6 space-y-1 text-gray-600 text-sm">
                    {sameAsBilling ? (
                      <p className="italic">
                        Same as shipping address
                      </p>
                    ) : (
                      <>
                        <p>
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </p>
                        <p>
                          {cart.billing_address?.address_1}
                          {cart.billing_address?.address_2 && (
                            <span>, {cart.billing_address?.address_2}</span>
                          )}
                        </p>
                        <p>
                          {cart.billing_address?.postal_code}, {cart.billing_address?.city}
                        </p>
                        <p>
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  data-testid="edit-address-button"
                >
                  <Pencil size={14} className="text-[#2d711c]" />
                  Edit Addresses
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Addresses
