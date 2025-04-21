"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { KeyRound } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="w-full" data-testid="login-page">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-xl font-semibold text-[#2d711c] mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 text-sm max-w-xs">
          Sign in to your Bricks Botanical Collection account
        </p>
      </div>
      
      <form className="w-full flex flex-col" action={formAction}>
        <div className="grid grid-cols-1 gap-y-4">
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="current-password"
            data-testid="password-input"
          />
        </div>
        
        <ErrorMessage error={message} data-testid="login-error" />
        
        <LocalizedClientLink
          href="/account/reset-password"
          className="text-[#2d711c] text-right mt-2 self-end text-sm hover:underline"
        >
          Forgot your password?
        </LocalizedClientLink>
        
        <SubmitButton 
          className="w-full mt-6 bg-[#2d711c] hover:bg-[#235916] transition-colors duration-200" 
          data-testid="login-button"
        >
          Sign In
        </SubmitButton>
      </form>
      
      <div className="w-full flex justify-center mt-6 text-sm text-gray-600">
        <span>
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-[#2d711c] font-medium hover:underline"
          >
            Create one
          </button>
        </span>
      </div>
    </div>
  )
}

export default Login
