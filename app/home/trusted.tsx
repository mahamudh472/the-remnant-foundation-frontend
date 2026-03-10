const STATS = [
  { value: "5,000+", label: "Active Students" },
  { value: "200+", label: "Expert Teachers" },
  { value: "95%", label: "Satisfaction Rate" },
]

export function Trusted() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl space-y-12 px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Trusted by Learners Worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#666666] italic md:text-base">
            &quot;For I know the plans I have for you,&quot; declares the Lord,
            &quot;plans to prosper you and not to harm you, plans to give you
            hope and a future.&quot; – Jeremiah 29:11
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-4xl font-extrabold text-[#4CC0D8] md:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm text-[#666666]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
