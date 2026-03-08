"use client"

import React from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Send, Heart, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = React.useState("25")
  const [frequency, setFrequency] = React.useState("Monthly")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation processed")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Header Section */}
        <section className="py-20 bg-[#F8F9FC]/50 text-center space-y-4">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D1D1D] tracking-tight">
              Give Donation
            </h1>
            <p className="text-[#666666] max-w-2xl mx-auto">
              We're here to help. Reach out with any questions or feedback.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Message Form (Same as Contact) */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1D1D1D] mb-8">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1D1D1D]">First Name</label>
                      <input type="text" placeholder="John" className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1D1D1D]">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1D1D1D]">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1D1D1D]">Subject</label>
                    <input type="text" placeholder="How can we help?" className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1D1D1D]">Message</label>
                    <textarea placeholder="Tell us more..." className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] resize-none"></textarea>
                  </div>
                  <Button className="w-full h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-xl font-bold gap-2">
                     Send Message <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Donation Form */}
              <div className="space-y-12">
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
                       <span className="text-xl font-bold text-[#1D1D1D]">The Remnant Foundation</span>
                    </div>
                    <p className="text-sm text-[#666666] leading-relaxed">
                       Welcome to heavenchild donation, please fill out the form below. Hopefully it is blessed.
                    </p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Donation Type Selection */}
                    <div className="space-y-4">
                       <label className="text-sm font-bold text-[#1D1D1D]">Choose a donation type</label>
                       <div className="relative">
                          <select className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-[#FFF9E5] text-sm text-[#CC9900] appearance-none focus:outline-none cursor-pointer">
                             <option>Cost of education</option>
                             <option>AI Infrastructure</option>
                             <option>General Support</option>
                          </select>
                          <Heart className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#CC9900]" />
                       </div>
                    </div>

                    {/* Amount Selection */}
                    <div className="space-y-4">
                       <label className="text-sm font-bold text-[#1D1D1D]">Choose a donation amount</label>
                       <div className="grid grid-cols-1 gap-4">
                          {["25", "50", "100"].map((amount) => (
                            <label key={amount} className="flex items-center gap-4 cursor-pointer group">
                               <div className="relative h-6 w-6 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                                  <input
                                    type="radio"
                                    name="amount"
                                    className="peer sr-only"
                                    checked={donationAmount === amount}
                                    onChange={() => setDonationAmount(amount)}
                                  />
                                  <div className="h-3 w-3 rounded-full bg-[#4CC0D8] scale-0 peer-checked:scale-100 transition-transform" />
                               </div>
                               <span className="text-lg font-bold text-[#1D1D1D] transition-colors group-hover:text-[#4CC0D8]">${amount}</span>
                            </label>
                          ))}
                       </div>
                       <button type="button" className="text-xs font-bold text-[#4CC0D8] hover:underline">Enter a custom donation amount</button>
                    </div>

                    {/* Frequency Selection */}
                    <div className="space-y-4">
                       <label className="text-sm font-bold text-[#1D1D1D]">Choose a donation frequency</label>
                       <div className="grid grid-cols-2 gap-4">
                          {["Monthly", "One time"].map((f) => (
                             <label key={f} className={cn(
                               "h-12 flex items-center justify-between px-6 rounded-xl border transition-all cursor-pointer",
                               frequency === f ? "bg-[#FFF9E5] border-[#FFD966]/20" : "bg-gray-50 border-transparent hover:border-gray-200"
                             )}>
                                <span className={cn("text-sm font-bold", frequency === f ? "text-[#CC9900]" : "text-[#666666]")}>{f}</span>
                                <input
                                  type="radio"
                                  name="frequency"
                                  className="peer sr-only"
                                  checked={frequency === f}
                                  onChange={() => setFrequency(f)}
                                />
                                {frequency === f && <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center"><Check className="h-3 w-3 text-[#CC9900]" /></div>}
                             </label>
                          ))}
                       </div>
                       <p className="text-[10px] text-[#9CA3AF] leading-relaxed italic">
                         Auctor ut gravida senectus sed impertier id. Enim mauris morbi suscipit tellus aliquam commodo iaculis tortor. Faucibus elit, convallis massa sed.
                       </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                       <Button type="submit" className="flex-1 h-12 bg-[#006677] hover:bg-[#004455] text-white rounded-xl font-bold">
                          Go to checkout
                       </Button>
                       <Button variant="outline" type="button" className="flex-1 h-12 border-red-200 text-red-500 hover:bg-red-50 rounded-xl font-bold">
                          Cancel
                       </Button>
                    </div>
                 </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
