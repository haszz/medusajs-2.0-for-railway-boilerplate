import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (props.onBlur) {
        props.onBlur(e)
      }
    }

    const hasValue = inputRef.current?.value !== "" && inputRef.current?.value !== undefined

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 text-sm font-medium text-gray-700">{topLabel}</Label>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className={`pt-4 pb-1 block w-full h-12 px-4 mt-0 bg-white border rounded-md appearance-none text-gray-800 transition-all duration-200
                      focus:outline-none focus:ring-0 focus:shadow-sm border-gray-200 hover:border-gray-300 
                      focus:border-[#2d711c] focus:shadow-[0_0_0_1px_rgba(45,113,28,0.5)]
                      ${type === "password" ? "pr-12" : ""}`}
            {...props}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={`flex items-center justify-center px-1 absolute duration-200 transform text-gray-500 pointer-events-none
                      ${(isFocused || hasValue || (props.defaultValue && props.defaultValue !== "")) 
                          ? "text-xs top-1.5 left-3" 
                          : "text-sm top-3.5 left-3"} 
                      ${isFocused ? "text-[#2d711c]" : ""}`}
          >
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-[#2d711c] p-1 rounded-full hover:bg-green-50 transition-all duration-150 outline-none focus:outline-none"
            >
              {showPassword ? (
                <EyeOff size={18} className="transition-all duration-150" />
              ) : (
                <Eye size={18} className="transition-all duration-150" />
              )}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
