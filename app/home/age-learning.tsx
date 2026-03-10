import { RefreshCw } from "lucide-react"

const TIERS = [
  {
    title: "Kids (5–12)",
    barColor: "bg-[#F59E0B]",
    features: ["Interactive stories", "Fun quizzes", "Visual learning"],
  },
  {
    title: "Teens (13–18)",
    barColor: "bg-[#4CC0D8]",
    features: [
      "Discussion forums",
      "Project-based learning",
      "Peer collaboration",
    ],
  },
  {
    title: "Young Adults (19–25)",
    barColor: "bg-[#C776EA]",
    features: ["In-depth theology", "Leadership training", "Career guidance"],
  },
]

export function AgeLearning() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 space-y-3 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Age-Based Learning Experience
          </h2>
          <p className="text-[#666666]">
            Content tailored to your developmental stage
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-[#FFF8EE]"
            >
              {/* Colored top bar */}
              <div className={`h-2 w-full ${tier.barColor}`} />
              <div className="space-y-5 p-7">
                <h3 className="text-xl font-bold text-[#1D1D1D]">
                  {tier.title}
                </h3>
                <ul className="space-y-3">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-3 text-sm text-[#1D1D1D]"
                    >
                      <RefreshCw className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
