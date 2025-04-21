import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { LifeBuoy, ArrowRight, RotateCcw, Mail } from "lucide-react"

const Help = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1.5 rounded-full bg-green-50 flex-shrink-0 flex items-center justify-center">
          <LifeBuoy className="w-4 h-4 text-[#2d711c]" />
        </div>
        <Heading className="text-lg font-semibold text-gray-900">Need Help With Your Order?</Heading>
      </div>
      
      <p className="text-gray-600 mb-4">
        Our team is here to help with any questions about your order. Contact us through any of the following methods.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LocalizedClientLink 
          href="/contact"
          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#2d711c] hover:bg-green-50/30 transition-all duration-200"
        >
          <div className="p-2 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">Contact Support</div>
            <div className="text-sm text-gray-500">Get help with your order</div>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
        </LocalizedClientLink>
        
        <LocalizedClientLink 
          href="/contact"
          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#2d711c] hover:bg-green-50/30 transition-all duration-200"
        >
          <div className="p-2 rounded-full bg-amber-50 flex-shrink-0 flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900">Returns & Exchanges</div>
            <div className="text-sm text-gray-500">Learn about our return policy</div>
          </div>
          <ArrowRight size={16} className="text-gray-400" />
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
