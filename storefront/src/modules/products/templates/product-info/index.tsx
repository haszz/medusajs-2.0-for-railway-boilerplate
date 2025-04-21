import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Safely extract metadata values
  const getMetadataValue = (key: string, fallback: string): string => {
    if (!product.metadata || typeof product.metadata !== 'object') {
      return fallback
    }
    
    const metadata = product.metadata as Record<string, unknown>
    return metadata[key] ? String(metadata[key]) : fallback
  }

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4">
        {product.collection && (
          <div className="flex items-center gap-x-2">
            <div className="w-2 h-2 rounded-full bg-[#2d711c]/40"></div>
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="text-sm font-medium text-[#2d711c] hover:text-[#235915] transition-colors"
            >
              {product.collection.title} Collection
            </LocalizedClientLink>
          </div>
        )}
        
        <Heading
          level="h2"
          className="text-2xl sm:text-3xl font-bold text-[#2d711c]"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <Text
          className="text-sm text-gray-700 whitespace-pre-line mt-2"
          data-testid="product-description"
        >
          {product.description}
        </Text>
        
        {/* Additional product details */}
        <div className="mt-4 pt-4 border-t border-green-100">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="block text-gray-500">Pieces</span>
              <span className="font-medium text-gray-700">
                {getMetadataValue('pieces', 'Multiple')}
              </span>
            </div>
            <div>
              <span className="block text-gray-500">Difficulty</span>
              <span className="font-medium text-gray-700">
                {getMetadataValue('difficulty', 'Beginner-friendly')}
              </span>
            </div>
            <div>
              <span className="block text-gray-500">Dimensions</span>
              <span className="font-medium text-gray-700">
                {getMetadataValue('dimensions', 'Varies')}
              </span>
            </div>
            <div>
              <span className="block text-gray-500">Ages</span>
              <span className="font-medium text-gray-700">
                {getMetadataValue('ages', '8+')}
              </span>
            </div>
          </div>
        </div>
        
        {/* Tags if available */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span key={tag.id} className="inline-block bg-green-50 border border-green-100 rounded-full px-2 py-0.5 text-xs text-[#2d711c]">
                {tag.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
