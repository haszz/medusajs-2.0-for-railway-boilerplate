import { Disclosure } from "@headlessui/react"
import { Badge, Button, clx } from "@medusajs/ui"
import { useEffect } from "react"
import { CheckCircle2, AlertCircle, Pencil, X } from "lucide-react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div className="text-small-regular rounded-md transition-all duration-200" data-testid={dataTestid}>
      <div className="flex items-center justify-between py-3">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</span>
          <div className="flex items-center flex-1 basis-0 gap-x-4">
            {typeof currentInfo === "string" ? (
              <span className="font-medium text-gray-800 text-base" data-testid="current-info">{currentInfo}</span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            className={clx(
              "min-h-[36px] px-4 rounded-full transition-all duration-200 font-medium border",
              state 
                ? "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50" 
                : "border-green-100 hover:border-green-200 text-[#2d711c] hover:bg-green-50"
            )}
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? (
              <span className="flex items-center gap-1.5">
                <X size={16} className="text-gray-500" />
                Cancel
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Pencil size={16} className="text-[#2d711c]" />
                Edit
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-all duration-300 ease-in-out overflow-hidden rounded-md",
            {
              "max-h-[80px] opacity-100 mb-4": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="p-3 my-2 bg-green-50 border border-green-100 rounded-md flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="text-green-800 font-medium text-sm">{label} updated successfully</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-all duration-300 ease-in-out overflow-hidden rounded-md",
            {
              "max-h-[80px] opacity-100 mb-4": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="p-3 my-2 bg-red-50 border border-red-100 rounded-md flex items-center gap-2">
            <AlertCircle size={18} className="text-red-600" />
            <span className="text-red-800 font-medium text-sm">{errorMessage}</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-all duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100 border-t border-gray-100 pt-4 mt-2": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-5 py-2">
            <div>{children}</div>
            <div className="flex items-center justify-end mt-2">
              <Button
                isLoading={pending}
                className={clx(
                  "w-full small:max-w-[140px] bg-[#2d711c] hover:bg-[#25601a] text-white rounded-md font-medium",
                  pending ? "opacity-90" : ""
                )}
                type="submit"
                data-testid="save-button"
              >
                {pending ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
