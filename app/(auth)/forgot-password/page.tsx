import Image from "next/image"
import { ForgotPasswordForm } from "./forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden w-1/2 bg-[#f8f9fc] p-12 lg:flex lg:items-center lg:justify-center">
        <div className="relative w-full max-w-2xl">
          <Image
            src="/assets/svgs/for-web/sign up Illustration.svg"
            alt="Forgot Password Illustration"
            width={763}
            height={584}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
