"use client"

import { useState } from "react"
import { Leaf } from "lucide-react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import Image from "next/image"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="max-w-md w-full mx-auto my-12">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-center p-6 bg-green-50/30">
          <div className="bg-white p-3 rounded-full ">
            <Image src="/images/logo-mini.svg" alt="logo" width={240} height={240} />
          </div>
        </div>
        
        <div className="px-8 pt-4">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className={`flex-1 py-3 text-center font-medium text-sm ${
                currentView === LOGIN_VIEW.SIGN_IN 
                  ? "text-[#2d711c] border-b-2 border-[#2d711c]" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className={`flex-1 py-3 text-center font-medium text-sm ${
                currentView === LOGIN_VIEW.REGISTER 
                  ? "text-[#2d711c] border-b-2 border-[#2d711c]" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>
        </div>
        
        <div className="p-8 pt-6">
          {currentView === LOGIN_VIEW.SIGN_IN ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
