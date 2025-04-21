"use client"

import React, { useEffect, useActionState } from "react"
import Input from "@modules/common/components/input"
import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { toast } from "@medusajs/ui"
import { Lock, ShieldCheck } from "lucide-react"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false)

  // TODO: Add support for password updates
  const updatePassword = async () => {
    toast.info("Password update is not implemented")
  }

  const clearState = () => {
    setSuccessState(false)
  }

  return (
    <form
      action={updatePassword}
      onReset={() => clearState()}
      className="w-full"
    >
      <AccountInfo
        label="Password"
        currentInfo={
          <div className="flex items-center gap-2 text-gray-600">
            <ShieldCheck size={16} className="text-gray-400" />
            <span>Password is hidden for security</span>
          </div>
        }
        isSuccess={successState}
        isError={false}
        errorMessage={undefined}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="bg-amber-50/50 p-4 rounded-md border border-amber-100">
          <h3 className="text-sm font-medium text-amber-700 mb-3 flex items-center gap-2">
            <Lock size={14} />
            <span>Password Security</span>
          </h3>
          <div className="grid grid-cols-1 gap-y-4">
            <div>
              <Input
                label="Current password"
                name="old_password"
                required
                type="password"
                data-testid="old-password-input"
              />
              <p className="mt-1 text-xs text-gray-500 ml-1">Enter your current password for verification</p>
            </div>
            
            <div className="pt-2 border-t border-amber-100">
              <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="New password"
                    type="password"
                    name="new_password"
                    required
                    data-testid="new-password-input"
                  />
                  <p className="mt-1 text-xs text-gray-500 ml-1">Use at least 8 characters with mixed case and symbols</p>
                </div>
                <Input
                  label="Confirm new password"
                  type="password"
                  name="confirm_password"
                  required
                  data-testid="confirm-password-input"
                />
              </div>
            </div>
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePassword
