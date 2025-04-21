"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { Sprout } from "lucide-react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="w-full" data-testid="register-page">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-xl font-semibold text-[#2d711c] mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-gray-600 text-sm max-w-xs">
          Join the Bricks Botanical Collection community and enjoy a personalized shopping experience.
        </p>
      </div>
      
      <form className="w-full flex flex-col" action={formAction}>
        <div className="grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        
        <ErrorMessage error={message} data-testid="register-error" />
        
        <div className="mt-6 p-4 bg-green-50/50 rounded-md border border-green-100 text-xs text-gray-600">
          <p className="flex items-start">
            <Sprout className="h-4 w-4 text-[#2d711c] mr-2 mt-0.5 flex-shrink-0" />
            <span>
              By creating an account, you agree to Bricks Botanical Collection's{" "}
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="text-[#2d711c] hover:underline font-medium"
              >
                Privacy Policy
              </LocalizedClientLink>{" "}
              and{" "}
              <LocalizedClientLink
                href="/content/terms-of-use"
                className="text-[#2d711c] hover:underline font-medium"
              >
                Terms of Use
              </LocalizedClientLink>.
            </span>
          </p>
        </div>
        
        <SubmitButton 
          className="w-full mt-6 bg-[#2d711c] hover:bg-[#235916] transition-colors duration-200" 
          data-testid="register-button"
        >
          Create Account
        </SubmitButton>
      </form>
      
      <div className="w-full flex justify-center mt-6 text-sm text-gray-600">
        <span>
          Already a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-[#2d711c] font-medium hover:underline"
          >
            Sign in
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
