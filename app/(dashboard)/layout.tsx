import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ProfileBanner } from "@/components/dashboard/profile-banner"
import { PageBanner } from "@/components/dashboard/page-banner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <PageBanner />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProfileBanner />
        <div className="flex flex-col gap-8 py-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <DashboardSidebar />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}
