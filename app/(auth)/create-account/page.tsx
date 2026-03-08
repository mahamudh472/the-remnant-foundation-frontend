import Image from 'next/image'
import { CreateAccountForm } from './create-account-form'

export default function CreateAccountPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Create Account Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 bg-white">
        <CreateAccountForm />
      </div>

      {/* Right side - Illustration */}
      <div className="hidden w-1/2 bg-[#f8f9fc] lg:flex lg:items-center lg:justify-center p-12">
        <div className="relative w-full max-w-2xl">
          <Image
            src="/assets/svgs/for-web/sign up Illustration.svg"
            alt="Sign up Illustration"
            width={763}
            height={584}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}
