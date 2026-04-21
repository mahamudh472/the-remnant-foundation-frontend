"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Download } from "lucide-react"
import { useStudentCertificatesQuery } from "@/hooks/api/use-students"
import { getApiErrorMessage } from "@/lib/api/client"

function formatCertificateDate(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function CertificatesPage() {
  const { data, isLoading, isError, error } = useStudentCertificatesQuery()
  const certificates = data || []

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">My Certificates</h2>

      <Card className="border-gray-100 shadow-none">
        <CardContent>
          {isLoading ? (
            <div className="space-y-3 p-6">
              <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
            </div>
          ) : isError ? (
            <div className="p-6 text-sm text-red-600">
              {getApiErrorMessage(error, "Failed to load certificates.")}
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-sm text-[#9CA3AF] text-center">
              You do not have any certificates yet.
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl">
              <Table>
                <TableHeader>
                  <TableRow className="border-0 bg-[#EBF7F9] hover:bg-[#EBF7F9]">
                    <TableHead className="py-4 pl-6 text-xs font-bold text-[#1D1D1D]">
                      ID
                    </TableHead>
                    <TableHead className="py-4 text-xs font-bold text-[#1D1D1D]">
                      Course Name
                    </TableHead>
                    <TableHead className="py-4 text-xs font-bold text-[#1D1D1D]">
                      Date
                    </TableHead>
                    <TableHead className="py-4 text-center text-xs font-bold text-[#1D1D1D]">
                      Marks
                    </TableHead>
                    <TableHead className="py-4 text-center text-xs font-bold text-[#1D1D1D]">
                      Out of
                    </TableHead>
                    <TableHead className="py-4 pr-6 text-right text-xs font-bold text-[#1D1D1D]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((certificate) => (
                    <TableRow
                      key={certificate.certificate_id}
                      className="border-gray-50 hover:bg-[#F8F9FC]"
                    >
                      <TableCell className="py-4 pl-6 text-sm text-[#666666]">
                        {String(certificate.certificate_id).padStart(2, "0")}
                      </TableCell>
                      <TableCell className="py-4 text-sm font-medium text-[#1D1D1D]">
                        {certificate.course_name}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-[#666666]">
                        {formatCertificateDate(certificate.date)}
                      </TableCell>
                      <TableCell className="py-4 text-center text-sm text-[#666666]">
                        {certificate.marks}
                      </TableCell>
                      <TableCell className="py-4 text-center text-sm text-[#666666]">
                        {certificate.out_of}
                      </TableCell>
                      <TableCell className="py-4 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            disabled
                            className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF]"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            disabled
                            className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF]"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
