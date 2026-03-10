import { Navbar } from "@/components/navbar"
import { TeacherSidebar } from "@/components/teacher/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        <div className="flex flex-col gap-8 py-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:sticky lg:top-30 lg:w-64 lg:self-start">
            <TeacherSidebar />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </>
  )
}
