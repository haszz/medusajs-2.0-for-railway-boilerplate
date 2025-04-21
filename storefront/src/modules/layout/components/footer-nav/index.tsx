import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { getCategoriesList, getCollectionsList } from "@lib/data"

export default async function FooterNav() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <div className="border-t border-green-100/50 bg-gradient-to-b from-white to-green-50/30">
      <div className="content-container flex flex-col">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-10">
          <div className="flex flex-col gap-y-4 text-small-regular">
            <Text className="font-medium text-[#2d711c]">Collections</Text>
            <ul className="grid grid-cols-1 gap-2">
              {collections?.map((collection: any) => (
                <li key={collection.id}>
                  <LocalizedClientLink
                    className="text-ui-fg-subtle hover:text-[#2d711c] transition-colors duration-200"
                    href={`/collections/${collection.handle}`}
                  >
                    {collection.title}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-4 text-small-regular">
            <Text className="font-medium text-[#2d711c]">Categories</Text>
            <ul className="grid grid-cols-1 gap-2">
              {product_categories?.map((category: HttpTypes.StoreProductCategory) => (
                <li key={category.id}>
                  <LocalizedClientLink
                    className="text-ui-fg-subtle hover:text-[#2d711c] transition-colors duration-200"
                    href={`/categories/${category.handle}`}
                  >
                    {category.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-4 text-small-regular">
            <Text className="font-medium text-[#2d711c]">About</Text>
            <ul className="grid grid-cols-1 gap-2">
              <li>
                <LocalizedClientLink
                  className="text-ui-fg-subtle hover:text-[#2d711c] transition-colors duration-200"
                  href="/about"
                >
                  About Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="text-ui-fg-subtle hover:text-[#2d711c] transition-colors duration-200"
                  href="/terms-and-conditions"
                >
                  Terms & Conditions
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="text-ui-fg-subtle hover:text-[#2d711c] transition-colors duration-200"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="text-ui-fg-subtle hover:text-[#2d711c] transition-colors duration-200"
                  href="/shipping-policy"
                >
                  Shipping Policy
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-y-4">
            <Text className="font-medium text-[#2d711c]">Bricks Botanical</Text>
            <div className="flex items-center gap-x-2">
              <Image 
                src="/plants/5.png" 
                alt="Botanical leaf" 
                width={60}
                height={60}
                className="opacity-70" 
              />
              <div className="text-ui-fg-subtle text-sm">
                <p>Build, create, and grow.</p>
                <p>Inspired by nature.</p>
              </div>
            </div>
            <div className="flex gap-x-3 mt-2">
              <a href="https://instagram.com" className="text-ui-fg-subtle hover:text-[#2d711c]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" className="text-ui-fg-subtle hover:text-[#2d711c]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-ui-fg-subtle hover:text-[#2d711c]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="text-xsmall-regular">
            © {new Date().getFullYear()} Bricks Botanical. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  )
} 