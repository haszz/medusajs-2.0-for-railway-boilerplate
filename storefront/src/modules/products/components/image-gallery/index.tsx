"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [goToNext, goToPrevious])

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-full p-12 bg-ui-bg-subtle rounded-lg">
        <p className="text-ui-fg-subtle">No images available</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start relative">
      {/* Main carousel image */}
      <div className="w-full relative mb-4">
        <div className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle rounded-lg shadow-sm border border-gray-100/50">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-amber-50/10 z-0"></div>
          
          {images[currentImageIndex]?.url && (
            <Image
              src={images[currentImageIndex].url}
              priority={true}
              className="absolute inset-0 object-contain object-center z-10"
              alt={`Product image ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            />
          )}
          
          {/* Image counter indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium z-30 text-gray-700">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-700 hover:text-[#2d711c] hover:bg-white rounded-full p-2 shadow-md z-30 transition-all duration-200"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-700 hover:text-[#2d711c] hover:bg-white rounded-full p-2 shadow-md z-30 transition-all duration-200"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 w-full no-scrollbar pl-0.5">
          {images.map((image, index) => (
            <button 
              key={image.id}
              className={`relative flex-shrink-0 w-20 h-20 cursor-pointer rounded-md overflow-hidden ${
                index === 0 ? "ml-0.5" : ""
              } ${
                currentImageIndex === index 
                  ? "ring-2 ring-[#2d711c] shadow-sm" 
                  : "ring-1 ring-gray-200 opacity-70 hover:opacity-100 hover:ring-green-100"
              }`}
              onClick={() => goToImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={currentImageIndex === index ? "true" : "false"}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-amber-50/20 z-0"></div>
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain object-center z-10 p-1"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
