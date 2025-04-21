import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table, clx } from "@medusajs/ui"
import { Leaf } from "lucide-react"

import Divider from "@modules/common/components/divider"
import Item from "@modules/order/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const items = order.items

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
          <Leaf className="h-4 w-4 text-[#2d711c]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Your Items</h3>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="sm:col-span-6">Product</div>
          <div className="sm:col-span-2 text-center">Quantity</div>
          <div className="sm:col-span-4 text-right">Subtotal</div>
        </div>
        
        <Divider className="!my-0 sm:hidden" />
        
        <div className="divide-y divide-gray-100" data-testid="products-table">
          {items && items.length > 0
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item, index) => {
                  return (
                    <div key={item.id} className={clx(
                      "flex flex-col sm:grid sm:grid-cols-12 px-4 py-4 gap-y-2",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    )}>
                      <Item
                        item={item}
                        currencyCode={order.currency_code}
                      />
                    </div>
                  )
                })
            : repeat(5).map((i) => {
                return (
                  <div key={i} className="px-4 py-4">
                    <SkeletonLineItem />
                  </div>
                )
              })}
        </div>
        
        {items && items.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600">Total Items:</span>
              <span className="font-semibold text-[#2d711c]">{items.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Items
