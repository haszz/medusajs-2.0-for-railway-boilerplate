import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import clsx from "clsx"

type ProductPreviewProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  isFeatured?: boolean
}

export default async function ProductPreview({
  product,
  region,
  isFeatured = false,
}: ProductPreviewProps) {
  // Check if product is botanical collection
  const isBotanical = product.collection?.handle === "botanical" || 
                     product.tags?.some(t => t.value.toLowerCase().includes("botanical"))

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg">
        <Thumbnail thumbnail={product.thumbnail} size="full" isFeatured={isFeatured} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isBotanical && (
          <div className="absolute top-3 right-3">
            <div className="bg-green-100/80 backdrop-blur-sm text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Botanical
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 px-1">
        <Text className={clsx("text-ui-fg-base font-medium group-hover:text-green-800 transition-colors duration-200", {
          "text-lg": isFeatured,
          "text-base": !isFeatured,
        })}>
          {product.title}
        </Text>
        <div className="mt-1.5 flex items-center gap-2">
          <Text className="text-ui-fg-base font-medium">
            From {region.currency_code.toUpperCase()} XX.XX
          </Text>
          
          {product.collection && (
            <Text className="text-ui-fg-subtle text-sm">
              {product.collection.title}
            </Text>
          )}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags?.slice(0, 3).map((tag) => (
            <span 
              key={tag.id} 
              className="text-xs text-ui-fg-subtle bg-green-50 text-green-800 px-2 py-1 rounded-full"
            >
              {tag.value}
            </span>
          ))}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
