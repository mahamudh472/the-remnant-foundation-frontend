import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Check,
  ArrowRight,
  Monitor,
  Users,
  Palette,
  Cpu,
  Heart,
  GraduationCap,
  TrendingUp,
  Infinity,
  ChevronRight,
} from "lucide-react"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="space-y-6 px-4 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-3xl space-y-5">
            <span className="inline-block rounded-full bg-[#4CC0D8]/10 px-4 py-1.5 text-sm font-semibold text-[#4CC0D8]">
              A New Standard in Education
            </span>
            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-[#1D1D1D] md:text-5xl lg:text-[3.25rem]">
              Skills Development School
            </h1>
            <p className="text-xl font-bold text-[#1D1D1D] md:text-2xl">
              Empowering Youth With{" "}
              <span className="text-[#4CC0D8]">
                Real-Life Skills &amp; Career Readiness
              </span>
            </p>
            <p className="mx-auto max-w-xl text-[#666666]">
              Transform your potential with support from our comprehensive
              programs combining cutting-edge technology, hands-on training, and
              expert mentorship.
            </p>
            <Button
              asChild
              className="h-12 rounded-lg bg-[#4CC0D8] px-10 font-bold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]"
            >
              <Link href="/signup">Enroll Now</Link>
            </Button>
          </div>
        </section>

        {/* ── Why Skills Development Matters ── */}
        <section className="bg-[#f8f9fc] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              {/* Left text */}
              <div className="space-y-7">
                <span className="inline-block rounded-full bg-[#4CC0D8]/10 px-4 py-1.5 text-sm font-semibold text-[#4CC0D8]">
                  Who We Are!
                </span>
                <h2 className="text-3xl font-extrabold text-[#1D1D1D] md:text-4xl">
                  Why Skills Development Matters
                </h2>
                <p className="text-[#666666]">
                  Investing in skills development is investing in your future.
                  Here&apos;s why it&apos;s essential for success in the modern
                  world.
                </p>
                <ul className="space-y-4">
                  {[
                    "Builds confidence and problem-solving ability at every age",
                    "Ensures a motivating platform placing every child's well-being first",
                    "Gives learners access to tools to challenge themselves and explore their dreams",
                    "Gives learners practical, applicable skills through hands-on projects and real-world experience",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[#666666]"
                    >
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4CC0D8]/10">
                        <div className="h-2 w-2 rounded-full bg-[#4CC0D8]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#programs"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4CC0D8] hover:underline"
                >
                  Find Your Perfect Program <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              {/* Right image */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/assets/pngs/For web/skill dev illus.png"
                    alt="Skills Development"
                    width={560}
                    height={480}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Programs By Age Group ── */}
        <section id="programs" className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 space-y-4 text-center">
              <span className="inline-block rounded-full bg-[#4CC0D8]/10 px-4 py-1.5 text-sm font-semibold text-[#4CC0D8]">
                Find Your Perfect Program
              </span>
              <h2 className="text-3xl text-[#1D1D1D] md:text-4xl">
                Programs By Age Group
              </h2>
              <p className="mx-auto max-w-xl text-[#666666]">
                Tailored learning paths designed specifically for each
                developmental stage.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: "Kids Program",
                  age: "Ages 5–10",
                  desc: "Creative exploration and foundational learning through fun, interactive experiences.",
                  tags: ["Basic Skills", "Problem Solving"],
                  stats: { courses: "8 Courses", hours: "4 hrs" },
                  badgeColor: "bg-[#EBF7F9] text-[#4CC0D8]",
                  href: "/courses?age=kids",
                },
                {
                  title: "Teens Program",
                  age: "Ages 11–18",
                  desc: "Essential technical skills, career exploration, and performing development.",
                  tags: ["Digital Skills", "Leadership"],
                  stats: { courses: "12 Courses", hours: "8 hrs" },
                  badgeColor: "bg-[#FDF6FF] text-[#C776EA]",
                  href: "/courses?age=teen",
                },
                {
                  title: "Young Adults Program",
                  age: "Ages 19–25",
                  desc: "Career-focused training, professional skills, and vocational development.",
                  tags: ["Career Planning", "Freelancing"],
                  stats: { courses: "16 Courses", hours: "12 hrs" },
                  badgeColor: "bg-[#FFFBEB] text-[#F59E0B]",
                  href: "/courses?age=young-adults",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-primary/10 p-7 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="space-y-1">
                    <h3 className="mt-2 text-xl text-[#1D1D1D]">
                      {card.title}
                    </h3>
                    <span className={`inline-block py-0.5 text-xs`}>
                      {card.age}
                    </span>
                    <p className="text-sm text-[#666666]">{card.desc}</p>
                  </div>
                  <span className="text-sm text-gray-500">Skills you'll learn: </span>
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium bg-white text-[#666666]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="py-6"
                  >
                    <Link href={card.href}>
                      View Courses <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Certification & Achievements ── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              {/* Left image */}
              <div className="flex justify-center border-gray-200 rounded-lg border-2">
                <Image
                  src="/assets/pngs/For web/certifications.png"
                  alt="Certifications"
                  width={480}
                  height={400}
                  className="h-auto w-full max-w-sm"
                />
              </div>
              {/* Right text */}
              <div className="space-y-7">
                <h2 className="text-3xl font-extrabold text-[#1D1D1D] md:text-4xl">
                  Certification &amp; Achievements
                </h2>
                <p className="text-[#666666]">
                  Gain certificates that matter. Our industry-recognized
                  credentials validate your skills and open doors to exciting
                  career opportunities.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      icon: GraduationCap,
                      title: "Course Completion Benefits",
                      desc: "Gain real credentials, certified projects, skill-exclusive access to job opportunities.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Career Value",
                      desc: "Stand out to employers with certifications recognized by leading companies worldwide.",
                    },
                    {
                      icon: Infinity,
                      title: "Lifetime Access",
                      desc: "Keep your certificates forever and showcase them on LinkedIn and your resume.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-5 rounded-lg p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF7F9] text-[#4CC0D8]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1D1D1D]">{title}</h4>
                        <p className="mt-0.5 text-sm text-[#666666]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Together We Can Change Lives ── */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative space-y-5 overflow-hidden rounded-3xl bg-[#4CC0D8] px-10 py-14 text-center text-white">
              <h2 className="relative z-10 text-2xl font-extrabold md:text-3xl">
                Together We Can Change Lives
              </h2>
              <p className="relative z-10 mx-auto max-w-xl text-sm text-white/80">
                Join thousands of students, mentors, and sponsors who are
                already making a difference through education and skills
                development.
              </p>
              <Button
                asChild
                className="relative z-10 h-11 rounded-xl bg-white px-8 font-bold text-[#4CC0D8] hover:bg-white/90"
              >
                <Link href="/partnership/donate">Become a Sponsor</Link>
              </Button>
              <div className="absolute top-0 right-0 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-56 w-56 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            </div>
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl space-y-6 px-4">
            <h2 className="text-3xl font-extrabold text-[#1D1D1D] md:text-4xl">
              Skills Development School
            </h2>
            <p className="text-[#666666]">
              Join thousands of students at their campus and academy partner.
            </p>
            <Button
              asChild
              className="h-12 rounded-lg bg-[#4CC0D8] px-10 font-bold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]"
            >
              <Link href="/signup">Sign up now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
