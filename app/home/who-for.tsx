import Image from "next/image"

const CARDS = [
  {
    title: "Students (5–25 years)",
    desc: "Interactive courses, live classes, and personalized guidance to help you learn and grow spiritually.",
    icon: "/assets/svgs/for-web/web Student section.svg",
    bg: "bg-[#EBF7F9]",
  },
  {
    title: "Teachers & Mentors",
    desc: "Create courses, manage live classes, and mentor students around the world with ease.",
    icon: "/assets/svgs/for-web/web join live classe illus.svg",
    bg: "bg-[#F3FBFC]",
  },
  {
    title: "Admin & Foundation Team",
    desc: "Comprehensive dashboard for managing users, courses, and overall platform analytics.",
    icon: "/assets/svgs/for-web/web partnership.svg",
    bg: "bg-[#ECF1F9]",
  },
]

export function WhoFor() {
  return (
    <section className="bg-[#f8f9fc] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Who is This Platform For?
          </h2>
          <p className="text-[#666666]">
            Built for everyone in the learning ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} flex flex-col items-center space-y-6 rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl`}
            >
              <div className="flex h-40 w-full items-center justify-center">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={200}
                  height={160}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#1D1D1D]">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#666666]">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
