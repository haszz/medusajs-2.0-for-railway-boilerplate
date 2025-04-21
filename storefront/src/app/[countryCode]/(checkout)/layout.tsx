import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b shadow-sm">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0 transition-colors duration-200 hover:text-[#2d711c]"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90 text-[#2d711c]" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base transition-all duration-200">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base transition-all duration-200">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-center transition-transform hover:scale-105 duration-300"
            data-testid="store-link"
          >
            <Image 
              src="/images/logo.svg" 
              alt="Flower Bricks Logo" 
              width={140} 
              height={40} 
              className="h-auto"
            />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative bg-gradient-to-b from-amber-50/30 to-white" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-6 w-full flex items-center justify-center border-t mt-8 bg-gray-50">
        <MedusaCTA />
      </div>
    </div>
  )
}
