import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeacherSidebar } from "@/components/teacher/sidebar"
import { TeacherProfileBanner } from "@/components/teacher/profile-banner"
import { TeacherPageBanner } from "@/components/teacher/page-banner"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <TeacherPageBanner />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TeacherProfileBanner />
        <div className="flex flex-col gap-8 py-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <TeacherSidebar />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}
