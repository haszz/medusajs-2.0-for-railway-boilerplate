import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import { User } from "@medusajs/icons"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed top-0 inset-x-0 z-40 group">
      {/* Enhanced gradient background that matches hero section */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green-50 via-amber-50/80 to-transparent pointer-events-none"></div>
      
      <header className="relative h-16 mx-auto bg-transparent">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          {/* Logo on left side (desktop/tablet) */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="hidden md:block">
              <LocalizedClientLink
                href="/"
                className="hover:text-ui-fg-base transform transition-transform hover:scale-105 duration-300"
                data-testid="nav-logo-link"
              >
                <div className="flex items-center">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Flower Bricks Logo" 
                    width={150} 
                    height={50} 
                    className="h-auto"
                  />
                </div>
              </LocalizedClientLink>
            </div>
          </div>

          {/* Mobile logo (centered) */}
          <div className="flex md:hidden items-center h-full absolute inset-x-0 justify-center pointer-events-none">
            <LocalizedClientLink
              href="/"
              className="hover:text-ui-fg-base pointer-events-auto transform transition-transform hover:scale-105 duration-300"
              data-testid="nav-logo-link-mobile"
            >
              <div className="flex items-center">
                <Image 
                  src="/images/logo.svg" 
                  alt="Flower Bricks Logo" 
                  width={140} 
                  height={32} 
                  className="h-auto"
                />
              </div>
            </LocalizedClientLink>
          </div>

          {/* Navigation links - hidden on small screens */}
          <div className="hidden lg:flex items-center justify-center gap-x-8 absolute left-1/2 transform -translate-x-1/2">
            <LocalizedClientLink 
              href="/store" 
              className="text-[#2d711c] hover:text-[#235915] font-medium transition-colors duration-200"
            >
              Store
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/collections" 
              className="text-[#2d711c] hover:text-[#235915] font-medium transition-colors duration-200"
            >
              Collections
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/categories" 
              className="text-[#2d711c] hover:text-[#235915] font-medium transition-colors duration-200"
            >
              Categories
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/contact" 
              className="text-[#2d711c] hover:text-[#235915] font-medium transition-colors duration-200"
            >
              Contact
            </LocalizedClientLink>
          </div>

          {/* Right side with account, cart, and menu */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Account - hidden on mobile */}
            <div className="hidden md:flex items-center h-full">
              <LocalizedClientLink
                className="text-[#2d711c] hover:text-[#235915] flex items-center gap-x-2 transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                <User className="text-[#2d711c]" />
                <span>Account</span>
              </LocalizedClientLink>
            </div>
            
            {/* Cart - visible on all screen sizes */}
            <div className="flex items-center h-full">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="text-[#2d711c] hover:text-[#235915] flex items-center gap-x-2 transition-colors duration-200"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <ShoppingBagIcon className="h-5 w-5 text-[#2d711c]" />
                      <span className="hidden md:inline">Cart (0)</span>
                    </div>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
            
            {/* Menu with icon - visible on all screens */}
            <div className="h-full flex items-center">
              <SideMenu regions={regions} />
            </div>
          </div>
        </nav>
      </header>
      
      {/* Floating particles for desktop - hidden on mobile for performance */}
      <div className="absolute inset-x-0 top-0 h-16 overflow-hidden pointer-events-none hidden md:block">
        {/* Small floating particles */}
        <div className="absolute top-3 left-[15%] w-1.5 h-1.5 rounded-full bg-amber-100 opacity-60 animate-float-random"></div>
        <div className="absolute top-10 left-[25%] w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random-alt"></div>
        <div className="absolute top-5 left-[75%] w-1.5 h-1.5 rounded-full bg-rose-100 opacity-40 animate-float-random"></div>
        <div className="absolute top-8 left-[45%] w-1 h-1 rounded-full bg-green-100 opacity-50 animate-float-random"></div>
      </div>
    </div>
  )
}

// ShoppingBagIcon
const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
  </svg>
)
