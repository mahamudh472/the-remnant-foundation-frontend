import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="The Remnant Foundation Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold tracking-tight text-[#1D1D1D]">
                Remnant Foundation
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A modern learning platform built to help students and teachers achieve spiritual and academic excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fc] hover:bg-[#4CC0D8] hover:text-white transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fc] text-[#666666] hover:bg-[#4CC0D8] hover:text-white transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fc] text-[#666666] hover:bg-[#4CC0D8] hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fc] text-[#666666] hover:bg-[#4CC0D8] hover:text-white transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Programs", href: "/courses" },
                { name: "Events", href: "/events" },
                { name: "Partnership", href: "/partnership" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Resources</h3>
            <ul className="space-y-4">
              {[
                { name: "Support", href: "/support" },
                { name: "FAQ", href: "/support/faq" },
                { name: "Refund & Cancellation Policy", href: "/refund-and-cancellation-policy" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <Send className="h-5 w-5 text-[#4CC0D8]" />
                <span>info@remnantlearning.org</span>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="font-bold text-[#4CC0D8]">P:</span>
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex gap-3 text-sm">
                <span className="font-bold text-[#4CC0D8]">A:</span>
                <span>123 Learning Ave, Education City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-black flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2024 All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <Link href="/refund-and-cancellation-policy" className="text-xs hover:underline">
              Refund &amp; Cancellation Policy
            </Link>
            <a href="#" className="text-xs hover:underline">Privacy Policy</a>
            <a href="#" className="text-xs hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
