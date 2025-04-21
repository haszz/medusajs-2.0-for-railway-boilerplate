import Image from "next/image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import clsx from "clsx"
import { forwardRef } from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: Array<{ url: string } | string>
  size?: "small" | "medium" | "large" | "full"
  isFeatured?: boolean
  className?: string
}

const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ thumbnail, images, size = "small", isFeatured = false, className, ...props }, ref) => {
    const initialImage = thumbnail || images?.[0]

    return (
      <div
        ref={ref}
        {...props}
        className={clsx(
          "relative overflow-hidden bg-ui-bg-subtle rounded-lg border border-green-100/40 group-hover:border-green-200/60 shadow-sm group-hover:shadow-md transition-all duration-300",
          {
            "aspect-[11/14]": isFeatured,
            "aspect-[9/12]": !isFeatured && size !== "small",
            "aspect-square": size === "small",
            "w-[80px]": size === "small",
            "w-[180px]": size === "medium",
            "w-[290px]": size === "large",
            "w-full": size === "full",
          },
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-amber-50/10"></div>
        
        {initialImage ? (
          <Image
            src={
              typeof initialImage === "string"
                ? initialImage
                : initialImage.url
            }
            alt="Thumbnail"
            className="absolute inset-0 object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            priority={isFeatured}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PlaceholderImage size={36} />
          </div>
        )}
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
          <div className="absolute -inset-full top-0 h-full w-1/3 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
        </div>
      </div>
    )
  }
)

Thumbnail.displayName = "Thumbnail"

export default Thumbnail
