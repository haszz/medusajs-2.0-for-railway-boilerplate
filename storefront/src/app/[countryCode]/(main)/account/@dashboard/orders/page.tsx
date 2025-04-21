import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PackageCheck, ShoppingBag, Leaf, ArrowDownSquare } from "lucide-react"

import OrderOverview from "@modules/account/components/order-overview"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Your Orders | Botanical Bricks",
  description: "View and manage your Botanical Bricks orders, track shipments, and request replacements if needed.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full max-w-4xl mx-auto pb-12" data-testid="orders-page-wrapper">
      <div className="mb-10 relative">
        
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-green-50 flex-shrink-0 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-[#2d711c]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#2d711c]">Your Orders</h1>
        </div>
        
        <p className="text-gray-600 max-w-2xl">
          Track and manage your Botanical Bricks orders. Check delivery status, view order details, 
          and request exchanges or returns if needed.
        </p>
      </div>
      
      {orders.length > 0 ? (
        <div className="bg-green-50/30 p-4 rounded-lg border border-green-100 mb-8 flex items-start gap-3">
          <div className="text-green-600 mt-0.5">
            <PackageCheck size={18} />
          </div>
          <div>
            <h3 className="font-medium text-[#2d711c] mb-1">Order Tracking</h3>
            <p className="text-sm text-gray-600">
              Click on any order to view detailed information including shipping status, items purchased, and transaction history.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100 mb-8 flex items-start gap-3">
          <div className="text-amber-600 mt-0.5">
            <ShoppingBag size={18} />
          </div>
          <div>
            <h3 className="font-medium text-amber-700 mb-1">No Orders Yet</h3>
            <p className="text-sm text-gray-600">
              You haven't placed any orders yet. Start shopping our botanical collection to see your orders here.
            </p>
          </div>
        </div>
      )}
      
      <div>
        <OrderOverview orders={orders} />
        
        <Divider className="my-16 border-green-100/50" />
        
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-50 flex-shrink-0 flex items-center justify-center">
            <ArrowDownSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-medium text-gray-800">Transfer Request</h2>
        </div>
        
        <TransferRequestForm />
      </div>
    </div>
  )
}
