import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { validateCustomerCreateWishlistStep } from "./steps/validate-customer-create-wishlist"
import { createWishlistStep } from "./steps/create-wishlist"

// Define a basic DTO for the wishlist if not already available
// You might want to import this from your module's types if it exists
interface WishlistOutputDTO { // Renamed for clarity, this is what the workflow outputs
  id: string;
  customer_id: string;
  sales_channel_id: string;
  // Add other relevant fields, especially if 'items' are returned and typed
  items?: any[]; 
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