import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react"

const ORDERS = [
  { date: "5/27/15", course: "Kingdom Leadership Academy", price: "$6.48" },
  { date: "5/19/12", course: "Spiritual Growth Masterclass", price: "$11.70" },
  {
    date: "8/16/13",
    course: "Biblical Entrepreneurship & Ethics",
    price: "$5.22",
  },
  { date: "8/15/17", course: "Purpose-Driven Life Training", price: "$11.70" },
  {
    date: "1/15/12",
    course: "Advanced Bible Study & Interpretation",
    price: "$8.99",
  },
  {
    date: "12/10/13",
    course: "Faith & Character Building for Kids",
    price: "$11.70",
  },
  {
    date: "6/21/19",
    course: "God's Love & Kindness Adventures",
    price: "$14.81",
  },
  { date: "8/30/14", course: "Young Worshipers Club", price: "$17.84" },
]

export default function OrderHistoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1D1D1D]">Teacher Applying</h2>

      <Card className="border-gray-100 shadow-none">
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-xl">
            <Table>
              <TableHeader>
                <TableRow className="border-0 bg-gradient-to-r from-[#E8F8FB] to-[#E0F4FF] hover:from-[#E8F8FB] hover:to-[#E0F4FF]">
                  <TableHead className="py-4 pl-6 text-xs font-bold text-[#4CC0D8]">
                    Date
                  </TableHead>
                  <TableHead className="py-4 text-xs font-bold text-[#4CC0D8]">
                    Course
                  </TableHead>
                  <TableHead className="py-4 text-xs font-bold text-[#4CC0D8]">
                    Price
                  </TableHead>
                  <TableHead className="py-4 pr-6 text-right text-xs font-bold text-[#4CC0D8]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ORDERS.map((order, i) => (
                  <TableRow
                    key={i}
                    className="border-gray-50 hover:bg-[#F8F9FC]"
                  >
                    <TableCell className="py-4 pl-6 text-sm text-[#666666]">
                      {order.date}
                    </TableCell>
                    <TableCell className="py-4 text-sm text-[#1D1D1D]">
                      {order.course}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium text-[#1D1D1D]">
                      {order.price}
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-right">
                      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition-colors hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
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
