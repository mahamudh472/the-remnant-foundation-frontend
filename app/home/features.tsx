import { Card } from "@/components/ui/card"
import Image from "next/image"

const FEATURES = [
  {
    title: "Courses & Quizzes",
    icon: "/assets/svgs/for-web/create engaging course illus.svg",
  },
  {
    title: "Live Classes",
    icon: "/assets/svgs/for-web/live classes illus.svg",
  },
  {
    title: "AI Spiritual Guide",
    icon: "/assets/svgs/for-web/ai guide illus.svg",
  },
  {
    title: "Progress Tracking",
    icon: "/assets/svgs/for-web/monitor progress illus.svg",
  },
  {
    title: "Admin / LMS System",
    icon: "/assets/svgs/for-web/web partnership.svg",
  },
  {
    title: "Personalized Learning",
    icon: "/assets/svgs/for-web/web personalizes illus.svg",
  },
]

export function Features() {
  return (
    <section className="bg-[#fcfdfe] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Core Features
          </h2>
          <p className="text-[#666666]">
            Everything you need for a comprehensive learning journey.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group flex flex-col items-center space-y-6 p-8 text-center transition-all hover:border-[#4CC0D8] hover:shadow-xl hover:shadow-[#4CC0D8]/5"
            >
              <div className="flex h-32 w-full items-center justify-center transition-transform group-hover:scale-110">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={160}
                  height={120}
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1D]">
                {feature.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
