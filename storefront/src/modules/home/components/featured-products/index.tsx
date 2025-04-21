import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { Heading } from "@medusajs/ui"
import Image from "next/image"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return (
    <div className="relative overflow-hidden pb-16">
      {/* Top gradient transition to blend with white area above - enhanced for mobile */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Additional mobile-specific soft gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-5 pointer-events-none sm:hidden"></div>
      
      {/* Section header */}
      <div className="relative mb-6 sm:mb-12 pt-8 sm:pt-16">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Heading level="h2" className="text-2xl sm:text-3xl font-bold text-[#2d711c] mb-2 sm:mb-3">Botanical Brick Collections</Heading>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Explore our nature-inspired brick sets that bring the beauty of the outdoors inside, all year round.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-20 hidden md:block pointer-events-none">
          <Image 
            src="/plants/10.png" 
            alt="Decorative plant" 
            width={120} 
            height={120}
            className="transform rotate-12"
          />
        </div>
        <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 opacity-20 hidden md:block pointer-events-none">
          <Image 
            src="/plants/12.png" 
            alt="Decorative plant" 
            width={100} 
            height={100}
            className="transform -rotate-15"
          />
        </div>
        
        {/* Mobile-only small decorative element */}
        <div className="absolute top-1 right-3 opacity-15 block sm:hidden pointer-events-none">
          <Image 
            src="/plants/11.png" 
            alt="Decorative plant" 
            width={70} 
            height={70}
            className="transform rotate-12"
          />
        </div>
      </div>
      
      {/* Subtle background gradient - enhanced for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 via-transparent to-amber-50/20 pointer-events-none"></div>

      {/* Floating particles for decoration - optimized for mobile with fewer particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Visible on all screen sizes */}
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-100 opacity-60 animate-float-random"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
        
        {/* Hidden on mobile */}
        <div className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 rounded-full bg-rose-100 opacity-40 animate-float-random hidden sm:block"></div>
      </div>
      
      {/* Collections list */}
      <div className="relative z-10">
        {collections.map((collection) => (
          <div key={collection.id} className="mb-8 sm:mb-16">
            <ProductRail collection={collection} region={region} />
          </div>
        ))}
      </div>
    </div>
  )
}
