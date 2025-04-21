"use client"

import { Button, Heading } from "@medusajs/ui"
import { useEffect, useState, useActionState } from "react"
import { Home, PlusCircle, MapPin } from "lucide-react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
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

  return (
    <>
      <button
        className="border border-green-100 rounded-lg p-6 min-h-[220px] h-full w-full flex flex-col items-center justify-center gap-4 transition-all duration-200 hover:border-green-200 hover:bg-green-50/30 hover:shadow-sm group"
        onClick={open}
        data-testid="add-address-button"
      >
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c] group-hover:bg-green-100 transition-all duration-200">
          <PlusCircle size={24} />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Add a new address</h3>
          <p className="text-sm text-gray-500">Create a new shipping destination</p>
        </div>
      </button>

      <Modal isOpen={state} close={close} size="large" data-testid="add-address-modal">
        <Modal.Title>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
              <Home size={18} />
            </div>
            <Heading>Add new address</Heading>
          </div>
        </Modal.Title>
        <form action={formAction}>
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
                      data-testid="first-name-input"
                    />
                    <Input
                      label="Last name"
                      name="last_name"
                      required
                      autoComplete="family-name"
                      data-testid="last-name-input"
                    />
                  </div>
                  <Input
                    label="Company"
                    name="company"
                    autoComplete="organization"
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
                    data-testid="address-1-input"
                  />
                  <Input
                    label="Apartment, suite, etc."
                    name="address_2"
                    autoComplete="address-line2"
                    data-testid="address-2-input"
                  />
                  <div className="grid grid-cols-1 small:grid-cols-2 gap-x-4 gap-y-3">
                    <Input
                      label="Postal code"
                      name="postal_code"
                      required
                      autoComplete="postal-code"
                      data-testid="postal-code-input"
                    />
                    <Input
                      label="City"
                      name="city"
                      required
                      autoComplete="locality"
                      data-testid="city-input"
                    />
                  </div>
                  <Input
                    label="Province / State"
                    name="province"
                    autoComplete="address-level1"
                    data-testid="state-input"
                  />
                  <CountrySelect
                    region={region}
                    label="Country"
                    name="country_code"
                    required
                    autoComplete="country"
                    data-testid="country-select"
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    data-testid="phone-input"
                  />
                </div>
              </div>
            </div>
            {formState.error && (
              <div
                className="text-rose-500 text-sm font-medium py-2 mt-3"
                data-testid="address-error"
              >
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
                Save address
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
