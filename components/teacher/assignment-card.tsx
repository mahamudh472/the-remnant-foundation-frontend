import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AssigmentCard({ assignment }) {
  return (
    <Card
      key={assignment.title}
      className="border-gray-100 bg-primary/5 shadow-none transition-shadow hover:shadow-md"
    >
      <CardContent>
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-md line-clamp-2 leading-snug font-bold text-[#1D1D1D]">
            {assignment.title}
          </h3>
          <Badge
            className={cn(
              "ml-2 shrink-0 text-[10px]",
              assignment.status === "Published"
                ? "bg-[#EBF7F9] text-[#4CC0D8]"
                : assignment.status === "Closed"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
            )}
          >
            {assignment.status}
          </Badge>
        </div>

        <div className="flex flex-col text-[#666666]">
          <p>
            <span className="font-semibold">Grade:</span> {assignment.grade}
          </p>
          <p>
            <span className="font-semibold">Course:</span> {assignment.course}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {assignment.type}
          </p>
          <p>
            <span className="font-semibold">Due:</span> {assignment.dueDate}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-semibold text-[#1D1D1D]">
                {assignment.submissions}
              </span>
              <span className="text-[#9CA3AF]">
                / {assignment.total} submissions
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#4CC0D8] transition-all"
                style={{
                  width: `${(assignment.submissions / assignment.total) * 100}%`,
                }}
              />
            </div>
          </div>
          <Link
            href={`/teacher/assignments/${assignment.id}`}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-[#4CC0D8] hover:text-[#4CC0D8]"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
