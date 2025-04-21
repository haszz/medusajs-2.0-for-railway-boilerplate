import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"
import { Globe } from "lucide-react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { HttpTypes } from "@medusajs/types"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = "Select a country", region, defaultValue, label, required, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }))
  }, [region])

  return (
    <div className="relative">
      <NativeSelect
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        label={label || "Country"}
        required={required}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {countryOptions?.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
      <div className="absolute right-10 top-4 text-gray-400 pointer-events-none">
        <Globe size={16} />
      </div>
    </div>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
