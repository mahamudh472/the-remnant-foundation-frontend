import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Smartphone,
  Users,
  Compass,
  GraduationCap,
  HandHeart,
  Star,
  ChevronRight,
  Play,
  CheckCircle2,
  BarChart3,
  Video,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EBF7F9] to-white pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-[#4CC0D8]/10 px-4 py-1.5 text-sm font-semibold text-[#4CC0D8]">
              Our Programs
            </span>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-[#1D1D1D] md:text-5xl lg:text-[3.25rem]">
              Reforming Lives Through{" "}
              <span className="text-[#4CC0D8]">Faith, Education,</span> and
              Mentorship
            </h1>
            <p className="max-w-xl text-lg text-[#666666]">
              Reform is our flagship discipleship program helping young people
              rediscover purpose, build strong character, and anchor their
              identity in spiritual truth.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="h-12 rounded-lg bg-[#4CC0D8] px-8 font-semibold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]"
              >
                <Link href="/signup">Enroll Now — Free</Link>
              </Button>
              <span className="rounded-full bg-[#F59E0B] px-5 py-2 text-sm font-bold text-white">
                100% FREE
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/assets/pngs/For web/our missions img.png"
                alt="Reform Program"
                width={560}
                height={420}
                className="h-auto w-full object-cover"
              />
            </div>
            {/* Glow */}
            <div className="absolute -top-10 -right-10 -z-10 h-60 w-60 rounded-full bg-[#4CC0D8]/15 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

function OurMission() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Left text */}
          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider text-[#4CC0D8] uppercase">
              Our Mission
            </span>
            <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
              Why Reform Means Real Transformation
            </h2>
            <p className="text-[#666666]">
              We believe every young person deserves the opportunity to discover
              who they are through the lens of faith. Reform bridges the gap
              between spiritual identity and everyday life—equipping young
              people with a biblical worldview, mentorship support, and
              structured learning that reshapes character from the inside out.
            </p>
            <ul className="space-y-3">
              {[
                "Rooted in biblical truth and discipleship",
                "Structured pathways for every age group",
                "Mentors who walk the journey alongside students",
                "Free and accessible to every young person",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#1D1D1D]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4CC0D8]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/assets/pngs/For web/our missions img.png"
                alt="Our Mission"
                width={560}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
            {/* See a demo CTA */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <button className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-[#1D1D1D] shadow-lg backdrop-blur-sm transition hover:bg-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4CC0D8] text-white">
                  <Play className="h-3.5 w-3.5 fill-white" />
                </span>
                See a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CHALLENGES = [
  {
    icon: Compass,
    title: "Faith / Spiritual Direction",
    desc: "Many young people lack a clear spiritual foundation and identity in today's shifting culture.",
    color: "bg-[#EBF7F9] text-[#4CC0D8]",
  },
  {
    icon: Smartphone,
    title: "Digital Formation & Identity",
    desc: "Constant digital noise shapes identities before families and communities can offer guidance.",
    color: "bg-[#FDF6FF] text-[#C776EA]",
  },
  {
    icon: BookOpen,
    title: "Lack of Structured Bible Learning",
    desc: "Few programs offer age-appropriate, consistent biblical education that sticks.",
    color: "bg-[#FFFBEB] text-[#F59E0B]",
  },
  {
    icon: Users,
    title: "Limited Mentorship Opportunities",
    desc: "Young people are navigating life without trusted guides who share their values and faith.",
    color: "bg-[#EBF7F9] text-[#4CC0D8]",
  },
]

function WhyReformNeeded() {
  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Why Reform Is Needed
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#666666]">
            Today&apos;s generation faces unprecedented spiritual challenges
            that demand intentional, structured, and faith-based solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHALLENGES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold text-[#1D1D1D]">{title}</h3>
              <p className="text-sm text-[#666666]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-12 rounded-2xl bg-[#1D1D1D] px-8 py-10 text-center">
          <p className="text-lg font-medium text-white italic md:text-xl">
            &ldquo;A generation without spiritual guidance is a generation lost.
            But with intentional discipleship, we can see transformation.&rdquo;
          </p>
          <p className="mt-4 text-sm font-semibold text-[#4CC0D8]">
            — The Remnant Foundation
          </p>
        </div>
      </div>
    </section>
  )
}

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Spiritual Foundation",
    desc: "Building a solid biblical foundation through core doctrines, daily devotionals, and foundational theology tailored by age.",
  },
  {
    number: "02",
    title: "Educational Development",
    desc: "Connecting spirituality with academics so students understand how their faith applies to learning, career, and everyday decisions.",
  },
  {
    number: "03",
    title: "Mentorship & Community",
    desc: "Connecting every student to a faith-aligned mentor and a peer community for real-time support, accountability, and growth.",
  },
  {
    number: "04",
    title: "Transformation & Purpose",
    desc: "Discovering God's unique calling and stepping into full maturity—equipped to serve, lead, and impact their generation.",
  },
]

function ReformJourney() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#4CC0D8] uppercase">
            Our Approach
          </span>
        </div>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            The Reform Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            A proven pathway to transformation, one step at a time.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl space-y-8">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-[28px] w-px bg-[#4CC0D8]/20 lg:left-[30px]" />

          {JOURNEY_STEPS.map((step) => (
            <div key={step.number} className="relative flex gap-6 pl-16">
              {/* Circle */}
              <div className="absolute left-0 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#4CC0D8] font-bold text-white shadow-lg shadow-[#4CC0D8]/30">
                {step.number}
              </div>
              <div className="flex-1 rounded-2xl border border-gray-100 bg-[#F8F9FC] p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-[#1D1D1D]">
                  {step.title}
                </h3>
                <p className="text-[#666666]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PATHWAYS = [
  {
    title: "Kids Path",
    ages: "Ages 5–10",
    desc: "Fun, story-based spiritual content that plants seeds of faith and character in early childhood.",
    image: "/assets/pngs/For web/Image (Kids Path).png",
    overlayColor: "from-[#F59E0B]/80",
    badgeColor: "bg-[#F59E0B]",
    btnClass: "bg-[#C776EA] hover:bg-[#B560D9] text-white",
    href: "/courses?age=kids",
  },
  {
    title: "Teens Path",
    ages: "Ages 11–18",
    desc: "Identity-forming discipleship that meets teens in the questions they're asking about life, purpose, and faith.",
    image: "/assets/pngs/For web/Image (Teens Path).png",
    overlayColor: "from-[#4CC0D8]/80",
    badgeColor: "bg-[#4CC0D8]",
    btnClass: "bg-[#F59E0B] hover:bg-[#E08F00] text-white",
    href: "/courses?age=teen",
  },
  {
    title: "Young Adults Path",
    ages: "Ages 19–25",
    desc: "Deeper theological grounding and vocational clarity for young adults navigating independence and purpose.",
    image: "/assets/pngs/For web/Image (Young Adults Path).png",
    overlayColor: "from-[#1D1D1D]/70",
    badgeColor: "bg-[#1D1D1D]",
    btnClass: "bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white",
    href: "/courses?age=young-adults",
  },
]

function AgePathways() {
  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#4CC0D8] uppercase">
            For Everyone
          </span>
        </div>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Age-Based Reform Pathways
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            Every age and stage requires a different approach. Reform meets
            young people exactly where they are.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PATHWAYS.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${p.overlayColor} to-transparent`}
              />
              {/* Content */}
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <span
                  className={`mb-2 inline-block rounded-full ${p.badgeColor} px-3 py-1 text-xs font-semibold text-white`}
                >
                  {p.ages}
                </span>
                <h3 className="mb-1 text-xl font-bold text-white">{p.title}</h3>
                <p className="mb-4 text-sm text-white/80">{p.desc}</p>
                <Button
                  asChild
                  size="sm"
                  className={`rounded-lg font-semibold ${p.btnClass}`}
                >
                  <Link href={p.href}>Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TECH_FEATURES = [
  { icon: BookOpen, text: "AI-Curated Spiritual Curriculum" },
  { icon: Compass, text: "Personalized Learning Paths" },
  { icon: BarChart3, text: "Progress Tracking Dashboard" },
  { icon: Video, text: "Live Mentoring Classes" },
]

function TechSupport() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider text-[#4CC0D8] uppercase">
              Innovation & Faith
            </span>
            <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
              Technology & AI Support for Spiritual Growth
            </h2>
            <p className="text-[#666666]">
              Reform combines timeless spiritual truth with modern learning
              technology—so every student gets a personalized, data-driven faith
              formation experience.
            </p>
            <ul className="space-y-4">
              {TECH_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF7F9] text-[#4CC0D8]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-[#1D1D1D]">{text}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="h-11 rounded-lg bg-[#4CC0D8] px-7 font-semibold text-white hover:bg-[#3AB0C8]"
            >
              <Link href="/ai-guide">Explore AI Guide</Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
            <Image
              src="/assets/pngs/For web/how learning works.png"
              alt="Platform Dashboard"
              width={600}
              height={440}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    name: "Sarah B.",
    role: "Student, Teens Path",
    quote:
      "Reform didn't just teach me Bible verses—it helped me discover who I am. My mentors walked with me through the hardest season of my life and pointed me back to God every step of the way.",
    tags: ["Mentoring", "Service", "Bible Study"],
    avatar: "SB",
  },
  {
    name: "Marcus T.",
    role: "Student, Young Adults Path",
    quote:
      "I came in skeptical but left with a real sense of purpose. The structured curriculum mixed with genuine community made all the difference for my faith journey.",
    tags: ["Purpose", "Community", "Growth"],
    avatar: "MT",
  },
]

function Testimonials() {
  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Lives Being Reformed
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            These are just a few of the thousands of transformation stories
            coming out of the Reform program.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4CC0D8] font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#1D1D1D]">{t.name}</p>
                  <p className="text-sm text-[#666666]">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-[#1D1D1D] italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#EBF7F9] px-3 py-1 text-xs font-semibold text-[#4CC0D8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="self-start rounded-lg border-[#4CC0D8] text-[#4CC0D8] hover:bg-[#EBF7F9]"
              >
                View Full Story
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const JOIN_CARDS = [
  {
    icon: GraduationCap,
    title: "Enroll as Student",
    desc: "Join thousands of young people discovering faith, purpose, and transformation through Reform.",
    cta: "Start Learning",
    href: "/signup",
    btnClass: "bg-[#4CC0D8] hover:bg-[#3AB0C8] text-white",
  },
  {
    icon: HandHeart,
    title: "Join as Mentor",
    desc: "Share your faith and life experience by walking alongside the next generation as a trusted guide.",
    cta: "Become a Mentor",
    href: "/contact",
    btnClass: "bg-[#C776EA] hover:bg-[#B560D9] text-white",
  },
  {
    icon: Star,
    title: "Become a Partner",
    desc: "Support the mission through financial partnership, ministry collaboration, or resource donation.",
    cta: "Partner With Us",
    href: "/partnership/donate",
    btnClass: "bg-[#F59E0B] hover:bg-[#E08F00] text-white",
  },
]

function JoinMovement() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Join the Reform Movement
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            There&apos;s a place for everyone in this mission—whether
            you&apos;re a student, mentor, or partner.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {JOIN_CARDS.map(
            ({ icon: Icon, title, desc, cta, href, btnClass }) => (
              <div
                key={title}
                className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-[#F8F9FC] p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Icon className="h-7 w-7 text-[#4CC0D8]" />
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1D]">{title}</h3>
                <p className="flex-1 text-[#666666]">{desc}</p>
                <Button
                  asChild
                  className={`self-start rounded-lg font-semibold ${btnClass}`}
                >
                  <Link href={href}>{cta}</Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

function BottomCta() {
  return (
    <section className="bg-[#1D1D1D] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Be Part of a Generation Being{" "}
          <span className="text-[#4CC0D8]">Spiritually Renewed</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
          The next generation is waiting. Join the Reform movement and help us
          build a generation anchored in faith, purpose, and transformation.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-lg bg-[#4CC0D8] px-8 font-semibold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]"
          >
            <Link href="/signup">Sign Up — It&apos;s Free</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-lg border-white/20 px-8 font-semibold text-white hover:bg-white/10"
          >
            <Link href="/programs">
              Explore Other Programs <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function ReformPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurMission />
      <WhyReformNeeded />
      <ReformJourney />
      <AgePathways />
      <TechSupport />
      <Testimonials />
      <JoinMovement />
      <BottomCta />

      <Footer />
    </main>
  )
}
