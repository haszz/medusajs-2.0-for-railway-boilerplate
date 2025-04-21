import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import { MapPin, Truck, CreditCard, ClipboardCheck } from "lucide-react"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

type CheckoutFormProps = {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}

export default async function CheckoutForm({
  cart,
  customer,
}: CheckoutFormProps) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  // Checkout steps configuration
  const steps = [
    {
      id: "address",
      title: "Delivery Address",
      icon: MapPin,
      component: <Addresses cart={cart} customer={customer} />,
    },
    {
      id: "shipping",
      title: "Shipping Method",
      icon: Truck,
      component: <Shipping cart={cart} availableShippingMethods={shippingMethods} />,
    },
    {
      id: "payment",
      title: "Payment Details",
      icon: CreditCard,
      component: <Payment cart={cart} availablePaymentMethods={paymentMethods} />,
    },
    {
      id: "review",
      title: "Review Order",
      icon: ClipboardCheck,
      component: <Review cart={cart} />,
    },
  ]

  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-1 gap-y-8">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className="bg-white rounded-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-[#2d711c]">
                <step.icon size={16} />
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-gray-900">{step.title}</span>
                {index > 0 && (
                  <div className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    Step {index + 1}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-2">
              {step.component}
            </div>
            
            {index < steps.length - 1 && (
              <div className="border-t border-dashed border-gray-200 my-6" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
