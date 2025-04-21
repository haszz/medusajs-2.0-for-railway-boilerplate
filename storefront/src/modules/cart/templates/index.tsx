import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="pt-24 sm:pt-32 md:pt-40 pb-16 relative overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-100 opacity-60 animate-float-random"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-rose-100 opacity-40 animate-float-random hidden md:block"></div>
      </div>
      
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-6 small:gap-12">
            <div className="flex flex-col">
              {/* Sign in prompt - appears outside the main cart container */}
              {!customer && (
                <SignInPrompt />
              )}
              
              {/* Main cart items container */}
              <div className="flex flex-col bg-gradient-to-br from-white to-green-50/20 rounded-lg shadow-sm border border-green-100/30 py-6 px-6">
                <ItemsTemplate cart={cart} />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-32">
                {cart && cart.region && (
                  <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-lg shadow-sm border border-amber-100/30 p-6">
                    <Summary cart={cart as any} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-green-50/20 rounded-lg shadow-sm border border-green-100/30 py-6 px-6">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
