"use client"

import React, { useEffect, useState, useActionState } from "react"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { MapPin, Home, Pencil, Trash2, Building } from "lucide-react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
    setShowRemoveConfirm(false)
  }

  return (
    <>
      <div
        className={clx(
          "border rounded-lg p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-all duration-200 hover:shadow-sm",
          {
            "border-[#2d711c] bg-green-50/30": isActive,
            "border-gray-200 hover:border-green-200": !isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Building size={16} className="text-[#2d711c]" />
            <Heading
              className="text-left text-base-semi text-gray-800"
              data-testid="address-name"
            >
              {address.first_name} {address.last_name}
            </Heading>
          </div>
          {address.company && (
            <Text
              className="text-sm text-gray-600 ml-6 -mt-1 mb-1"
              data-testid="address-company"
            >
              {address.company}
            </Text>
          )}
          <div className="flex mt-2">
            <MapPin size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
            <Text className="flex flex-col text-left text-sm text-gray-600">
              <span data-testid="address-address">
                {address.address_1}
                {address.address_2 && <span>, {address.address_2}</span>}
              </span>
              <span data-testid="address-postal-city">
                {address.postal_code}, {address.city}
              </span>
              <span data-testid="address-province-country">
                {address.province && `${address.province}, `}
                {address.country_code?.toUpperCase()}
              </span>
              {address.phone && (
                <span className="text-gray-500 mt-1">
                  📞 {address.phone}
                </span>
              )}
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-x-4 mt-4 pt-3 border-t border-gray-100">
          <button
            className="text-sm text-gray-700 flex items-center gap-x-2 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-150"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Pencil size={14} className="text-[#2d711c]" />
            Edit
          </button>
          <button
            className="text-sm text-gray-700 flex items-center gap-x-2 px-3 py-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
            onClick={() => setShowRemoveConfirm(true)}
            data-testid="address-delete-button"
          >
            <Trash2 size={14} className="text-red-500" />
            Remove
          </button>
        </div>
      </div>

      {/* Address removal confirmation popup */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 mx-4 animate-slideUp">
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Remove Address</h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to remove this address?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={() => setShowRemoveConfirm(false)}
                className="py-2.5 px-4 border border-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors order-2 sm:order-1 sm:flex-1"
              >
                Cancel
              </button>
              <button
                onClick={removeAddress}
                disabled={removing}
                className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors order-1 sm:order-2 sm:flex-1 disabled:opacity-70"
              >
                {removing ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Spinner />
                    Removing...
                  </span>
                ) : (
                  "Remove Address"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={state} close={close} size="large" data-testid="edit-address-modal">
        <Modal.Title>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
              <Home size={18} />
            </div>
            <Heading>Edit address</Heading>
          </div>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="flex flex-col gap-y-4">
              <div className="bg-green-50/50 p-4 rounded-md border border-green-100 mb-2">
                <h3 className="text-sm font-medium text-[#2d711c] mb-3 flex items-center gap-2">
                  <MapPin size={14} />
                  <span>Personal Information</span>
                </h3>
                <div className="grid grid-cols-1 gap-y-3">
                  <div className="grid grid-cols-1 small:grid-cols-2 gap-x-4 gap-y-3">
                    <Input
                      label="First name"
                      name="first_name"
                      required
                      autoComplete="given-name"
                      defaultValue={address.first_name || undefined}
                      data-testid="first-name-input"
                    />
                    <Input
                      label="Last name"
                      name="last_name"
                      required
                      autoComplete="family-name"
                      defaultValue={address.last_name || undefined}
                      data-testid="last-name-input"
                    />
                  </div>
                  <Input
                    label="Company"
                    name="company"
                    autoComplete="organization"
                    defaultValue={address.company || undefined}
                    data-testid="company-input"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50/50 p-4 rounded-md border border-blue-100">
                <h3 className="text-sm font-medium text-blue-700 mb-3">Address Details</h3>
                <div className="grid grid-cols-1 gap-y-3">
                  <Input
                    label="Address"
                    name="address_1"
                    required
                    autoComplete="address-line1"
                    defaultValue={address.address_1 || undefined}
                    data-testid="address-1-input"
                  />
                  <Input
                    label="Apartment, suite, etc."
                    name="address_2"
                    autoComplete="address-line2"
                    defaultValue={address.address_2 || undefined}
                    data-testid="address-2-input"
                  />
                  <div className="grid grid-cols-1 small:grid-cols-2 gap-x-4 gap-y-3">
                    <Input
                      label="Postal code"
                      name="postal_code"
                      required
                      autoComplete="postal-code"
                      defaultValue={address.postal_code || undefined}
                      data-testid="postal-code-input"
                    />
                    <Input
                      label="City"
                      name="city"
                      required
                      autoComplete="locality"
                      defaultValue={address.city || undefined}
                      data-testid="city-input"
                    />
                  </div>
                  <Input
                    label="Province / State"
                    name="province"
                    autoComplete="address-level1"
                    defaultValue={address.province || undefined}
                    data-testid="state-input"
                  />
                  <CountrySelect
                    name="country_code"
                    label="Country"
                    region={region}
                    required
                    autoComplete="country"
                    defaultValue={address.country_code || undefined}
                    data-testid="country-select"
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    defaultValue={address.phone || undefined}
                    data-testid="phone-input"
                  />
                </div>
              </div>
            </div>
            {formState.error && (
              <div className="text-rose-500 text-sm font-medium py-2 mt-3">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 w-full small:w-auto">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10 border border-gray-200 hover:bg-gray-50 w-1/2 small:w-auto"
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton 
                className="bg-[#2d711c] hover:bg-[#25601a] w-1/2 small:w-auto"
                data-testid="save-button"
              >
                Save changes
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
