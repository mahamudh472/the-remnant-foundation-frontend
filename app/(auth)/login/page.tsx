import Image from 'next/image'
import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden w-1/2 bg-[#f8f9fc] lg:flex lg:items-center lg:justify-center p-12">
        <div className="relative w-full max-w-2xl">
          <Image
            src="/assets/svgs/for-web/login illustration.svg"
            alt="Login Illustration"
            width={763}
            height={584}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2 bg-white">
        <LoginForm />
      </div>
    </div>
  )
}
