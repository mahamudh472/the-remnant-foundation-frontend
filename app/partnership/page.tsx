"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Users,
  Heart,
  Target,
  Zap,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Globe2
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function PartnershipPage() {
  const [activePlan, setActivePlan] = React.useState("Monthly")
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1D] leading-[1.1]">
                  Partner With Us to <br />
                  <span className="text-[#4CC0D8]">Disciple</span> the Next Generation
                </h1>
                <p className="text-lg text-[#666666] max-w-xl mx-auto lg:mx-0">
                  Your partnership helps provide spiritual education, AI-powered learning, and mentorship to children, teens, and young adults.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/partnership/donate">
                    <Button className="h-12 px-8 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-lg font-semibold shadow-lg shadow-[#4CC0D8]/20 transition-all hover:scale-[1.02]">
                      Become a Partner Today
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 w-full animate-in fade-in slide-in-from-right duration-700">
                  <Image
                    src="/assets/svgs/for-web/web partnership.svg"
                    alt="Partnership Illustration"
                    width={800}
                    height={600}
                    className="w-full h-auto drop-shadow-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partnership Matters */}
        <section className="py-24 bg-[#f8f9fc]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Why Partnership Matters</h2>
              <p className="text-[#666666]">We support each other to bring people together for communal work.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Spiritual Growth", desc: "Equipping minds with biblical values and wisdom.", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-50" },
                { title: "Education Access", desc: "Providing tools for high-quality learning.", icon: Globe2, color: "text-purple-500", bg: "bg-purple-50" },
                { title: "AI Spiritual Guidance", desc: "24/7 personalized biblical support.", icon: Target, color: "text-green-500", bg: "bg-green-50" },
                { title: "Global Impact", desc: "Reaching communities across the world.", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-start space-y-4 hover:shadow-xl transition-all group">
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg, item.color)}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1D1D1D]">{item.title}</h3>
                  <p className="text-sm text-[#666666] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Partnership Works */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">How Partnership Works</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                { num: "01", title: "Sign Up and create Account", desc: "Learn from better mentors", icon: Heart },
                { num: "02", title: "Select Amount / Frequency", desc: "Choose your level of support", icon: ShieldCheck },
                { num: "03", title: "Secure Payment", desc: "Choose your payment method", icon: CheckCircle2 },
                { num: "04", title: "Become a Partner & Receive Report", desc: "Impact lives globally", icon: Users }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-8 group">
                   <span className="text-5xl md:text-7xl font-bold text-gray-100 group-hover:text-[#4CC0D8]/20 transition-colors w-24 shrink-0 text-right">
                     {step.num}
                   </span>
                   <div className="bg-white rounded-2xl p-6 border border-gray-100 flex-1 shadow-sm flex items-center gap-6 group-hover:border-[#4CC0D8]/30 group-hover:shadow-md transition-all">
                      <div className="h-12 w-12 rounded-full bg-[#EBF7F9] text-[#4CC0D8] flex items-center justify-center shrink-0">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1D1D1D]">{step.title}</h4>
                        <p className="text-sm text-[#9CA3AF]">{step.desc}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation or Partnership Types */}
        <section className="py-24 bg-[#fcfdfe]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-20">
              <p className="text-sm font-bold text-[#4CC0D8] uppercase tracking-widest">Understanding the difference</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Donation or Partnership: How Do You Want to Support?</h2>
              <p className="text-[#666666] max-w-2xl mx-auto">Both donation and partnership help us reach our goals. The difference lies in commitment, interaction, and long-term impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* One-Time Donation */}
              <div className="bg-white rounded-[2rem] p-10 border border-gray-100 hover:border-[#4CC0D8] transition-all shadow-sm hover:shadow-xl space-y-8">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#1D1D1D]">One-Time Donation</h3>
                  <p className="text-sm text-[#666666]">A flexible contribution that supports immediate needs and projects.</p>
                </div>
                <ul className="space-y-4">
                  {["No monthly commitment", "Instant Impact", "Receive a thank you certificate", "Tax benefits where applicable"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#666666]">
                      <CheckCircle2 className="h-4 w-4 text-[#4CC0D8]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ongoing Partnership */}
              <div className="bg-white rounded-[2rem] p-10 border border-gray-100 hover:border-[#C776EA] transition-all shadow-sm hover:shadow-xl space-y-8">
                <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#1D1D1D]">Ongoing Partnership</h3>
                  <p className="text-sm text-[#666666]">A committed relationships that allows for long-term planning and sustained impact.</p>
                </div>
                <ul className="space-y-4">
                  {["Monthly/Yearly support", "Sustained Growth", "Detailed impact reports", "Member-only events", "Personal updates"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#666666]">
                      <CheckCircle2 className="h-4 w-4 text-[#C776EA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Partnership */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Choose Your Partnership</h2>
              <div className="flex justify-center mt-8">
                <div className="bg-gray-100 p-1 rounded-xl flex">
                  {["Monthly", "One-Time"].map((plan) => (
                    <button
                      key={plan}
                      onClick={() => setActivePlan(plan)}
                      className={cn(
                        "px-8 py-2 rounded-lg text-sm font-bold transition-all",
                        activePlan === plan ? "bg-white text-[#1D1D1D] shadow-sm" : "text-[#666666] hover:text-[#1D1D1D]"
                      )}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-lg mx-auto bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-2xl hover:border-[#4CC0D8] transition-all">
              <div className="p-8 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#EBF7F9] text-[#4CC0D8] flex items-center justify-center">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1D1D1D]">Harmony Partner <span className="ml-2 bg-[#FFD966] text-[#1D1D1D] text-[10px] uppercase px-2 py-0.5 rounded">Most Popular</span></h4>
                    <p className="text-xs text-[#666666]">Small contribution, big impact.</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Monthly updates on impact",
                    "Support 1 student monthly",
                    "Access to general reports",
                    "24/7 Spiritual Guidance access"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#666666]">
                      <CheckCircle2 className="h-4 w-4 text-[#4CC0D8]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-xl font-bold">
                  Become a Harmony Partner
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1D1D1D] mb-12">Partnership FAQ</h2>
            <div className="space-y-4">
              {[
                { q: "How are my funds used?", a: "Your funds are directly invested into our educational resources, AI infrastructure, and student support programs." },
                { q: "Can I cancel my partnership?", a: "Yes, you can manage and cancel your monthly partnership at any time through your dashboard." },
                { q: "Is my donation tax-deductible?", a: "We are a registered 501(c)(3) nonprofit, and your contributions are tax-deductible to the extent allowed by law." },
                { q: "Will I receive impact reports?", a: "Yes, all partners receive monthly or quarterly impact reports detailing how their support is changing lives." }
              ].map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 last:border-0 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className={cn("font-bold transition-colors", openFaq === idx ? "text-[#4CC0D8]" : "text-[#1D1D1D] group-hover:text-[#4CC0D8]")}>{faq.q}</span>
                    <Plus className={cn("h-5 w-5 text-[#9CA3AF] transition-transform", openFaq === idx && "rotate-45")} />
                  </button>
                  {openFaq === idx && (
                    <div className="pb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-[#666666] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
