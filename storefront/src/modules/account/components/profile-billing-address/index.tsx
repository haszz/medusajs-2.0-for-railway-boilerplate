"use client"

import React, { useEffect, useMemo, useActionState } from "react"
import { MapPin, Building, Home } from "lucide-react"

import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress, updateCustomerAddress } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  regions: HttpTypes.StoreRegion[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = React.useState(false)

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  const initialState: Record<string, any> = {
    isDefaultBilling: true,
    isDefaultShipping: false,
    error: false,
    success: false,
  }

  if (billingAddress) {
    initialState.addressId = billingAddress.id
  }

  const [state, formAction] = useActionState(
    billingAddress ? updateCustomerAddress : addCustomerAddress,
    initialState
  )

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return (
        <div className="flex items-center text-gray-500 italic gap-2">
          <Home size={16} className="text-gray-400" />
          <span>No billing address added yet</span>
        </div>
      )
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.country_code
      )?.label || billingAddress.country_code?.toUpperCase()

    return (
      <div className="flex flex-col space-y-1 text-gray-700" data-testid="current-info">
        <div className="flex items-center gap-2 text-[#2d711c] font-medium">
          <Building size={15} />
          <span>
            {billingAddress.first_name} {billingAddress.last_name}
          </span>
        </div>
        {billingAddress.company && (
          <div className="flex items-center gap-2 pl-5">
            <span>{billingAddress.company}</span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <MapPin size={15} className="mt-1 text-gray-400 flex-shrink-0" />
          <div className="flex flex-col">
            <span>
              {billingAddress.address_1}
              {billingAddress.address_2 ? `, ${billingAddress.address_2}` : ""}
            </span>
            <span>
              {billingAddress.postal_code}, {billingAddress.city}
              {billingAddress.province ? `, ${billingAddress.province}` : ""}
            </span>
            <span>{country}</span>
          </div>
        </div>
      </div>
    )
  }, [billingAddress, regionOptions])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <input type="hidden" name="addressId" value={billingAddress?.id} />
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-4">
          <div className="bg-green-50/50 p-4 rounded-md border border-green-100">
            <h3 className="text-sm font-medium text-[#2d711c] mb-3">Personal Information</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Input
                label="First name"
                name="first_name"
                defaultValue={billingAddress?.first_name || undefined}
                required
                data-testid="billing-first-name-input"
              />
              <Input
                label="Last name"
                name="last_name"
                defaultValue={billingAddress?.last_name || undefined}
                required
                data-testid="billing-last-name-input"
              />
              <div className="col-span-2">
                <Input
                  label="Company"
                  name="company"
                  defaultValue={billingAddress?.company || undefined}
                  data-testid="billing-company-input"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50/50 p-4 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-blue-700 mb-3">Address Details</h3>
            <div className="grid grid-cols-1 gap-y-3">
              <Input
                label="Address"
                name="address_1"
                defaultValue={billingAddress?.address_1 || undefined}
                required
                data-testid="billing-address-1-input"
              />
              <Input
                label="Apartment, suite, etc."
                name="address_2"
                defaultValue={billingAddress?.address_2 || undefined}
                data-testid="billing-address-2-input"
              />
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Postal code"
                  name="postal_code"
                  defaultValue={billingAddress?.postal_code || undefined}
                  required
                  data-testid="billing-postcal-code-input"
                />
                <Input
                  label="City"
                  name="city"
                  defaultValue={billingAddress?.city || undefined}
                  required
                  data-testid="billing-city-input"
                />
              </div>
              <Input
                label="Province"
                name="province"
                defaultValue={billingAddress?.province || undefined}
                data-testid="billing-province-input"
              />
              <NativeSelect
                label="Country"
                name="country_code"
                defaultValue={billingAddress?.country_code || undefined}
                required
                data-testid="billing-country-code-select"
              >
                <option value="">Select a country</option>
                {regionOptions.map((option, i) => {
                  return (
                    <option key={i} value={option?.value}>
                      {option?.label}
                    </option>
                  )
                })}
              </NativeSelect>
            </div>
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileBillingAddress
