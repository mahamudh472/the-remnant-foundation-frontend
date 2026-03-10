import Image from "next/image"
import { OtpForm } from "./otp-form"

export default function OtpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden w-1/2 bg-[#f8f9fc] p-12 lg:flex lg:items-center lg:justify-center">
        <div className="relative w-full max-w-2xl">
          <Image
            src="/assets/svgs/for-web/login illustration.svg"
            alt="OTP Verification Illustration"
            width={763}
            height={584}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

      {/* Right side - OTP Form */}
      <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
        <OtpForm />
      </div>
    </div>
  )
}
