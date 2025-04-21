import { Heading, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 px-4 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <div className="mb-6 relative">
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2d711c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        </div>
      </div>
      
      <Heading
        level="h1"
        className="text-3xl font-medium text-[#2d711c] mb-4"
      >
        Your Cart is Empty
      </Heading>
      
      <Text className="text-base-regular mb-8 max-w-[460px] text-gray-600">
        Looks like you haven't added any botanical creations to your cart yet. 
        Explore our collection to find the perfect brick-built botanical sets for your home or office.
      </Text>
      
      <LocalizedClientLink href="/store" className="bg-[#2d711c] hover:bg-[#3a8c26] transition-colors duration-200 text-white rounded-full py-3 px-6">
        <div className="flex items-center gap-x-2 font-medium">
          <span>Explore Botanical Collection</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
      </div>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
