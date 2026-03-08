import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronRight, ArrowRight, Play, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1D] leading-[1.1]">
                  A Modern Learning & <br />
                  <span className="text-[#4CC0D8]">Spiritual Growth</span>
                </h1>
                <p className="text-lg text-[#666666] max-w-xl mx-auto lg:mx-0">
                  Learn, grow, and stay spiritually connected—anytime, anywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button className="h-12 px-8 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-lg font-semibold shadow-lg shadow-[#4CC0D8]/20 transition-all hover:scale-[1.02]">
                    Get Started
                  </Button>
                  <Button variant="outline" className="h-12 px-8 border-[#C776EA] text-[#C776EA] hover:bg-[#FDF6FF] rounded-lg font-semibold transition-all">
                    Explore Programs
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 w-full animate-in fade-in slide-in-from-right duration-700">
                  <Image
                    src="/assets/svgs/for-web/Home hero illustration.svg"
                    alt="Hero Illustration"
                    width={800}
                    height={600}
                    className="w-full h-auto drop-shadow-xl"
                    priority
                  />
                </div>
                {/* Decorative blobs */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#4CC0D8]/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#C776EA]/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
              </div>
            </div>
          </div>
        </section>

        {/* Who is This Platform For? */}
        <section className="py-24 bg-[#f8f9fc]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Who is This Platform For?</h2>
              <p className="text-[#666666]">Built for everyone in the learning ecosystem.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Students (5-25 years)",
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
                }
              ].map((card, idx) => (
                <div key={idx} className={cn("rounded-2xl p-8 flex flex-col items-center text-center space-y-6 transition-all hover:-translate-y-2 hover:shadow-xl", card.bg)}>
                  <div className="h-40 w-full flex items-center justify-center">
                    <Image src={card.icon} alt={card.title} width={200} height={160} className="h-full w-auto object-contain" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#1D1D1D]">{card.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Banner */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-[#4CC0D8] rounded-[2rem] p-8 md:p-12 overflow-hidden relative group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-white space-y-4 text-center md:text-left max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold">Empowering Your Journey with AI</h2>
                  <p className="opacity-90">
                    Explore cutting-edge AI technology that transforms your experience, offers automation,
                    personalized solutions and smarter decision making.
                  </p>
                  <Button className="h-12 bg-white text-[#4CC0D8] hover:bg-white/90 rounded-full px-8 font-bold flex items-center gap-2">
                    Explore AI Spiritual Guide <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative w-full max-w-xs md:max-w-sm transition-transform duration-500 group-hover:scale-110">
                  <Image src="/assets/svgs/for-web/ai guide illus.svg" alt="AI Illustration" width={400} height={400} className="w-full h-auto" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <h2 className="text-sm font-bold text-[#4CC0D8] tracking-[0.2em] uppercase">How It Works</h2>
                  <div className="space-y-6">
                    {[
                      { num: "01", title: "Sign Up and create Account", desc: "Gain early access for free" },
                      { num: "02", title: "Apply Admission / Join Course", desc: "Learn from better mentors" },
                      { num: "03", title: "Track Progress", desc: "Know where you stand" },
                      { num: "04", title: "Track Progress", desc: "Interactive dashboard experience" },
                      { num: "05", title: "Grow Spiritually & Academically", desc: "Reach your maximum potential" },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-6 group cursor-default">
                        <span className="text-5xl md:text-6xl font-bold text-gray-100 group-hover:text-[#4CC0D8]/20 transition-colors duration-300 select-none">
                          {step.num}
                        </span>
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1 transition-all group-hover:border-[#4CC0D8]/30 group-hover:shadow-md">
                          <h4 className="font-bold text-[#1D1D1D]">{step.title}</h4>
                          <p className="text-xs text-[#9CA3AF]">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4 pt-12">
                      <div className="rounded-[2rem] overflow-hidden shadow-2xl transition-transform hover:-rotate-1">
                        <Image src="/assets/pngs/Profile.png" alt="Process 1" width={300} height={400} className="w-full h-auto" />
                      </div>
                      <div className="bg-[#4CC0D8] rounded-[2rem] p-6 text-white text-center space-y-2">
                        <p className="text-3xl font-bold">10K+</p>
                        <p className="text-xs opacity-80 uppercase tracking-widest">Active Learners</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-[#E7ECF2] rounded-[2rem] p-8 flex items-center justify-center">
                        <Play className="h-16 w-16 text-[#4CC0D8] fill-[#4CC0D8]" />
                      </div>
                      <div className="rounded-[2rem] overflow-hidden shadow-2xl transition-transform hover:rotate-1">
                        <Image src="/assets/pngs/Profile.png" alt="Process 2" width={300} height={400} className="w-full h-auto" />
                      </div>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1D1D1D]">Verified Progress</p>
                      <p className="text-[10px] text-[#9CA3AF]">Updated 2m ago</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-24 bg-[#fcfdfe]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D]">Core Features</h2>
              <p className="text-[#666666]">Everything you need for a comprehensive learning journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Courses & Quizzes", icon: "/assets/svgs/for-web/create engaging course illus.svg" },
                { title: "Live Classes", icon: "/assets/svgs/for-web/live classes illus.svg" },
                { title: "AI Spiritual Guide", icon: "/assets/svgs/for-web/ai guide illus.svg" },
                { title: "Progress Tracking", icon: "/assets/svgs/for-web/monitor progress illus.svg" },
                { title: "Admin/LMS System", icon: "/assets/svgs/for-web/web partnership.svg" },
                { title: "Personalized Learning", icon: "/assets/svgs/for-web/web personalizes illus.svg" },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-8 border border-gray-50 flex flex-col items-center text-center space-y-6 transition-all hover:border-[#4CC0D8] hover:shadow-xl hover:shadow-[#4CC0D8]/5 group">
                  <div className="h-32 w-full flex items-center justify-center transition-transform group-hover:scale-110">
                    <Image src={feature.icon} alt={feature.title} width={160} height={120} className="h-full w-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1D1D1D]">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Age-Based Experience */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1D] mb-4">Age-Based Learning Experience</h2>
            <p className="text-[#666666] mb-16">Customized content for every developmental stage.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Kids (5-12)", color: "bg-[#FFF9E5] border-t-4 border-[#FFD966]" },
                { title: "Teens (13-18)", color: "bg-[#F3FBFC] border-t-4 border-[#4CC0D8]" },
                { title: "Young Adults (19-25)", color: "bg-[#FDF6FF] border-t-4 border-[#C776EA]" },
              ].map((tier, idx) => (
                <div key={idx} className={cn("rounded-2xl p-8 space-y-6 shadow-sm", tier.color)}>
                  <h3 className="text-xl font-bold text-[#1D1D1D]">{tier.title}</h3>
                  <ul className="space-y-4 text-left">
                    {["Interactive Classes", "Personalized Mentor", "Visual Learning"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#666666]">
                         <div className="h-5 w-5 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                           <CheckCircle2 className="h-3 w-3 text-[#4CC0D8]" />
                         </div>
                         {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="text-[#1D1D1D] hover:bg-white/50 w-full font-bold">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-[#E7ECF2]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2">
                <p className="text-5xl font-extrabold text-[#4CC0D8]">5,000+</p>
                <p className="text-sm font-bold text-[#1D1D1D] uppercase tracking-[0.2em]">Active Students</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-extrabold text-[#1D1D1D]">200+</p>
                <p className="text-sm font-bold text-[#1D1D1D] uppercase tracking-[0.2em]">Partner Institutions</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-extrabold text-[#C776EA]">95%</p>
                <p className="text-sm font-bold text-[#1D1D1D] uppercase tracking-[0.2em]">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="bg-[#f8f9fc] rounded-[3rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1D] max-w-2xl mx-auto leading-tight">
                  Join ambitious professionals and unlock your dream career today
                </h2>
                <p className="text-[#666666] max-w-xl mx-auto">
                    A multi-faceted platform designed to help people from around the world to
                    learn, connect, and thrive.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Button className="h-14 px-10 bg-[#C776EA] hover:bg-[#B665D9] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#C776EA]/20">
                  Start Learning
                </Button>
                <Button variant="outline" className="h-14 px-10 border-[#4CC0D8] text-[#4CC0D8] hover:bg-[#4CC0D8]/5 rounded-xl font-bold">
                  Connect as Teacher
                </Button>
              </div>
              {/* Decorative blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#C776EA]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4CC0D8]/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
