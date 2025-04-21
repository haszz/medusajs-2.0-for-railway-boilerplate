import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { ArrowRightMini } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })
  
  const filteredPricedProducts = pricedProducts.filter(
    (product) => product.collection_id === collection.id
  )
  
  if (!filteredPricedProducts || filteredPricedProducts.length === 0) {
    return null
  }

  // Safely get description from metadata if it exists
  const description = collection.metadata && 
    typeof collection.metadata === 'object' && 
    'description' in collection.metadata && 
    typeof collection.metadata.description === 'string' 
      ? collection.metadata.description 
      : null

  return (
    <div className="content-container py-6 sm:py-8">
      <div className="relative">
        {/* Collection header with improved styling and mobile optimization */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 sm:mb-8 border-b border-green-100/50 sm:border-green-100 pb-3 sm:pb-4">
          <div className="flex-grow pr-16 sm:pr-0">
            <Text className="text-lg sm:text-xl md:text-2xl font-medium text-[#2d711c] mb-0.5 sm:mb-1">{collection.title}</Text>
            
            {/* Mobile-optimized description that shows as one line with ellipsis */}
            {description && (
              <>
                <p className="text-xs text-gray-600 max-w-xl mt-0.5 line-clamp-1 sm:hidden">
                  {description}
                </p>
                <p className="text-sm text-gray-600 max-w-xl mt-1 hidden sm:block">
                  {description}
                </p>
              </>
            )}
          </div>
          <LocalizedClientLink 
            href={`/collections/${collection.handle}`}
            className="flex items-center gap-x-1 sm:gap-x-2 text-xs sm:text-sm font-medium text-[#2d711c] hover:text-[#235915] transition-colors duration-200 group mt-0 absolute top-1 right-0 sm:static"
          >
            <span>View all</span>
            <ArrowRightMini className="transition-transform group-hover:translate-x-1 w-4 h-4 sm:w-5 sm:h-5" />
          </LocalizedClientLink>
        </div>
        
        {/* Product grid with improved styling - mobile optimized */}
        <div className="relative">
          {/* Scroll indicator for mobile */}
          <div className="w-full overflow-x-auto pb-4 sm:pb-0 sm:overflow-visible xs:hidden">
            <ul className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 min-w-[640px]">
              {filteredPricedProducts.map((product) => (
                <li key={product.id} className="transform transition-transform hover:-translate-y-1 duration-300 w-40 sm:w-auto flex-shrink-0">
                  <ProductPreview product={product} region={region} isFeatured />
                </li>
              ))}
            </ul>
          </div>
          
          {/* Regular grid for larger screens */}
          <div className="hidden xs:block">
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
              {filteredPricedProducts.map((product) => (
                <li key={product.id} className="transform transition-transform hover:-translate-y-1 duration-300">
                  <ProductPreview product={product} region={region} isFeatured />
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hover effect for empty spaces to indicate more products */}
          {filteredPricedProducts.length >= 4 && (
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-green-50 to-amber-50 opacity-50 hidden lg:block"></div>
          )}
        </div>
      </div>
    </div>
  )
}
