"use client"

import React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronRight } from "lucide-react"

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-[#F8F9FC]/50 text-center space-y-4">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1D1D1D] tracking-tight">
              Get in Touch
            </h1>
            <p className="text-[#666666] max-w-2xl mx-auto">
              We're here to help. Reach out with any questions or feedback.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-start">

              {/* Send Us a Message Form */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 transition-all">
                <h2 className="text-2xl font-bold text-[#1D1D1D] mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-[#1D1D1D]">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="John"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-[#1D1D1D]">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Doe"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#1D1D1D]">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-[#1D1D1D]">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="How can we help?"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-[#1D1D1D]">Message</label>
                    <textarea
                      id="message"
                      placeholder="Tell us more..."
                      className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#4CC0D8] transition-all resize-none"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-xl font-bold gap-2">
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#1D1D1D]">Contact Information</h2>
                  <p className="text-[#666666]">We're available to answer your questions and provide support.</p>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF7F9] text-[#4CC0D8] flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1D1D1D]">Email</h4>
                      <p className="text-sm text-[#666666]">info@spirituallearning.org</p>
                      <p className="text-sm text-[#666666]">support@spirituallearning.org</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF7F9] text-[#4CC0D8] flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1D1D1D]">Phone</h4>
                      <p className="text-sm text-[#666666]">+1 (555) 123-4567</p>
                      <p className="text-sm text-[#9CA3AF]">Mon-Fri. 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#EBF7F9] text-[#4CC0D8] flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1D1D1D]">Address</h4>
                      <p className="text-sm text-[#666666]">123 Learning Avenue</p>
                      <p className="text-sm text-[#666666]">Education City, EC 12345</p>
                      <p className="text-sm text-[#666666]">United States</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Teaser */}
                <div className="bg-[#F3FBFC] rounded-3xl p-8 space-y-4 border border-[#4CC0D8]/10">
                  <div className="h-12 w-12 rounded-xl bg-white text-[#4CC0D8] flex items-center justify-center shadow-sm">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1D]">Frequently Asked Questions</h3>
                  <p className="text-sm text-[#666666]">Find quick answers to common questions about our programs and platform.</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#4CC0D8] hover:gap-3 transition-all">
                    View FAQs <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1D]">Ready to Start Learning?</h2>
            <p className="text-[#666666]">Join thousands of students on their spiritual and academic journey.</p>
            <Button className="h-14 px-12 bg-[#C776EA]/40 text-[#C776EA] hover:bg-[#C776EA]/50 rounded-xl font-bold text-lg">
              Sign up now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
