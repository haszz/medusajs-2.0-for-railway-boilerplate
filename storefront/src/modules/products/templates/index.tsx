import React, { Suspense } from "react"
import Image from "next/image"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40">
      {/* Top gradient and decorative elements */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-100 opacity-60 animate-float-random"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-rose-100 opacity-40 animate-float-random hidden md:block"></div>
      </div>

      {/* Product main content */}
      <div
        className="content-container flex flex-col md:flex-row md:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Product info section */}
        <div className="flex flex-col md:sticky md:top-32 md:py-0 md:max-w-[300px] w-full py-8 gap-y-6 order-2 md:order-1">
          <div className="bg-gradient-to-br from-green-50/50 to-amber-50/30 backdrop-blur-sm rounded-lg border border-green-100/50 p-6">
            <ProductInfo product={product} />
            <div className="mt-8">
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
        
        {/* Image gallery */}
        <div className="block w-full relative order-1 md:order-2 md:px-8">
          <div className="rounded-lg overflow-hidden border border-green-100/30 shadow-sm">
            <ImageGallery images={product?.images || []} />
          </div>
        </div>
        
        {/* Product actions */}
        <div className="flex flex-col md:sticky md:top-32 md:py-0 md:max-w-[300px] w-full py-8 gap-y-8 order-3">
          <div className="bg-gradient-to-br from-green-50/50 to-amber-50/30 backdrop-blur-sm rounded-lg border border-green-100/50 p-6">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
          
          <div className="hidden md:block">
            <ProductOnboardingCta />
          </div>
        </div>
      </div>
      
      {/* Related products section */}
      <div className="relative">
        <div 
          className="content-container my-16 md:my-24"
          data-testid="related-products-container"
        >
          <div className="relative pb-2 mb-8">
            <h2 className="text-2xl font-medium text-[#2d711c] border-b border-green-100 pb-2">Complete Your Collection</h2>
            <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-[#2d711c]"></div>
          </div>
          
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
