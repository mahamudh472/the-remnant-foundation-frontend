import Image from "next/image"
import { UserPlus, Video, BarChart2, BookOpen, Sparkles } from "lucide-react"

const STEPS = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Join our learning community and access educational resources.",
    icon: UserPlus,
    iconBg: "bg-[#EBF7F9]",
    iconColor: "text-[#4CC0D8]",
  },
  {
    num: "02",
    title: "Attend Live Classes",
    desc: "Learn interactively with instructors and fellow students.",
    icon: Video,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#F59E0B]",
  },
  {
    num: "03",
    title: "Monitor Your Progress",
    desc: "Track achievements and celebrate every milestone.",
    icon: BarChart2,
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#C776EA]",
  },
  {
    num: "04",
    title: "Grow Spiritually & Academically",
    desc: "Build knowledge, strengthen faith, and develop your potential. that is the in-put",
    icon: Sparkles,
    iconBg: "bg-[#EDE9FE]",
    iconColor: "text-[#8B5CF6]",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Steps */}
          <div className="space-y-2">
            <h2 className="mb-8 text-2xl font-bold text-[#1D1D1D]">
              How It Works
            </h2>
            <div className="space-y-4">
              {STEPS.map((step, idx) => {
                const Icon = step.icon
                const isEven = idx % 2 !== 0
                return (
                  <div
                    key={step.num}
                    className={`group flex cursor-default items-center gap-4 ${isEven ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Large number */}
                    <span className="min-w-[72px] text-center text-6xl leading-none font-extrabold text-gray-100 transition-colors duration-300 select-none group-hover:text-[#4CC0D8]/15 md:text-7xl">
                      {step.num}
                    </span>
                    {/* Card */}
                    <div className="flex flex-1 items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all group-hover:border-[#4CC0D8]/30 group-hover:shadow-md">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${step.iconBg}`}
                      >
                        <Icon className={`h-5 w-5 ${step.iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm leading-tight font-semibold text-[#1D1D1D]">
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[#9CA3AF]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative hidden lg:block">
            <div className="flex items-start gap-4">
              {/* Left photo — taller */}
              <div className="mt-8 w-[45%] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/assets/pngs/For web/Photo.png"
                  alt="Student learning"
                  width={280}
                  height={380}
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* Right photo — slightly bigger */}
              <div className="w-[55%] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/assets/pngs/For web/Photo-1.png"
                  alt="Professional learning"
                  width={320}
                  height={360}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {[
                  "/assets/pngs/student.png",
                  "/assets/pngs/student.png",
                  "/assets/pngs/student.png",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-[#EBF7F9]"
                  >
                    <Image
                      src={src}
                      alt="learner"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm leading-none font-bold text-[#4CC0D8]">
                  10K+
                </p>
                <p className="text-xs text-[#9CA3AF]">Job Seekers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
