import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ShieldCheck,
  FileText,
  Calendar,
  Clock,
  Mail,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Scale,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | The Remnant Foundation",
  description:
    "Review the official Refund and Cancellation Policy for The Remnant Foundation, operating in compliance with the Laws of Zambia.",
}

const SECTIONS = [
  { id: "scope", title: "1. Scope of this policy" },
  { id: "service-and-event-fees", title: "2. Service and event fees" },
  { id: "online-cancellation-rights", title: "3. Online cancellation rights" },
  { id: "donations", title: "4. Donations" },
  { id: "event-cancellation", title: "5. Event cancellation or postponement" },
  { id: "declined-refunds", title: "6. Circumstances where a refund may be declined" },
  { id: "how-to-request", title: "7. How to request a refund" },
  { id: "review-and-approval", title: "8. Review and approval" },
  { id: "processing", title: "9. Processing approved refunds" },
  { id: "charges", title: "10. Transaction and payment-provider charges" },
  { id: "duplicate-transactions", title: "11. Duplicate, incorrect and unauthorised transactions" },
  { id: "prices-and-records", title: "12. Prices and payment records" },
  { id: "complaints-and-appeals", title: "13. Complaints and appeals" },
  { id: "privacy", title: "14. Protection of personal information" },
  { id: "changes", title: "15. Changes to this policy" },
  { id: "contact", title: "16. Contact information" },
  { id: "acknowledgement", title: "Website payment acknowledgement" },
]

