import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Checkout | Bricks Botanical Collection",
  description: "Complete your order from our unique botanical collection - handcrafted for plant lovers.",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="relative min-h-[calc(100vh-80px)]">

      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-transparent pointer-events-none" aria-hidden="true"></div>
      
      {/* Page content */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-8 sm:mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">Complete Your Order</h1>
            <p className="text-gray-500 mt-2">Please review your information before placing the order</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <PaymentWrapper cart={cart}>
                <CheckoutForm cart={cart} customer={customer} />
              </PaymentWrapper>
            </div>
            
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <CheckoutSummary cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
