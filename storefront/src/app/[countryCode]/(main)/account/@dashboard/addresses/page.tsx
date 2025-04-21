import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPin, Navigation, Leaf } from "lucide-react"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Your Addresses | Botanical Bricks",
  description: "Manage your shipping addresses for easy checkout with Botanical Bricks.",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12" data-testid="addresses-page-wrapper">
      <div className="mb-10 relative">
        
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#2d711c]">Your Addresses</h1>
        </div>
        
        <p className="text-gray-600 max-w-2xl">
          Manage your shipping destinations. Add multiple addresses to speed up checkout and ensure your botanical bricks arrive exactly where you need them.
        </p>
      </div>
      
      <div className="bg-green-50/30 p-4 rounded-lg border border-green-100 mb-8 flex items-start gap-3">
        <div className="text-green-600 mt-0.5">
          <Navigation size={18} />
        </div>
        <div>
          <h3 className="font-medium text-[#2d711c] mb-1">Delivery Benefits</h3>
          <p className="text-sm text-gray-600">
            Save multiple addresses to quickly ship to friends, family, or alternate locations. Your saved addresses will be available during checkout for a seamless experience.
          </p>
        </div>
      </div>
      
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