export default function RefundAndCancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#1D1D1D]">
      <Navbar />

      <main className="py-12 md:py-16">
        {/* Header Hero */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 md:p-12 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EBF7F9] px-4 py-1.5 text-xs font-semibold text-[#006677]">
              <Scale className="h-3.5 w-3.5 text-[#4CC0D8]" />
              <span>Consumer Protection &amp; Compliance</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1D]">
                Refund and Cancellation Policy
              </h1>
              <p className="text-lg font-semibold text-[#4CC0D8]">
                The Remnant Foundation
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#666666] pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#4CC0D8]" />
                <span><strong>Effective date:</strong> 07/20/2026</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#4CC0D8]" />
                <span><strong>Last updated:</strong> 07/20/2026</span>
              </div>
            </div>

            {/* Preamble */}
            <div className="space-y-4 pt-4 text-sm md:text-base leading-relaxed text-[#4A4A4A]">
              <p>
                The Remnant Foundation is committed to accountability, transparency and fair treatment of every person who makes a payment through our website or other authorised payment channels.
              </p>
              <p>
                This policy explains the circumstances in which payments may be cancelled or refunded, the procedure for submitting a refund request and how approved refunds are processed.
              </p>
              <div className="rounded-2xl bg-[#F8F9FC] p-4 sm:p-5 border-l-4 border-[#4CC0D8] text-xs sm:text-sm text-[#555555]">
                <p>
                  This policy is intended to operate consistently with the{" "}
                  <strong>Competition and Consumer Protection Act No. 24 of 2010</strong>, as amended by{" "}
                  <strong>Act No. 21 of 2023</strong>, and the{" "}
                  <strong>Electronic Communications and Transactions Act No. 4 of 2021</strong> of the Laws of Zambia. Zambia’s electronic-transactions framework requires an online supplier to make its return, exchange and refund policy available to consumers. <em>(Parliament of Zambia)</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section with Table of Contents */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Quick Navigation Sticky Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-24">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Table of Contents
                </h3>
                <nav className="space-y-1.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 text-xs">
                  {SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block py-1.5 px-2 rounded-lg text-[#555555] hover:bg-[#F3FBFC] hover:text-[#4CC0D8] transition-colors leading-snug"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Policy Body */}
            <div className="lg:col-span-8 space-y-8">
              {/* 1. Scope of this policy */}
              <article
                id="scope"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">1.</span> Scope of this policy
                </h2>
                <p className="text-sm md:text-base text-[#4A4A4A]">
                  This policy applies to payments made to The Remnant Foundation for:
                </p>
                <ul className="space-y-2.5 text-sm md:text-base text-[#555555]">
                  {[
                    "Events, conferences, workshops and seminars;",
                    "Training programmes;",
                    "Membership or participation fees;",
                    "Foundation services and programmes;",
                    "Online registrations;",
                    "Donations; and",
                    "Any other payment made through the Foundation’s website or authorised payment channels.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* 2. Service and event fees */}
              <article
                id="service-and-event-fees"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">2.</span> Service and event fees
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    A person who has paid for a Foundation service, programme or event may submit a refund request within fourteen calendar days from the date of payment.
                  </p>
                  <p>
                    A request should, wherever possible, be submitted before the service has been provided or before the event has taken place.
                  </p>
                </div>

                <div className="pt-2">
                  <p className="font-semibold text-sm md:text-base text-[#1D1D1D] mb-3">
                    A refund may be approved where:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555]">
                    {[
                      "The Foundation cancels an event, programme or service;",
                      "The Foundation is unable to provide the service paid for;",
                      "The payer cancels within fourteen calendar days of payment and the service has not yet been provided;",
                      "A payment is processed more than once;",
                      "The payer is charged an amount different from the amount displayed or authorised;",
                      "A technical error occurs during payment processing;",
                      "A service is not performed with reasonable care and skill or within the agreed or reasonable period;",
                      "The event or programme is materially changed and the payer is unable to participate; or",
                      "Foundation management determines that exceptional circumstances justify a refund.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-[#F8F9FC] p-4 text-xs md:text-sm text-[#555555] border-l-2 border-[#4CC0D8]">
                  Zambian consumer-protection legislation prohibits misleading representations and provides remedies where a service is not supplied to a reasonable standard. The 2023 amendments provide for a refund or proper performance of an unsuitable service within the applicable statutory period. <em>(Parliament of Zambia)</em>
                </div>
              </article>

              {/* 3. Online cancellation rights */}
              <article
                id="online-cancellation-rights"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">3.</span> Online cancellation rights
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    Where a service is purchased through the Foundation’s website, applicable rights under the Electronic Communications and Transactions Act will be respected.
                  </p>
                  <p>
                    Subject to the exceptions provided by law, a consumer may cancel an electronic transaction for services within seven days after the agreement is concluded, without giving a reason or incurring a penalty. Where payment has already been made, the legislation provides for a full refund within thirty days after cancellation. <em>(Parliament of Zambia)</em>
                  </p>
                  <p>
                    The statutory cooling-off right may not apply where a service has already been fully performed with the consumer’s consent before the seven-day period ends or where another lawful exception applies. <em>(Parliament of Zambia)</em>
                  </p>
                  <p className="font-medium text-[#1D1D1D]">
                    The Foundation’s fourteen-day request period does not remove or reduce any right available to a consumer under Zambian law.
                  </p>
                </div>
              </article>

              {/* 4. Donations */}
              <article
                id="donations"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">4.</span> Donations
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    Donations made to The Remnant Foundation are voluntary contributions intended to support the Foundation’s charitable programmes and activities. Donations are generally not refundable after they have been accepted and committed to the Foundation’s work.
                  </p>
                  <p className="font-semibold text-[#1D1D1D] pt-1">
                    Management may, however, approve a donation refund where:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555]">
                    {[
                      "The same donation was processed more than once;",
                      "The donor entered an incorrect amount by genuine mistake;",
                      "A payment was made without the account holder’s authorisation;",
                      "A payment-processing or technical error occurred;",
                      "The donation was credited to the wrong campaign because of a system error; or",
                      "Exceptional circumstances justify a refund.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-2 text-xs md:text-sm text-[#666666]">
                    A request concerning an incorrect, duplicate or unauthorised donation should be submitted as soon as reasonably possible and, where practicable, within fourteen calendar days of the transaction.
                  </p>
                </div>
              </article>

              {/* 5. Event cancellation or postponement */}
              <article
                id="event-cancellation"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-6"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">5.</span> Event cancellation or postponement
                </h2>

                <div className="space-y-3">
                  <h3 className="text-base md:text-lg font-bold text-[#1D1D1D]">
                    5.1 Cancellation by the Foundation
                  </h3>
                  <p className="text-sm md:text-base text-[#4A4A4A]">
                    Where The Remnant Foundation cancels an event, programme or service, the affected payer will be offered:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555] pl-1">
                    {[
                      "A full refund;",
                      "Transfer to a rescheduled event or programme; or",
                      "Credit toward another Foundation event or service.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs md:text-sm text-[#666666] pt-1">
                    Where the Foundation is unable to provide an ordered service because it is unavailable, the payer will be notified and the payment will be refunded as required by law. <em>(Parliament of Zambia)</em>
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-[#1D1D1D]">
                    5.2 Postponement
                  </h3>
                  <p className="text-sm md:text-base text-[#4A4A4A]">
                    Where an event is postponed, the payer may:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555] pl-1">
                    {[
                      "Retain the registration for the new date;",
                      "Transfer the registration to another eligible participant, where permitted; or",
                      "Request a refund within the period communicated by the Foundation.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <h3 className="text-base md:text-lg font-bold text-[#1D1D1D]">
                    5.3 Personal expenses
                  </h3>
                  <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                    Unless required by law or expressly agreed in writing, the Foundation will not be responsible for indirect expenses incurred by a participant, including transport, accommodation, meals or other personal arrangements.
                  </p>
                </div>
              </article>

              {/* 6. Circumstances where a refund may be declined */}
              <article
                id="declined-refunds"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">6.</span> Circumstances where a refund may be declined
                </h2>
                <p className="text-sm md:text-base text-[#4A4A4A]">
                  Subject to the consumer’s rights under applicable law, a refund may be declined where:
                </p>
                <ul className="space-y-2 text-sm md:text-base text-[#555555]">
                  {[
                    "The service has already been fully provided with the payer’s agreement;",
                    "The person attended or substantially participated in the event or programme;",
                    "The person failed to attend without giving reasonable prior notice;",
                    "The request was submitted outside the applicable period without a valid reason;",
                    "The person was removed because of misconduct or a serious breach of event rules;",
                    "The payment was made for a clearly identified non-refundable third-party cost that had already been incurred;",
                    "The information supplied in the request is false, incomplete or cannot be verified; or",
                    "There is reasonable evidence of fraud or abuse of the refund process.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-red-400 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl bg-[#F8F9FC] p-4 text-xs md:text-sm text-[#555555] border-l-2 border-[#4CC0D8]">
                  Nothing in this section constitutes a blanket “no refund” disclaimer or excludes a right or remedy provided by Zambian law. The CCPC states that general notices such as “No Refund, No Exchange or No Returns” may unlawfully deny consumers remedies to which they are entitled. <em>(ccpc.org.zm)</em>
                </div>
              </article>

              {/* 7. How to request a refund */}
              <article
                id="how-to-request"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-5"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">7.</span> How to request a refund
                </h2>
                <p className="text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  A refund request must be submitted in writing using the Foundation’s official email address or website contact form.
                </p>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm md:text-base text-[#1D1D1D]">
                    The request should include:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#555555]">
                    {[
                      "The payer’s full name",
                      "Email address and telephone number",
                      "Payment date",
                      "Amount paid",
                      "Transaction or payment reference number",
                      "Name of the event, programme, service or donation campaign",
                      "Reason for requesting the refund",
                      "Proof of payment",
                      "Any supporting documents",
                    ].map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 rounded-lg bg-[#F8F9FC] p-2.5">
                        <FileText className="h-4 w-4 text-[#4CC0D8] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-[#EBF7F9] p-5 space-y-3 border border-[#4CC0D8]/20">
                  <h4 className="font-bold text-sm md:text-base text-[#006677]">
                    Refund requests should be sent to:
                  </h4>
                  <ul className="space-y-1.5 text-xs md:text-sm text-[#333333]">
                    <li><strong>Email:</strong> [Insert official email address]</li>
                    <li><strong>Telephone:</strong> [Insert official telephone number]</li>
                    <li><strong>Website:</strong> [Insert website address]</li>
                    <li><strong>Physical address:</strong> [Insert physical address]</li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006677] hover:underline"
                    >
                      <span>Visit Contact Page</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-[#666666]">
                  The Foundation may request additional information to verify the payer’s identity, ownership of the payment method or circumstances of the transaction.
                </p>
              </article>

              {/* 8. Review and approval */}
              <article
                id="review-and-approval"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">8.</span> Review and approval
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    Refund requests will be reviewed by The Remnant Foundation management.
                  </p>
                  <p className="font-semibold text-[#1D1D1D]">
                    Management will consider:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555]">
                    {[
                      "The reason for the request;",
                      "The date of payment and date of the request;",
                      "Whether the service has already been provided;",
                      "Whether the Foundation has already incurred non-recoverable costs;",
                      "The evidence supplied;",
                      "The conditions communicated at the time of payment;",
                      "The requirements of the payment provider; and",
                      "Applicable Zambian law.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    Management approval applies to discretionary refund requests. A refund or remedy that is mandatory under applicable law will not be denied merely because discretionary approval has not been granted.
                  </p>
                  <p>
                    The Foundation will communicate its decision to the applicant using the contact details provided.
                  </p>
                </div>
              </article>

              {/* 9. Processing approved refunds */}
              <article
                id="processing"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">9.</span> Processing approved refunds
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    Approved refunds will ordinarily be initiated within seven to fourteen business days after approval.
                  </p>
                  <p>
                    Refunds will normally be returned through the same payment method used for the original transaction. The Foundation may use another verified method where:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555] pl-1">
                    {[
                      "The original method is unavailable;",
                      "The payment provider does not support a reversal; or",
                      "The payer and Foundation agree to another secure method.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    After the Foundation initiates a refund, the time taken for the funds to appear in the payer’s account may depend on the relevant bank, card issuer, mobile-money operator or payment gateway.
                  </p>
                  <div className="rounded-xl bg-[#F8F9FC] p-4 text-xs md:text-sm text-[#555555] border-l-2 border-[#4CC0D8]">
                    Where Zambian law requires an immediate refund or another specific processing period, the legally required period will apply. For qualifying electronic cancellations, the Act provides that a full refund must be made within thirty days of cancellation. <em>(Parliament of Zambia)</em>
                  </div>
                </div>
              </article>

              {/* 10. Transaction and payment-provider charges */}
              <article
                id="charges"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">10.</span> Transaction and payment-provider charges
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    Where a bank, card network, mobile-money operator or payment gateway charges a fee that it does not return to the Foundation, the treatment of that fee will depend on:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555] pl-1">
                    {[
                      "Applicable law;",
                      "The payment provider’s rules;",
                      "The reason for the refund; and",
                      "Whether the fee was clearly disclosed before payment.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-[#1D1D1D]">
                    The Foundation will not make an undisclosed administrative deduction from an approved refund.
                  </p>
                </div>
              </article>

              {/* 11. Duplicate, incorrect and unauthorised transactions */}
              <article
                id="duplicate-transactions"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">11.</span> Duplicate, incorrect and unauthorised transactions
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    A payer who notices a duplicate, incorrect or unauthorised transaction should notify the Foundation immediately.
                  </p>
                  <p>
                    For an unauthorised payment, the payer should also contact their bank, card issuer or mobile-money operator without delay.
                  </p>
                  <p className="font-semibold text-[#1D1D1D]">
                    The Foundation may suspend processing while it verifies:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555] pl-1">
                    {[
                      "The transaction reference;",
                      "The payer’s identity;",
                      "The payment account;",
                      "The amount received; and",
                      "Any suspected fraud or payment dispute.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* 12. Prices and payment records */}
              <article
                id="prices-and-records"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">12.</span> Prices and payment records
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    Service and event fees will be clearly displayed before payment. Prices will be shown in Zambian Kwacha, unless another currency is also displayed for information or payment-processing purposes.
                  </p>
                  <p>
                    The Foundation will not charge more than the displayed or agreed amount. Zambian consumer-protection law requires a trader to charge the displayed price and provides for reimbursement of any difference where a consumer is overcharged. <em>(Parliament of Zambia)</em>
                  </p>
                  <p>
                    Payers should retain their receipts, payment confirmations and transaction references. The CCPC recommends that consumers preserve transaction records when seeking redress. <em>(ccpc.org.zm)</em>
                  </p>
                </div>
              </article>

              {/* 13. Complaints and appeals */}
              <article
                id="complaints-and-appeals"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">13.</span> Complaints and appeals
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    A person who is dissatisfied with a refund decision may submit a written appeal to Foundation management within seven calendar days after receiving the decision.
                  </p>
                  <p className="font-semibold text-[#1D1D1D]">
                    The appeal should include:
                  </p>
                  <ul className="space-y-2 text-sm md:text-base text-[#555555] pl-1">
                    {[
                      "The original refund request;",
                      "The decision being challenged;",
                      "The reason for the appeal; and",
                      "Any additional supporting evidence.",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    Management will review the appeal and communicate the outcome within a reasonable period.
                  </p>
                  <div className="rounded-xl bg-[#F8F9FC] p-4 text-xs md:text-sm text-[#555555] border-l-2 border-[#4CC0D8]">
                    Where a complaint is not resolved internally, the consumer may seek assistance from the Competition and Consumer Protection Commission or another authority with jurisdiction over the transaction. The CCPC advises consumers first to contact the service provider, clearly state the remedy requested and exhaust the provider’s internal redress procedure. <em>(ccpc.org.zm)</em>
                  </div>
                </div>
              </article>

              {/* 14. Protection of personal information */}
              <article
                id="privacy"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">14.</span> Protection of personal information
                </h2>
                <p className="text-sm md:text-base text-[#4A4A4A]">
                  Personal and payment information provided during a refund request will be used only for:
                </p>
                <ul className="space-y-2 text-sm md:text-base text-[#555555]">
                  {[
                    "Verifying the transaction;",
                    "Assessing the request;",
                    "Preventing fraud;",
                    "Processing an approved refund;",
                    "Maintaining financial and audit records; and",
                    "Complying with legal or regulatory obligations.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#4CC0D8] shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm md:text-base text-[#4A4A4A] pt-2">
                  Information will be handled in accordance with the Foundation’s Privacy Policy and applicable Zambian law.
                </p>
              </article>

              {/* 15. Changes to this policy */}
              <article
                id="changes"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">15.</span> Changes to this policy
                </h2>
                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p>
                    The Remnant Foundation may update this policy to reflect changes in its activities, payment systems, banking requirements or applicable law.
                  </p>
                  <p>
                    The latest version will be published on the Foundation’s website together with its effective date. A change will not unfairly remove a right that had already arisen before the change took effect.
                  </p>
                </div>
              </article>

              {/* 16. Contact information */}
              <article
                id="contact"
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm space-y-6"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1D] flex items-center gap-2">
                  <span className="text-[#4CC0D8]">16.</span> Contact information
                </h2>
                <div className="rounded-2xl border border-gray-100 bg-[#F8F9FC] p-6 space-y-4">
                  <h3 className="font-bold text-lg text-[#1D1D1D]">
                    The Remnant Foundation
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#4A4A4A]">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1D1D1D]">Registration number:</strong>
                        <span>[Insert registration number]</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1D1D1D]">Physical address:</strong>
                        <span>[Insert physical address]</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1D1D1D]">Postal address:</strong>
                        <span>[Insert postal address, where applicable]</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1D1D1D]">Telephone:</strong>
                        <span>[Insert telephone number]</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1D1D1D]">Email:</strong>
                        <span>[Insert official email address]</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-[#4CC0D8] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#1D1D1D]">Website:</strong>
                        <span>[Insert website address]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Website payment acknowledgement reference */}
              <article
                id="acknowledgement"
                className="scroll-mt-24 rounded-2xl border-2 border-[#4CC0D8]/40 bg-[#F3FBFC] p-6 md:p-8 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4CC0D8] text-white shrink-0">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#1D1D1D]">
                      Website payment acknowledgement
                    </h3>
                    <p className="text-xs text-[#006677]">
                      Merchant Compliance Notice
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm md:text-base text-[#4A4A4A] leading-relaxed">
                  <p className="font-medium text-[#1D1D1D]">
                    Place the following statement immediately above the payment button:
                  </p>
                  <blockquote className="rounded-xl bg-white p-4 text-xs md:text-sm font-medium text-[#1D1D1D] border-l-4 border-[#4CC0D8] shadow-2xs">
                    “By proceeding with payment, I confirm that I have reviewed and accepted The Remnant Foundation’s Refund and Cancellation Policy and the applicable terms of the event, service or donation. This acknowledgement does not limit any rights available to me under the laws of Zambia.”
                  </blockquote>
                  <p className="text-xs md:text-sm text-[#666666] pt-1">
                    Before submitting the website to the bank, replace every bracketed field with the Foundation’s official registration and contact details. The Electronic Communications and Transactions Act specifically requires online suppliers to disclose their legal identity, physical address, telephone number, website, email, registration details, full pricing, payment terms, refund policy and privacy arrangements. <em>(Parliament of Zambia)</em>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
