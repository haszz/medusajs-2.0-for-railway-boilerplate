"use client"

import { Container } from "@medusajs/ui"
import { Flower2, MapPin, ShoppingBag, User, LogOut } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const params = useParams()
  const locale = (params?.countryCode as string) === 'fr' ? 'fr-FR' : 'en-US'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  const handleLogout = async () => {
    await signout(params?.countryCode as string)
  }

  return (
    <div data-testid="overview-page-wrapper" className="px-4 sm:px-8">
      {/* Mobile welcome section */}
      <div className="block small:hidden mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
            <Flower2 className="h-8 w-8 text-[#2d711c]" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-[#2d711c] text-center mb-1">
          Hello {customer?.first_name}!
        </h1>
        <p className="text-sm text-gray-600 text-center">
          Welcome to your Bricks Botanical account
        </p>
      </div>
      
      {/* Desktop welcome section */}
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-6">
          <span 
            className="text-xl font-semibold text-[#2d711c] flex items-center" 
            data-testid="welcome-message" 
            data-value={customer?.first_name}
          >
            <Flower2 className="w-5 h-5 mr-2 text-[#2d711c]" />
            Hello {customer?.first_name}
          </span>
          <span className="text-sm text-gray-600">
            Signed in as:{" "}
            <span
              className="font-medium text-[#2d711c]"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        
        <div className="flex flex-col py-8 border-t border-green-100">
          <div className="flex flex-col gap-y-6 h-full col-span-1 row-span-2 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile completion card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100/50">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="p-2 rounded-full bg-green-50">
                    <User className="w-5 h-5 text-[#2d711c]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Profile</h3>
                </div>
                
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl font-semibold leading-none text-[#2d711c]"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Completed
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-[#2d711c] h-2.5 rounded-full" 
                      style={{ width: `${getProfileCompletion(customer)}%` }}
                    ></div>
                  </div>
                </div>
                
                <LocalizedClientLink href="/account/profile" className="mt-4 inline-block text-sm font-medium text-[#2d711c] hover:text-[#3a8c26]">
                  Complete your profile →
                </LocalizedClientLink>
              </div>

              {/* Addresses card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100/50">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="p-2 rounded-full bg-green-50">
                    <MapPin className="w-5 h-5 text-[#2d711c]" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Addresses</h3>
                </div>
                
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl font-semibold leading-none text-[#2d711c]"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Saved
                  </span>
                </div>
                
                <LocalizedClientLink href="/account/addresses" className="mt-4 inline-block text-sm font-medium text-[#2d711c] hover:text-[#3a8c26]">
                  Manage addresses →
                </LocalizedClientLink>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex items-center gap-x-3 mb-4">
                <div className="p-2 rounded-full bg-green-50">
                  <ShoppingBag className="w-5 h-5 text-[#2d711c]" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">Recent orders</h3>
              </div>
              
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                        className="transition-all duration-200 hover:transform hover:translate-y-[-2px]"
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="bg-white flex justify-between items-center p-5 small:p-5 rounded-lg shadow-sm border border-green-100/50 hover:border-green-200/80 transition-colors duration-200">
                            {/* Mobile order layout */}
                            <div className="grid grid-cols-2 gap-2 w-full small:hidden">
                              <div className="text-xs font-medium text-gray-600">Date:</div>
                              <div className="text-xs text-gray-800">
                                {new Date(order.created_at).toLocaleDateString(locale)}
                              </div>
                              <div className="text-xs font-medium text-gray-600">Order:</div>
                              <div className="text-xs text-[#2d711c] font-medium">
                                #{order.display_id}
                              </div>
                              <div className="text-xs font-medium text-gray-600">Total:</div>
                              <div className="text-xs font-medium text-gray-800">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </div>
                            </div>
                            
                            {/* Desktop order layout */}
                            <div className="hidden small:grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-medium text-gray-600">Date placed</span>
                              <span className="font-medium text-gray-600">
                                Order number
                              </span>
                              <span className="font-medium text-gray-600">
                                Total amount
                              </span>
                              <span className="text-gray-800" data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                className="text-[#2d711c] font-medium"
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span className="font-medium text-gray-800" data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between text-[#2d711c]"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                Go to order #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-6 text-center">
                    <span className="text-amber-800" data-testid="no-orders-message">You haven't placed any orders yet</span>
                    <LocalizedClientLink href="/store" className="mt-2 block text-sm font-medium text-[#2d711c]">
                      Start shopping →
                    </LocalizedClientLink>
                  </div>
                )}
              </ul>
              
              {orders && orders.length > 0 && (
                <LocalizedClientLink 
                  href="/account/orders" 
                  className="mt-4 inline-block text-sm font-medium text-[#2d711c] hover:text-[#3a8c26]"
                >
                  View all orders →
                </LocalizedClientLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile profile and account info */}
      <div className="block small:hidden mt-6">
        {/* Mobile summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Profile completion card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100/50">
            <div className="flex items-center gap-x-2 mb-3">
              <div className="p-1.5 rounded-full bg-green-50">
                <User className="w-3.5 h-3.5 text-[#2d711c]" />
              </div>
              <span className="text-sm font-medium text-gray-800">Profile</span>
            </div>
            
            <div className="flex items-end gap-x-1 mb-2">
              <span className="text-xl font-semibold leading-none text-[#2d711c]">
                {getProfileCompletion(customer)}%
              </span>
              <span className="text-xs text-gray-500">
                Complete
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
              <div 
                className="bg-[#2d711c] h-1.5 rounded-full" 
                style={{ width: `${getProfileCompletion(customer)}%` }}
              ></div>
            </div>
          </div>

          {/* Addresses card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100/50">
            <div className="flex items-center gap-x-2 mb-3">
              <div className="p-1.5 rounded-full bg-green-50">
                <MapPin className="w-3.5 h-3.5 text-[#2d711c]" />
              </div>
              <span className="text-sm font-medium text-gray-800">Addresses</span>
            </div>
            
            <div className="flex items-end gap-x-1">
              <span className="text-xl font-semibold leading-none text-[#2d711c]">
                {customer?.addresses?.length || 0}
              </span>
              <span className="text-xs text-gray-500">
                Saved
              </span>
            </div>
          </div>
        </div>

        {/* Recent orders section for mobile */}
        <div className="mb-8">
          <div className="flex items-center gap-x-2 mb-3">
            <div className="p-1.5 rounded-full bg-green-50">
              <ShoppingBag className="w-3.5 h-3.5 text-[#2d711c]" />
            </div>
            <span className="text-sm font-medium text-gray-800">Recent orders</span>
          </div>
          
          {orders && orders.length > 0 ? (
            <div>
              <ul className="flex flex-col gap-y-3">
                {orders.slice(0, 2).map((order) => (
                  <li key={order.id} className="transition-all duration-200">
                    <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                      <Container className="bg-white p-3 rounded-lg shadow-sm border border-green-100/50">
                        <div className="grid grid-cols-2 gap-2 w-full text-xs">
                          <div className="font-medium text-gray-600">Date:</div>
                          <div className="text-gray-800">
                            {new Date(order.created_at).toLocaleDateString(locale)}
                          </div>
                          <div className="font-medium text-gray-600">Order:</div>
                          <div className="text-[#2d711c] font-medium">
                            #{order.display_id}
                          </div>
                          <div className="font-medium text-gray-600">Total:</div>
                          <div className="font-medium text-gray-800">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </div>
                        </div>
                      </Container>
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
              <LocalizedClientLink 
                href="/account/orders" 
                className="mt-3 block text-xs font-medium text-[#2d711c] text-center"
              >
                View all orders →
              </LocalizedClientLink>
            </div>
          ) : (
            <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-center">
              <span className="text-xs text-amber-800">No orders yet</span>
            </div>
          )}
        </div>

        {/* Mobile account navigation */}
        <h2 className="text-sm font-medium text-gray-800 mb-3 pl-2">Account management</h2>
        <div className="grid grid-cols-1 gap-3">  
          <LocalizedClientLink 
            href="/account/profile"
            className="bg-white p-4 rounded-lg shadow-sm border border-green-100/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-x-3">
              <div className="p-2 rounded-full bg-green-50">
                <User className="w-4 h-4 text-[#2d711c]" />
              </div>
              <span className="font-medium text-gray-800">Profile</span>
            </div>
            <ChevronDown className="-rotate-90 text-[#2d711c] w-5 h-5" />
          </LocalizedClientLink>
          
          <LocalizedClientLink 
            href="/account/addresses"
            className="bg-white p-4 rounded-lg shadow-sm border border-green-100/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-x-3">
              <div className="p-2 rounded-full bg-green-50">
                <MapPin className="w-4 h-4 text-[#2d711c]" />
              </div>
              <span className="font-medium text-gray-800">Addresses</span>
            </div>
            <ChevronDown className="-rotate-90 text-[#2d711c] w-5 h-5" />
          </LocalizedClientLink>
          
          <LocalizedClientLink 
            href="/account/orders"
            className="bg-white p-4 rounded-lg shadow-sm border border-green-100/50 flex items-center justify-between"
          >
            <div className="flex items-center gap-x-3">
              <div className="p-2 rounded-full bg-green-50">
                <ShoppingBag className="w-4 h-4 text-[#2d711c]" />
              </div>
              <span className="font-medium text-gray-800">Orders</span>
            </div>
            <ChevronDown className="-rotate-90 text-[#2d711c] w-5 h-5" />
          </LocalizedClientLink>
          
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-white p-4 rounded-lg shadow-sm border border-green-100/50 flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-x-3">
              <div className="p-2 rounded-full bg-red-50">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <span className="font-medium text-gray-800">Log out</span>
            </div>
            <ChevronDown className="-rotate-90 text-[#2d711c] w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Logout confirmation popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 animate-slideUp">
            <div className="text-center mb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Confirm Logout</h3>
              <p className="text-sm text-gray-600">Are you sure you want to log out of your account?</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 px-4 border border-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors order-2 sm:order-1 sm:flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="py-2.5 px-4 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors order-1 sm:order-2 sm:flex-1"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
