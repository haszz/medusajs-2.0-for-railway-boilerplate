import { Metadata } from "next"
import { User, Mail, Phone, MapPin, Key, Leaf } from "lucide-react"
import React from "react"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

type ProfilePageProps = {
  params: {
    countryCode: string
  }
}

export const metadata: Metadata = {
  title: "Your Profile | Botanical Bricks",
  description: "Manage your account details, update personal information, and keep your profile up to date.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12" data-testid="profile-page-wrapper">
      <div className="mb-10 relative">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#2d711c] mb-3 relative">Your Profile</h1>
        <p className="text-gray-600 max-w-2xl">
          View and update your personal information. Complete your profile to enhance your shopping experience.
        </p>
      </div>
      
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileSection icon={<User />} title="Name" description="Manage how your name appears on your account">
          <ProfileName customer={customer} />
        </ProfileSection>
        
        <ProfileSection icon={<Mail />} title="Email" description="Your email is used for notifications and account access">
          <ProfileEmail customer={customer} />
        </ProfileSection>
        
        <ProfileSection icon={<Phone />} title="Phone" description="Add a phone number for order updates and delivery notifications">
          <ProfilePhone customer={customer} />
        </ProfileSection>
        
        <ProfileSection 
          icon={<MapPin />} 
          title="Billing Address" 
          description="Your billing address is used for processing orders and generating invoices"
          large
        >
          <ProfileBillingAddress customer={customer} regions={regions} />
        </ProfileSection>
        
        <ProfileSection 
          icon={<Key />} 
          title="Password" 
          description="Keep your account secure by regularly updating your password"
        >
          <ProfilePassword customer={customer} />
        </ProfileSection>
      </div>
    </div>
  )
}

const ProfileSection = ({ 
  icon, 
  title, 
  children,
  description,
  large
}: { 
  icon: React.ReactNode, 
  title: string, 
  children: React.ReactNode,
  description?: string,
  large?: boolean
}) => {
  return (
    <div className={`bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-md ${large ? 'hover:border-green-200/70' : 'hover:border-green-100'}`}>
      <div className="flex items-center gap-x-3 mb-6 pb-4 border-b border-gray-100">
      <div className="p-2">
      <div className="w-5 h-5 text-[#2d711c]">{icon}</div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
