import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-lg border border-amber-100/30 p-5 mb-6 flex flex-col small:flex-row small:items-center small:justify-between gap-4">
      <div>
        <Heading level="h2" className="text-lg font-medium text-[#2d711c]">
          Already have an account?
        </Heading>
        <Text className="text-sm text-gray-600 mt-1">
          Sign in for a personalized shopping experience, faster checkout, and order tracking.
        </Text>
      </div>
      <div className="flex-shrink-0">
        <LocalizedClientLink href="/account">
          <Button 
            variant="secondary" 
            className="h-10 px-6 border border-[#2d711c] text-[#2d711c] hover:bg-green-50/30 transition-colors duration-200" 
            data-testid="sign-in-button"
          >
            <div className="flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Sign in</span>
            </div>
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
