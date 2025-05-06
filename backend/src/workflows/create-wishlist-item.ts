import { createWorkflow, WorkflowResponse, transform } from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { validateWishlistSalesChannelStep } from "./steps/validate-wishlist-sales-channel"
import { createWishlistItemStep } from "./steps/create-wishlist-item"
import { validateVariantWishlistStep } from "./steps/validate-variant-wishlist"
import { MedusaError } from "@medusajs/framework/utils"
import { type WishlistOutputDTO } from "./create-wishlist"
import { createWishlistWorkflow } from "./create-wishlist"

type CreateWishlistItemWorkflowInput = {
  variant_id: string
  customer_id: string
  sales_channel_id: string
}

type CreateWishlistWorkflowOutputType = { wishlist: WishlistOutputDTO }

export const createWishlistItemWorkflow: any = createWorkflow<
  CreateWishlistItemWorkflowInput,
  { wishlist: WishlistOutputDTO },
  any[]
>("create-wishlist-item", (input: CreateWishlistItemWorkflowInput) => {
  const existingWishlistQueryResult = useQueryGraphStep({
    entity: "wishlist",
    fields: ["*", "items.*"],
    filters: {
      customer_id: input.customer_id,
    },
  })

  const processedWishlistData = transform(
    { existingWishlistQueryResult, inputFromWorkflow: input },
    async (data) => {
      const wishlistEntity = data.existingWishlistQueryResult.data?.[0] as WishlistOutputDTO | undefined;

      if (!wishlistEntity) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          "No wishlist found for this customer (transform check)."
        );
      }
      return { targetWishlist: wishlistEntity };
    }
  );

  const targetWishlist = processedWishlistData.targetWishlist;

  validateWishlistSalesChannelStep({
    wishlist: targetWishlist,
    sales_channel_id: input.sales_channel_id,
  });

  validateVariantWishlistStep({
    variant_id: input.variant_id,
    sales_channel_id: input.sales_channel_id,
    wishlist: targetWishlist,
  });

  createWishlistItemStep({
    product_variant_id: input.variant_id,
    wishlist_id: targetWishlist.id,
  });

  const { data: updatedWishlists } = useQueryGraphStep({
    entity: "wishlist",
    fields: ["*", "items.*", "items.product_variant.*"],
    filters: {
      id: targetWishlist.id,
    },
  }).config({ name: "refetch-wishlist" });

  if (!updatedWishlists?.[0]) {
    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      "Failed to refetch the updated wishlist."
    );
  }

  return new WorkflowResponse({
    wishlist: updatedWishlists[0] as WishlistOutputDTO,
  });
});