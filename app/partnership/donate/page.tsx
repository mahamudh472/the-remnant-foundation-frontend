"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Send, Heart, X, Check, User, HandHeart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = React.useState("25")
  const [frequency, setFrequency] = React.useState("Monthly")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation processed")
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <main>
        {/* Header Section */}
        <section className="space-y-4 bg-[#F8F9FC]/50 py-20 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1D1D1D] md:text-5xl">
              Give Donation
            </h1>
            <p className="mx-auto max-w-2xl text-[#666666]">
              We're here to help. Reach out with any questions or feedback.
            </p>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-10 mt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Jane Doe"
                className="h-14 w-full border-none bg-[#F3F4F6] px-5"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="jane@example.com"
                className="h-14 w-full border-none bg-[#F3F4F6] px-5"
              />
            </div>
          </div>

          {/* Choose Your Impact Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#006677]">
              <HandHeart className="h-5 w-5" />
              <h2 className="text-xl font-bold">Choose Your Impact</h2>
            </div>

            <div className="space-y-6">
              {/* Frequency Selection */}
              <div className="space-y-3">
                <Label>Frequency</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Monthly", "One time"].map((f) => (
                    <Button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={cn(
                        "h-14 transition-all",
                        frequency === f
                          ? "bg-[#FFB84D] text-white"
                          : "bg-[#F3F4F6] text-gray-500 hover:bg-gray-200"
                      )}
                    >
                      {f}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label>Donation Amount</Label>
                <div className="grid grid-cols-3 gap-4">
                  {["25", "50", "100"].map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={cn(
                        "h-14",
                        donationAmount === amount
                          ? "bg-[#4CC0D8] text-white"
                          : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Acknowledgement */}
          <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-[#666666]">
            By proceeding with payment, I confirm that I have reviewed and accepted The Remnant Foundation’s{" "}
            <Link
              href="/refund-and-cancellation-policy"
              className="font-medium text-[#4CC0D8] underline hover:text-[#3AB0C8]"
            >
              Refund and Cancellation Policy
            </Link>{" "}
            and the applicable terms of the event, service or donation. This acknowledgement does not limit any rights available to me under the laws of Zambia.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Button type="submit" className="h-14 px-12">
              Go to checkout
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="h-14 bg-[#F3F4F6] px-12"
            >
              Cancel
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="mx-auto max-w-sm text-center text-[10px] leading-relaxed text-gray-400 mb-12">
            By clicking checkout, you agree to our Terms of Service and Privacy
            Policy. All donations are tax-deductible to the extent permitted by
            law.
          </p>
        </form>
      </main>

      <Footer />
    </div>
  )
}
