"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      
      {/* Additional filters could be added here */}
      <div className="border-t border-green-100/50 pt-4 mt-2">
        <div className="text-sm text-[#2d711c]/80 mb-3 font-medium">Color Palette</div>
        <div className="flex flex-wrap gap-2">
          <div className="w-6 h-6 rounded-full bg-green-200 border border-green-300 cursor-pointer hover:ring-2 ring-offset-1 ring-green-300 transition"></div>
          <div className="w-6 h-6 rounded-full bg-amber-200 border border-amber-300 cursor-pointer hover:ring-2 ring-offset-1 ring-amber-300 transition"></div>
          <div className="w-6 h-6 rounded-full bg-rose-200 border border-rose-300 cursor-pointer hover:ring-2 ring-offset-1 ring-rose-300 transition"></div>
          <div className="w-6 h-6 rounded-full bg-blue-200 border border-blue-300 cursor-pointer hover:ring-2 ring-offset-1 ring-blue-300 transition"></div>
          <div className="w-6 h-6 rounded-full bg-purple-200 border border-purple-300 cursor-pointer hover:ring-2 ring-offset-1 ring-purple-300 transition"></div>
        </div>
      </div>
      
      <div className="border-t border-green-100/50 pt-4 mt-2">
        <div className="text-sm text-[#2d711c]/80 mb-3 font-medium">Collection Type</div>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="accent-[#2d711c] h-4 w-4" />
            <span className="group-hover:text-[#2d711c] transition-colors">Flowering Plants</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="accent-[#2d711c] h-4 w-4" />
            <span className="group-hover:text-[#2d711c] transition-colors">Succulents</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="accent-[#2d711c] h-4 w-4" />
            <span className="group-hover:text-[#2d711c] transition-colors">Tropical Sets</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="accent-[#2d711c] h-4 w-4" />
            <span className="group-hover:text-[#2d711c] transition-colors">Bonsai Trees</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
