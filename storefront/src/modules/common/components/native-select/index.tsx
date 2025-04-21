import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { ChevronDown } from "lucide-react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  label?: string
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, label, required, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div className="w-full">
        <div
          onFocus={() => {
            innerRef.current?.focus();
            setIsFocused(true);
          }}
          onBlur={() => {
            innerRef.current?.blur();
            setIsFocused(false);
          }}
          className={clx(
            "relative flex items-center text-base-regular rounded-md transition-all duration-200 bg-white h-12 border",
            className,
            isFocused
              ? "border-[#2d711c] shadow-[0_0_0_1px_rgba(45,113,28,0.5)]"
              : "border-gray-200 hover:border-gray-300",
            {
              "text-gray-500": isPlaceholder,
            }
          )}
        >
          {label && (
            <label
              onClick={() => innerRef.current?.focus()}
              className={`absolute duration-200 pointer-events-none px-1 ${
                !isPlaceholder || isFocused ? "text-xs top-1.5 left-3" : "text-sm top-3.5 left-3"
              } ${isFocused ? "text-[#2d711c]" : "text-gray-500"}`}
            >
              {label}
              {required && <span className="text-rose-500 ml-1">*</span>}
            </label>
          )}
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            required={required}
            {...props}
            className={clx(
              "appearance-none flex-1 bg-transparent border-none px-4 transition-colors duration-150 outline-none text-gray-800",
              label ? "pt-4 pb-1" : "py-2.5"
            )}
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none text-gray-500">
            <ChevronDown size={18} className={isFocused ? "text-[#2d711c]" : "text-gray-400"} />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
