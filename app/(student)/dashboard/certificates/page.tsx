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

const CERTIFICATES = [
  {
    id: "01",
    course: "Faith & Career Direction",
    date: "22 Aug 2025",
    marks: 20,
    outOf: 20,
  },
  {
    id: "02",
    course: "Healthy Lifestyle & Habits",
    date: "10 Aug 2025",
    marks: 18,
    outOf: 20,
  },
  {
    id: "03",
    course: "Preparing for Marriage",
    date: "26 Jul 2025",
    marks: 25,
    outOf: 30,
  },
  {
    id: "04",
    course: "Faith & Career Direction",
    date: "14 Jul 2025",
    marks: 15,
    outOf: 20,
  },
  {
    id: "05",
    course: "Healthy Lifestyle & Habits",
    date: "19 Jun 2025",
    marks: 20,
    outOf: 30,
  },
  {
    id: "06",
    course: "Faith & Career Direction",
    date: "12 Jun 2025",
    marks: 20,
    outOf: 20,
  },
]

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">My Certificates</h2>

      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-0">
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
                {CERTIFICATES.map((cert) => (
                  <TableRow
                    key={cert.id}
                    className="border-gray-50 hover:bg-[#F8F9FC]"
                  >
                    <TableCell className="py-4 pl-6 text-sm text-[#666666]">
                      {cert.id}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium text-[#1D1D1D]">
                      {cert.course}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-[#666666]">
                      {cert.date}
                    </TableCell>
                    <TableCell className="py-4 text-center text-sm text-[#666666]">
                      {cert.marks}
                    </TableCell>
                    <TableCell className="py-4 text-center text-sm text-[#666666]">
                      {cert.outOf}
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:bg-[#EBF7F9] hover:text-[#4CC0D8]">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FC] text-[#9CA3AF] transition-colors hover:bg-[#EBF7F9] hover:text-[#4CC0D8]">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
