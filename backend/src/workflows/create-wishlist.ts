import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { validateCustomerCreateWishlistStep } from "./steps/validate-customer-create-wishlist"
import { createWishlistStep } from "./steps/create-wishlist"

export interface WishlistOutputDTO { // Renamed for clarity, this is what the workflow outputs
  id: string;
  customer_id: string;
  sales_channel_id: string;
  items: any[]; // Changed from optional to required
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null; // Changed from optional to required, can be null
}

type CreateWishlistWorkflowInput = {
  customer_id: string
  sales_channel_id: string
}

// Using any as a temporary measure if TS cannot name the inferred type from createWorkflow
export const createWishlistWorkflow: any = createWorkflow<CreateWishlistWorkflowInput, { wishlist: WishlistOutputDTO }, any[]>(
  "create-wishlist",
  function (
    input: CreateWishlistWorkflowInput
  ): WorkflowResponse<{ wishlist: WishlistOutputDTO }> { 
    validateCustomerCreateWishlistStep({
      customer_id: input.customer_id
    })

    const wishlist: WishlistOutputDTO = createWishlistStep(input) as WishlistOutputDTO; 

    return new WorkflowResponse({ wishlist });
  }
)