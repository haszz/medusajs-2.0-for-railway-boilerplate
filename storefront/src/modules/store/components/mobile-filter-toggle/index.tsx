"use client"

import { useState } from "react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import RefinementList from "@modules/store/components/refinement-list"

type MobileFilterToggleProps = {
  sortBy: SortOptions
}

const MobileFilterToggle = ({ sortBy }: MobileFilterToggleProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      {/* Toggle button - simplified design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white border border-[#2d711c]/30 rounded-lg py-2.5 px-4 text-[#2d711c] font-medium transition-colors hover:bg-green-50"
      >
        <div className="flex items-center">
          <FilterIcon className="mr-2 h-5 w-5" />
          <span>Refine Selection</span>
        </div>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronIcon />
        </div>
      </button>

      {/* Collapsible filter panel - simplified animation */}
      <div 
        className={`overflow-hidden transition-all duration-200 bg-white rounded-b-lg border-x border-b border-[#2d711c]/20 ${
          isOpen 
            ? 'max-h-[400px] opacity-100 mt-0.5 py-4 px-4' 
            : 'max-h-0 opacity-0 border-0 py-0 px-4'
        }`}
      >
        {isOpen && <RefinementList sortBy={sortBy} />}
      </div>
    </div>
  )
}

const FilterIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6 20.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM18 20.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM12 20.25a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5a.75.75 0 01-.75.75zM12 12a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0112 12zM6 6a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 016 6zM18 6a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0118 6z" />
  </svg>
)

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-5 h-5 ${className}`}
  >
    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
  </svg>
)

export default MobileFilterToggle 