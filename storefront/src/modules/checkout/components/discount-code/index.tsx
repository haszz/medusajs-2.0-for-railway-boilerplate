"use client"

import { Badge, Heading, Input, Label, Text, Tooltip } from "@medusajs/ui"
import React, { useActionState } from "react";

import { applyPromotions, submitPromotionForm } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { InformationCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"
import { ChevronUp, Plus, Tag } from "lucide-react"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { items = [], promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code === undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code === undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    await applyPromotions(codes)

    if (input) {
      input.value = ""
    }
  }

  const [message, formAction] = useActionState(submitPromotionForm, null)

  return (
    <div className="w-full flex flex-col">
      <div className="txt-medium">
        <form action={(a) => addPromotionCode(a)} className="w-full mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="flex items-center gap-x-2 text-[#2d711c] hover:text-[#3a8c26] font-medium text-sm transition-colors duration-200 mb-3"
            data-testid="add-discount-button"
          >
            {isOpen ? (
              <ChevronUp size={18} strokeWidth={2} />
            ) : (
              <Tag size={18} strokeWidth={2} />
            )}
            <span>{isOpen ? "Hide promotion code form" : "Add Promotion Code"}</span>
          </button>

          {isOpen && (
            <>
              <div className="flex w-full gap-x-2 mb-2">
                <Input
                  className="size-full border border-gray-200 focus:border-green-200 focus:ring-green-200 rounded-md"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  autoFocus={false}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  className="h-10 px-4 bg-white border border-[#2d711c] text-[#2d711c] hover:bg-green-50/30 transition-colors duration-200 rounded-md"
                  data-testid="discount-apply-button"
                >
                  Apply
                </SubmitButton>
              </div>

              <ErrorMessage
                error={message}
                data-testid="discount-error-message"
              />
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center mb-2">
            <div className="flex flex-col w-full">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Promotion(s) applied:
              </Text>

              <div className="bg-green-50/50 rounded-md p-3">
                {promotions.map((promotion) => {
                  return (
                    <div
                      key={promotion.id}
                      className="flex items-center justify-between w-full max-w-full mb-2 last:mb-0"
                      data-testid="discount-row"
                    >
                      <Text className="flex gap-x-1 items-center text-sm w-4/5 pr-1">
                        <Tag size={16} className="text-[#2d711c]" />
                        <span className="truncate font-medium text-gray-700" data-testid="discount-code">
                          {promotion.code}{" "}
                          <span className="text-gray-500 font-normal">
                          (
                          {promotion.application_method?.value !== undefined &&
                            promotion.application_method.currency_code !==
                              undefined && (
                              <>
                                {promotion.application_method.type ===
                                "percentage"
                                  ? `${promotion.application_method.value}%`
                                  : convertToLocale({
                                      amount: promotion.application_method.value,
                                      currency_code:
                                        promotion.application_method
                                          .currency_code,
                                    })}
                              </>
                            )}
                          )
                          </span>
                        </span>
                      </Text>
                      {!promotion.is_automatic && (
                        <button
                          className="flex items-center justify-center h-6 w-6 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors duration-200"
                          onClick={() => {
                            if (!promotion.code) {
                              return
                            }

                            removePromotionCode(promotion.code)
                          }}
                          data-testid="remove-discount-button"
                        >
                          <Trash size={14} />
                          <span className="sr-only">
                            Remove discount code from order
                          </span>
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
