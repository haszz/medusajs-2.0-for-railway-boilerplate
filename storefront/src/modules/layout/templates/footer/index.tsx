import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full relative overflow-hidden border-t border-green-100">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/30 to-green-50/50 pointer-events-none"></div>
      
      {/* Decorative elements - small plant images in corners */}
      <div className="absolute bottom-0 left-0 opacity-20 w-32 h-32 pointer-events-none">
        <Image 
          src="/plants/alone.png" 
          alt="Decorative plant" 
          width={130} 
          height={130}
          className="transform rotate-[30deg]"
        />
      </div>
      <div className="absolute top-10 right-0 opacity-15 w-40 h-40 pointer-events-none">
        <Image 
          src="/plants/alone2.png" 
          alt="Decorative plant" 
          width={160} 
          height={160}
          className="transform rotate-[-15deg]"
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-amber-100 opacity-60 animate-float-random"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 rounded-full bg-rose-100 opacity-40 animate-float-random"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
        <div className="absolute top-1/6 right-1/6 w-1 h-1 rounded-full bg-amber-100 opacity-40 animate-float-random"></div>
      </div>
      
      {/* Main content container */}
      <div className="content-container flex flex-col w-full relative z-10">
        <div className="flex flex-col gap-y-8 xsmall:flex-row items-start justify-between py-16">
          {/* Logo and company info */}
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="text-[#2d711c] hover:text-[#235915] text-xl font-semibold uppercase transition-colors duration-200"
            >
              Flower Bricks
            </LocalizedClientLink>
            <div className="max-w-xs text-sm text-gray-600">
              <p>Creating beautiful botanical brick sets that bring nature into your home, season after season.</p>
            </div>
            <div className="flex gap-x-4 mt-2">
              <a href="#" className="text-[#2d711c] hover:text-[#235915] transition-colors duration-200">
                <InstagramIcon />
              </a>
              <a href="#" className="text-[#2d711c] hover:text-[#235915] transition-colors duration-200">
                <FacebookIcon />
              </a>
              <a href="#" className="text-[#2d711c] hover:text-[#235915] transition-colors duration-200">
                <TwitterIcon />
              </a>
              <a href="#" className="text-[#2d711c] hover:text-[#235915] transition-colors duration-200">
                <PinterestIcon />
              </a>
            </div>
          </div>
          
          {/* Links section */}
          <div className="text-small-regular gap-8 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[#2d711c] font-medium">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-gray-600 text-sm"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-[#2d711c] transition-colors duration-200",
                            children && "font-medium"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-[#2d711c] transition-colors duration-200"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="text-[#2d711c] font-medium">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-gray-600 text-sm",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-[#2d711c] transition-colors duration-200"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="text-[#2d711c] font-medium">Quick Links</span>
              <ul className="grid grid-cols-1 gap-2 text-gray-600 text-sm">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="hover:text-[#2d711c] transition-colors duration-200"
                  >
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-[#2d711c] transition-colors duration-200"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/faq"
                    className="hover:text-[#2d711c] transition-colors duration-200"
                  >
                    FAQ
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/shipping"
                    className="hover:text-[#2d711c] transition-colors duration-200"
                  >
                    Shipping Policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/returns"
                    className="hover:text-[#2d711c] transition-colors duration-200"
                  >
                    Returns
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="flex flex-col sm:flex-row w-full py-6 gap-y-4 justify-between items-center text-gray-500 border-t border-green-100/50">
          <Text className="text-xs">
            © {new Date().getFullYear()} Flower Bricks. All rights reserved.
          </Text>
          <div className="flex gap-x-6 text-xs">
            <LocalizedClientLink href="/privacy" className="hover:text-[#2d711c] transition-colors duration-200">
              Privacy Policy
            </LocalizedClientLink>
            <LocalizedClientLink href="/terms" className="hover:text-[#2d711c] transition-colors duration-200">
              Terms of Service
            </LocalizedClientLink>
            <LocalizedClientLink href="/cookies" className="hover:text-[#2d711c] transition-colors duration-200">
              Cookie Policy
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social media icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
)

const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)
