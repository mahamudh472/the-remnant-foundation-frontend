import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronRight, Check, ArrowRight, BookOpen, Users, Layout, Laptop, Briefcase, GraduationCap, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center space-y-8 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1D1D1D] tracking-tight">
              Skills Development School
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[#666666]">
              Empowering the Next Generation with <span className="text-[#4CC0D8]">Skills & Careers Experience</span>
            </p>
            <p className="text-[#666666] max-w-2xl mx-auto">
              A comprehensive platform designed for the modern learner,
              focusing on academic excellence and professional growth.
            </p>
            <Button className="h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white px-10 rounded-lg font-bold">
              Programs
            </Button>
          </div>
        </section>

        {/* Why Institutions Choose Us? */}
        <section className="py-20 bg-[#f8f9fc]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <div className="inline-block bg-[#4CC0D8]/10 text-[#4CC0D8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                   Who we are!
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1D]">
                    Why Institutions choose us?
                </h2>
                <p className="text-[#666666]">
                    Remnant Foundation partners with institutions to provide modern
                    educational solutions and professional paths.
                </p>
                <ul className="space-y-4">
                  {[
                    "Access to world-class curriculum and resources",
                    "Expert-led sessions and mentorship programs",
                    "Hands-on experience with industry-standard tools",
                    "Verified certifications and career pathways",
                    "Community of like-minded learners and mentors"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-[#666666]">
                      <div className="h-6 w-6 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0">
                         <div className="h-2 w-2 rounded-full bg-[#4CC0D8]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl p-4">
                  <Image
                    src="/assets/pngs/skill-dev-illus.png"
                    alt="Skill Development Illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-[2rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs by Age Group */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-20">
               <div className="inline-block bg-[#4CC0D8]/10 text-[#4CC0D8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                   Skills & Pathways!
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1D]">
                    Programs by Age Group
                </h2>
                <p className="text-[#666666]">Specific tracks designed for every stage of your educational journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Pre-Primary",
                  subtitle: "(Kids)",
                  age: "5-10 years",
                  desc: "Building a foundation of curiosity and love for learning.",
                  list: ["Interactive Classes", "Foundation Learning", "Digital Basics"],
                  color: "bg-[#EBF7F9] border-t-8 border-[#4CC0D8]"
                },
                {
                  title: "Primary",
                  subtitle: "(Teens)",
                  age: "11-18 years",
                  desc: "Developing critical thinking and core technical concepts.",
                  list: ["Advanced Projects", "Spiritual Guidance", "Mentorship sessions"],
                  color: "bg-[#F3FBFC] border-t-8 border-[#4CC0D8]"
                },
                {
                  title: "Middle & Secondary",
                  subtitle: "(Young Adults)",
                  age: "19-25 years",
                  desc: "Professional pathways and career-ready specialized skills.",
                  list: ["Job placement", "Career paths", "Soft skills"],
                  color: "bg-[#ECF1F9] border-t-8 border-[#4CC0D8]"
                }
              ].map((card, idx) => (
                <div key={idx} className={cn("rounded-3xl p-8 space-y-8 flex flex-col transition-all hover:-translate-y-2 hover:shadow-xl shadow-sm", card.color)}>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#1D1D1D]">{card.title}</h3>
                    <p className="text-[#4CC0D8] font-bold">{card.subtitle}</p>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-widest font-bold">Age Group: {card.age}</p>
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed italic border-l-2 border-[#4CC0D8] pl-4">
                    {card.desc}
                  </p>
                  <ul className="space-y-4 flex-1">
                    {card.list.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#1D1D1D] font-medium">
                        <Check className="h-4 w-4 text-[#4CC0D8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-xl font-bold shadow-lg shadow-[#4CC0D8]/10">
                    Join Program
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skill Categories Offered */}
        <section className="py-24 bg-[#fcfdfe]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
               <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1D]">
                    Skill Categories Offered
               </h2>
               <p className="text-[#666666]">Professional and technical skills to excel in the current global market.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[
                { title: "Digital Skills", icon: Laptop, color: "text-[#4CC0D8] bg-[#EBF7F9]" },
                { title: "Entrepreneurship", icon: Briefcase, color: "text-[#C776EA] bg-[#FDF6FF]" },
                { title: "Vocational Skills", icon: Layout, color: "text-[#FFD966] bg-[#FFF9E5]" },
                { title: "Language Training", icon: BookOpen, color: "text-[#4CC0D8] bg-[#EBF7F9]" },
                { title: "Soft Skills", icon: Users, color: "text-[#C776EA] bg-[#FDF6FF]" },
              ].map((category, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center space-y-4 group hover:border-[#4CC0D8] transition-all hover:shadow-md">
                   <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", category.color)}>
                     <category.icon className="h-8 w-8" />
                   </div>
                   <h3 className="font-bold text-[#1D1D1D]">{category.title}</h3>
                </div>
              ))}
              <div className="bg-[#4CC0D8] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 text-white hover:bg-[#3AB0C8] cursor-pointer transition-colors shadow-lg shadow-[#4CC0D8]/20">
                 <div className="h-12 w-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                    <ArrowRight className="h-6 w-6" />
                 </div>
                 <h3 className="font-bold">View all Programs</h3>
                 <p className="text-xs opacity-80">Explore 50+ specialized tracks</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Learning Journey */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-[#4CC0D8] tracking-[0.2em] uppercase">Step by Step!</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1D] leading-tight">
                        Our Learning Journey
                    </h3>
                  </div>

                  <div className="space-y-8 relative">
                    <div className="absolute left-6 top-8 bottom-8 w-px bg-gray-100 hidden sm:block" />
                    {[
                      { step: "01", title: "Assessment & Baseline", desc: "Understanding current student level" },
                      { step: "02", title: "Placement & Tracking", desc: "Personalized path assignment" },
                      { step: "03", title: "Track Progress", desc: "Real-time monitoring" },
                      { step: "04", title: "Soft Skill Session", desc: "Holistic development focus" },
                      { step: "05", title: "Mentor Support", desc: "1-on-1 guidance" },
                      { step: "06", title: "Internship", desc: "Real-world experience" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-8 group items-start relative z-10">
                        <span className="text-4xl font-extrabold text-gray-100 group-hover:text-[#4CC0D8]/20 transition-colors w-12 shrink-0">
                          {item.step}
                        </span>
                        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex-1 shadow-sm transition-all group-hover:border-[#4CC0D8]/30 group-hover:shadow-md">
                           <h4 className="font-bold text-[#1D1D1D] group-hover:text-[#4CC0D8] transition-colors">{item.title}</h4>
                           <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="rounded-[4rem] overflow-hidden shadow-2xl bg-[#C776EA]/5 p-2">
                    <div className="rounded-[3.8rem] overflow-hidden border-8 border-white">
                      <Image
                        src="/assets/pngs/how-learning-works.png"
                        alt="Learning Journey Illustration"
                        width={600}
                        height={800}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                    <div className="h-12 w-12 rounded-full bg-[#FFD966] flex items-center justify-center text-white shadow-lg">
                      <Laptop className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1D1D1D]">Interactive Classes</p>
                      <p className="text-[10px] text-[#9CA3AF]">Live now in 12 tracks</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Earn Badge & Achievements */}
        <section className="py-24 bg-[#f8f9fc]">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="flex justify-center order-2 lg:order-1">
                    <Image
                      src="/assets/pngs/certifications.png"
                      alt="Certifications Illustration"
                      width={500}
                      height={400}
                      className="w-full h-auto max-w-md drop-shadow-2xl"
                    />
                 </div>
                 <div className="space-y-8 order-1 lg:order-2">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1D1D1D] leading-tight">
                        Earn Badge & <br /> Achievements
                    </h2>
                    <p className="text-[#666666]">
                        Celebrate your milestones with verified badges and professional
                        certifications recognized globally.
                    </p>
                    <div className="space-y-6">
                      {[
                        { title: "Verified Certificates", desc: "Professional credentials upon completion", icon: GraduationCap },
                        { title: "Skill Badges", desc: "Unlock micro-credentials as you learn", icon: Check },
                        { title: "Profile Portfolio", desc: "Showcase your work to top employers", icon: BarChart }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 items-start">
                           <div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm text-[#4CC0D8]">
                              <item.icon className="h-6 w-6" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="font-bold text-[#1D1D1D]">{item.title}</h4>
                              <p className="text-sm text-[#666666]">{item.desc}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Scholarship & Sponsored Learning */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             <div className="bg-[#1D1D1D] rounded-[3rem] overflow-hidden relative shadow-2xl">
               <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-12 md:p-20 space-y-8 relative z-10">
                    <div className="inline-block border border-[#4CC0D8]/50 text-[#4CC0D8] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                        Skills Development
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Scholarship & <br /> Sponsored Learning
                    </h2>
                    <p className="text-gray-400 max-w-md">
                        We believe that financial constraints should never stop
                        academic growth. Together we provide paths for all.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Full Tuition Support",
                        "Laptop & Internet Grants",
                        "Monthly Mentor sessions"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                           <div className="h-5 w-5 rounded-md bg-[#4CC0D8] flex items-center justify-center">
                              <Check className="h-3 w-3" />
                           </div>
                           <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button className="h-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white px-8 rounded-xl font-bold">
                        Join as Student
                      </Button>
                      <Button variant="outline" className="h-12 border-white/20 text-white hover:bg-white/10 px-8 rounded-xl font-bold font-white">
                        Join as Sponsor
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src="/assets/pngs/scholarships-image.png"
                      alt="Scholarships Silhouettes"
                      fill
                      className="object-cover lg:object-right-bottom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-transparent lg:bg-gradient-to-l to-[#1D1D1D] opacity-60" />
                  </div>
               </div>
             </div>
          </div>
        </section>

        {/* CTA Banners */}
        <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="bg-[#4CC0D8] rounded-3xl p-8 text-center text-white space-y-6 relative overflow-hidden group">
                   <h3 className="text-2xl md:text-3xl font-bold relative z-10 italic">
                        "Together, we are stronger and we go far."
                   </h3>
                   <Button className="bg-white text-[#4CC0D8] hover:bg-white/90 px-8 h-12 rounded-xl font-bold relative z-10">
                      Learn More
                   </Button>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl group-hover:scale-110 transition-transform duration-700" />
                </div>
            </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center">
           <div className="mx-auto max-w-3xl px-4 space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D1D1D]">
                Let's Become part of Schools
              </h2>
              <p className="text-[#666666]">
                Join our network of institutions and students building the future of
                educational excellence together.
              </p>
              <Button className="h-14 px-12 bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white rounded-xl font-bold text-lg shadow-xl shadow-[#4CC0D8]/20">
                Join Us
              </Button>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
