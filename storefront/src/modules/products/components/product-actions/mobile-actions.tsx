import { Dialog, Transition } from "@headlessui/react"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"
import { ShoppingBag } from "@medusajs/icons"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div
            className="bg-white flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-full w-full border-t border-gray-200 shadow-lg"
            data-testid="mobile-actions"
          >
            <div className="flex items-center gap-x-2 w-full">
              <span className="font-medium text-gray-800 truncate" data-testid="mobile-title">{product.title}</span>
              <span className="text-gray-500">—</span>
              {selectedPrice ? (
                <div className="flex items-end gap-x-2 text-ui-fg-base">
                  {selectedPrice.price_type === "sale" && (
                    <p>
                      <span className="line-through text-small-regular text-gray-500">
                        {selectedPrice.original_price}
                      </span>
                    </p>
                  )}
                  <span
                    className={clx("font-medium", {
                      "text-[#2d711c]":
                        selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className={clx("grid grid-cols-2 w-full gap-x-4", {
              "!grid-cols-1": isSimple
            })}>
              {!isSimple && <Button
                onClick={open}
                variant="secondary"
                className="w-full border-gray-300 hover:bg-gray-50 transition-colors duration-200 h-12 rounded-md"
                data-testid="mobile-actions-button"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-700">
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Select Options"}
                  </span>
                  <ChevronDown className="text-gray-600" />
                </div>
              </Button>}
              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full h-12 rounded-md bg-[#2d711c] hover:bg-[#235915] transition-colors duration-200 text-white font-medium"
                isLoading={isAdding}
                data-testid="mobile-cart-button"
              >
                {isAdding ? (
                  "Adding..."
                ) : !variant ? (
                  "Select variant"
                ) : !inStock ? (
                  "Out of stock"
                ) : (
                  <span className="flex items-center justify-center gap-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to cart
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel
                  className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
                  data-testid="mobile-actions-modal"
                >
                  <div className="w-full flex justify-end pr-6">
                    <button
                      onClick={close}
                      className="bg-white w-12 h-12 rounded-full text-ui-fg-base flex justify-center items-center shadow-md transition-transform hover:scale-105 duration-200"
                      data-testid="close-modal-button"
                    >
                      <X className="text-gray-700" />
                    </button>
                  </div>
                  <div className="bg-white px-6 py-12 rounded-t-2xl shadow-lg">
                    <h3 className="text-xl font-medium text-gray-800 mb-6">Select options</h3>
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                        <Button
                          onClick={() => {
                            close();
                            if (inStock && variant) {
                              handleAddToCart();
                            }
                          }}
                          disabled={!inStock || !variant}
                          className="w-full h-12 mt-4 rounded-md bg-[#2d711c] hover:bg-[#235915] transition-colors duration-200 text-white font-medium"
                          isLoading={isAdding}
                        >
                          {!variant ? "Select variant" : !inStock ? "Out of stock" : "Confirm selection"}
                        </Button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
