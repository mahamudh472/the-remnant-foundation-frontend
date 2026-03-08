'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function SignupForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement signup logic
    console.log('Signup:', { email })
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Placeholder for illustration - replace with actual image */}
              <div className="h-64 w-64 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100" />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500" />
                <span className="text-xl font-semibold">Remnant Foundation</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold">
                Sign up for the Remnant Foundation
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                What will you learn today?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Already have an account?{' '}
                <a href="/login" className="text-cyan-600 hover:underline">
                  Log in
                </a>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                Continue
              </Button>
            </form>

            {/* Terms */}
            <p className="text-center text-xs text-muted-foreground lg:text-left">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-cyan-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-cyan-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
