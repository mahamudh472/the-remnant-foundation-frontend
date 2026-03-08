import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ArrowLeft } from "lucide-react"

export default function TeacherApplySuccessPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-lg border-gray-100 shadow-none">
        <CardContent className="space-y-6 p-10 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>

          <h2 className="text-xl font-bold text-[#1D1D1D]">
            Application Submitted
          </h2>

          <Badge className="border-[#F59E0B]/20 bg-[#FFF8E8] px-4 py-1.5 text-xs font-semibold text-[#F59E0B]">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            Under Review
          </Badge>

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#666666]">
            Thank you for your interest in becoming a teacher. Our admin team
            will carefully review your application and get back to you within{" "}
            <strong>5-7 business days</strong>.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4CC0D8] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3AB0C8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <p className="text-xs text-[#9CA3AF]">
            We&apos;ll send you an email notification once your application has
            been reviewed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
