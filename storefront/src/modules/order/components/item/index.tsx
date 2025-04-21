import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <>
      <div className="sm:col-span-6 flex items-center gap-4">
        <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
          <Thumbnail 
            thumbnail={item.thumbnail} 
            size="full"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Text
            className="font-medium text-gray-900"
            data-testid="product-name"
          >
            {item.title}
          </Text>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        </div>
      </div>

      <div className="sm:col-span-2 flex items-center sm:justify-center mt-2 sm:mt-0">
        <div className="flex sm:inline-flex items-center justify-center px-2.5 py-1 bg-gray-50 rounded-md">
          <Text className="text-gray-700 font-medium text-sm">
            <span data-testid="product-quantity">{item.quantity}</span>
          </Text>
        </div>
      </div>

      <div className="sm:col-span-4 flex flex-col items-start sm:items-end mt-2 sm:mt-0">
        <div>
          <span className="text-sm text-gray-500 mr-1.5 sm:hidden">Subtotal:</span>
          <span className="text-gray-900 font-medium">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1 border-t border-gray-100 pt-1 sm:border-0 sm:pt-0">
          <span className="mr-1">Unit price:</span>
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </div>
    </>
  )
}

export default Item
