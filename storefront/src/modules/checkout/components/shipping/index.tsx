"use client"

import { RadioGroup, Radio } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Truck, Package, Store, MapPin, CheckCircle, Loader as LoaderIcon, Pencil } from "lucide-react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: any): string {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => (sm as any).service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => (sm as any).service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[(p as any).value?.id || ""] = (p as any).value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }
    } else {
      setIsLoadingPrices(false)
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="w-full">
      {isOpen ? (
        <div className="space-y-8">
          <div>

            
            <div className="bg-white border border-gray-200 rounded-lg p-5" data-testid="delivery-options-container">
              <div className="mb-4">
                <Text className="font-medium text-gray-800 mb-1">
                  Shipping Options
                </Text>
                <Text className="text-sm text-gray-500">
                  Choose how you'd like your order delivered
                </Text>
              </div>

              {hasPickupOptions && (
                <div className="mb-4">
                  <RadioGroup
                    value={showPickupOptions}
                    onChange={(value) => {
                      const id = _pickupMethods.find(
                        (option) => !(option as any).insufficient_inventory
                      )?.id

                      if (id) {
                        handleSetShippingMethod(id, "pickup")
                      }
                    }}
                  >
                    <Radio
                      value={PICKUP_OPTION_ON}
                      data-testid="delivery-option-radio"
                      className={clx(
                        "flex items-center justify-between text-sm py-3 px-4 rounded-md border transition-all duration-200 mb-2",
                        {
                          "border-[#2d711c] bg-green-50/50 shadow-sm": showPickupOptions === PICKUP_OPTION_ON,
                          "border-gray-200 hover:border-gray-300 hover:bg-gray-50": showPickupOptions !== PICKUP_OPTION_ON
                        }
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={clx(
                          "w-5 h-5 flex items-center justify-center rounded-full border transition-colors",
                          showPickupOptions === PICKUP_OPTION_ON 
                            ? "border-[#2d711c] bg-[#2d711c] text-white" 
                            : "border-gray-300"
                        )}>
                          {showPickupOptions === PICKUP_OPTION_ON && <CheckCircle size={12} />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Store size={18} className={showPickupOptions === PICKUP_OPTION_ON ? "text-[#2d711c]" : "text-gray-500"} />
                          <span className="font-medium">Pick up in store</span>
                        </div>
                      </div>
                      <span className="text-[#2d711c] font-medium">Free</span>
                    </Radio>
                  </RadioGroup>
                </div>
              )}

              <RadioGroup
                value={shippingMethodId || ""}
                onChange={(v) => handleSetShippingMethod(v, "shipping")}
              >
                <div className="space-y-2">
                  {_shippingMethods?.map((option) => {
                    const isDisabled =
                      option.price_type === "calculated" &&
                      !isLoadingPrices &&
                      typeof calculatedPricesMap[option.id] !== "number";
                      
                    const isSelected = option.id === shippingMethodId;

                    return (
                      <Radio
                        key={option.id}
                        value={option.id}
                        data-testid="delivery-option-radio"
                        disabled={isDisabled}
                        className={clx(
                          "flex items-center justify-between py-3 px-4 rounded-md border transition-all duration-200",
                          {
                            "border-[#2d711c] bg-green-50/50 shadow-sm": isSelected,
                            "border-gray-200 hover:border-gray-300 hover:bg-gray-50": !isSelected && !isDisabled,
                            "opacity-60 cursor-not-allowed": isDisabled
                          }
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={clx(
                            "w-5 h-5 flex items-center justify-center rounded-full border transition-colors",
                            isSelected 
                              ? "border-[#2d711c] bg-[#2d711c] text-white" 
                              : "border-gray-300"
                          )}>
                            {isSelected && <CheckCircle size={12} />}
                          </div>
                          <div className="flex items-center gap-2">
                            <Package size={18} className={isSelected ? "text-[#2d711c]" : "text-gray-500"} />
                            <span className="font-medium">{option.name}</span>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">
                          {option.price_type === "flat" ? (
                            convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })
                          ) : calculatedPricesMap[option.id] ? (
                            convertToLocale({
                              amount: calculatedPricesMap[option.id],
                              currency_code: cart?.currency_code,
                            })
                          ) : isLoadingPrices ? (
                            <div className="animate-spin text-[#2d711c]">
                              <LoaderIcon size={16} />
                            </div>
                          ) : (
                            "-"
                          )}
                        </span>
                      </Radio>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-[#2d711c]">
                  <Store size={16} />
                </div>
                <h2 className="text-lg font-medium text-gray-900">Pickup Location</h2>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5" data-testid="pickup-options-container">
                <div className="mb-4">
                  <Text className="font-medium text-gray-800 mb-1">
                    Available Stores
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Select a store near you for pickup
                  </Text>
                </div>
                
                <RadioGroup
                  value={shippingMethodId || ""}
                  onChange={(v) => handleSetShippingMethod(v, "pickup")}
                >
                  <div className="space-y-2">
                    {_pickupMethods?.map((option) => {
                      const isDisabled = !!(option as any).insufficient_inventory;
                      const isSelected = option.id === shippingMethodId;
                      
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={isDisabled}
                          data-testid="pickup-option-radio"
                          className={clx(
                            "flex items-start justify-between py-3 px-4 rounded-md border transition-all duration-200",
                            {
                              "border-[#2d711c] bg-green-50/50 shadow-sm": isSelected,
                              "border-gray-200 hover:border-gray-300 hover:bg-gray-50": !isSelected && !isDisabled,
                              "opacity-60 cursor-not-allowed": isDisabled
                            }
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={clx(
                              "w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center rounded-full border transition-colors",
                              isSelected 
                                ? "border-[#2d711c] bg-[#2d711c] text-white" 
                                : "border-gray-300"
                            )}>
                              {isSelected && <CheckCircle size={12} />}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Store size={16} className={isSelected ? "text-[#2d711c]" : "text-gray-500"} />
                                <span className="font-medium">{option.name}</span>
                              </div>
                              {(option as any).service_zone?.fulfillment_set?.location?.address && (
                                <div className="flex items-start gap-1.5 mt-1 text-sm text-gray-500">
                                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                                  <span>
                                    {formatAddress((option as any).service_zone?.fulfillment_set?.location?.address)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="font-medium text-gray-900">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                        </Radio>
                      )
                    })}
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage
              error={error}
              data-testid="delivery-option-error-message"
            />
            <Button
              size="large"
              className="w-full sm:w-auto bg-[#2d711c] hover:bg-[#25601a] text-white mt-4"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!shippingMethodId}
              data-testid="submit-delivery-option-button"
            >
              Continue to payment
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(cart.shipping_methods?.[0] as any)?.service_zone?.fulfillment_set?.type === "pickup" ? (
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
                    <Store size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#2d711c]">
                    <Package size={20} />
                  </div>
                )}
                <div>
                  <Text className="font-medium text-gray-900 mb-0.5">
                    {cart.shipping_methods?.at(-1)?.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Delivery method
                  </Text>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Text className="font-medium text-gray-900">
                  {cart.shipping_methods?.[0]?.amount !== undefined && (
                    convertToLocale({
                      amount: cart.shipping_methods?.[0]?.amount || 0,
                      currency_code: cart?.currency_code || "",
                    })
                  )}
                </Text>
                <button
                  onClick={handleEdit}
                  className="text-sm text-[#2d711c] hover:text-[#25601a] font-medium flex items-center gap-1.5 mt-1"
                  data-testid="edit-delivery-button"
                >
                  <Pencil size={14} />
                  Change
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Shipping
