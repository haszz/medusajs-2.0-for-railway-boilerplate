import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { PostStoreCreateRestockSubscription } from "./validators"
import { MedusaError } from "@medusajs/framework/utils"
import { createRestockSubscriptionWorkflow } from "../../../workflows/create-restock-subscription"
import { RESTOCK_MODULE } from "../../../modules/restock"
import RestockModuleService from "../../../modules/restock/service"

type PostStoreCreateRestockSubscription = z.infer<
  typeof PostStoreCreateRestockSubscription
>

export async function POST(
  req: AuthenticatedMedusaRequest<PostStoreCreateRestockSubscription>,
  res: MedusaResponse
) {
  const salesChannelId = req.validatedBody.sales_channel_id || (
    req.publishable_key_context?.sales_channel_ids?.length ? 
      req.publishable_key_context?.sales_channel_ids[0] : undefined
  )
  if (!salesChannelId) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "At least one sales channel ID is required, either associated with the publishable API key or in the request body."
    )
  }

  const restockModuleService: RestockModuleService = req.scope.resolve(
    RESTOCK_MODULE
  )

  const existingSubscriptions = await restockModuleService.listRestockSubscriptions({
    email: req.validatedBody.email,
    variant_id: req.validatedBody.variant_id,
    sales_channel_id: salesChannelId,
  }, { take: 1 })

  if (existingSubscriptions && existingSubscriptions.length > 0) {
    throw new MedusaError(
      MedusaError.Types.CONFLICT,
      "You are already subscribed to restock notifications for this item."
    )
  }

  const { result } = await createRestockSubscriptionWorkflow(req.scope)
    .run({
      input: {
        variant_id: req.validatedBody.variant_id,
        sales_channel_id: salesChannelId,
        customer: {
          email: req.validatedBody.email,
          customer_id: req.auth_context?.actor_id
        }
      }
    })

  return res.sendStatus(201)
}
