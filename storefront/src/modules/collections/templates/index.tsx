import { Suspense } from "react"
import Image from "next/image"
import { Heading } from "@medusajs/ui"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import MobileFilterToggle from "@modules/store/components/mobile-filter-toggle"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Custom subtitle for collections
  const getCollectionSubtitle = (title: string) => {
    if (title.toLowerCase() === "featured") {
      return "Discover our selection of exceptional botanical sets"
    }
    return `Browse our ${title} collection`
  }

  return (
    <div className="relative overflow-hidden pb-24 pt-16 sm:pt-20 md:pt-24">
      {/* Hero banner section for collection page */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 mb-12 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-amber-50/50 to-white"></div>
        
        {/* Top gradient overlay to blend with nav gradient */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Decorative plant images */}
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 opacity-20 hidden md:block pointer-events-none">
          <Image 
            src="/plants/6.png" 
            alt="Decorative plant" 
            width={200} 
            height={200}
            className="transform rotate-12"
          />
        </div>
        <div className="absolute bottom-0 left-0 transform -translate-x-1/4 opacity-20 hidden md:block pointer-events-none">
          <Image 
            src="/plants/4.png" 
            alt="Decorative plant" 
            width={180} 
            height={180}
            className="transform -rotate-6"
          />
        </div>
        
        {/* Mobile-only small decorative element */}
        <div className="absolute top-1/4 right-4 opacity-15 block sm:hidden pointer-events-none">
          <Image 
            src="/plants/7.png" 
            alt="Decorative plant" 
            width={70} 
            height={70}
            className="transform rotate-12"
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-100 opacity-60 animate-float-random"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
          <div className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 rounded-full bg-rose-100 opacity-40 animate-float-random hidden sm:block"></div>
        </div>
        
        {/* Banner content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-5 pt-12 sm:pt-8">
          <Heading level="h1" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d711c] mb-4">
            {collection.title}
          </Heading>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-xl">
            {getCollectionSubtitle(collection.title)}
          </p>
        </div>
      </div>
      
      {/* Main content area */}
      <div
        className="content-container relative py-6 gap-8"
        data-testid="collection-container"
      >
        {/* Mobile filter toggle - only visible on small screens */}
        <div className="block sm:hidden mb-6">
          <MobileFilterToggle sortBy={sort} />
        </div>

        {/* Content container with desktop filters */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          {/* Filter sidebar with improved styling - hidden on mobile, visible on desktop */}
          <div className="hidden sm:block w-auto sm:min-w-[220px] md:min-w-[240px] lg:min-w-[280px]">
            <div className="bg-gradient-to-br from-green-50/50 to-amber-50/30 backdrop-blur-sm rounded-lg shadow-sm border border-green-100/50 p-4 sticky top-20">
              <h2 className="font-medium text-[#2d711c] text-lg mb-4 border-b border-green-100/50 pb-2">Refine Selection</h2>
              <RefinementList sortBy={sort} />
            </div>
          </div>
          
          {/* Product content area */}
          <div className="w-full">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h2 className="text-xl sm:text-2xl font-medium text-[#2d711c] mb-2 sm:mb-0">
                {collection.title.toLowerCase() === "featured" ? "Our Selection" : collection.title}
              </h2>
              <span className="text-sm text-gray-500">
                {collection.products?.length || 0} products
              </span>
            </div>
            
            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={collection.products?.length}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                collectionId={collection.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
