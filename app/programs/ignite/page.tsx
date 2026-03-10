import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Lightbulb,
  Flame,
  Compass,
  Video,
  MessageCircle,
  Heart,
  BrainCircuit,
  Smartphone,
  SearchCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EBF7F9] to-white pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[#666666]">
                Programs
              </span>
              <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
              <span className="rounded-full bg-[#4CC0D8]/10 px-4 py-1 text-sm font-semibold text-[#4CC0D8]">
                Ignite
              </span>
            </div>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-[#1D1D1D] md:text-5xl lg:text-[3.25rem]">
              Ignite your Faith,{" "}
              <span className="text-[#4CC0D8]">Discover Your Purpose</span>
            </h1>
            <p className="max-w-xl text-lg text-[#666666]">
              Begin your spiritual journey with a beginner-friendly program
              designed to help young people explore faith, find community, and
              take their first confident steps toward purpose.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="h-12 rounded-lg bg-[#4CC0D8] px-8 font-semibold text-white shadow-lg shadow-[#4CC0D8]/20 hover:bg-[#3AB0C8]"
              >
                <Link href="/signup">Start Ignite — Free</Link>
              </Button>
              {/* Stat badge */}
              <div className="flex items-center gap-3 rounded-xl border border-[#4CC0D8]/20 bg-white px-4 py-2.5 shadow-sm">
                <span className="text-xl font-bold text-[#4CC0D8]">2,500+</span>
                <span className="text-sm text-[#666666]">Students ignited</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/assets/pngs/For web/Image (Faith journey).png"
                alt="Ignite Program"
                width={560}
                height={420}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -top-10 -right-10 -z-10 h-60 w-60 rounded-full bg-[#C776EA]/15 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-60 w-60 rounded-full bg-[#4CC0D8]/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Beginner-Friendly Program
// ─────────────────────────────────────────────
const PROGRAM_FEATURES = [
  {
    icon: Flame,
    title: "Spiritually Grounded Curriculum",
    desc: "Every lesson is rooted in Scripture and designed to spark genuine faith.",
    color: "bg-[#FDF6FF] text-[#C776EA]",
  },
  {
    icon: BookOpen,
    title: "Bible-Centered Guidance",
    desc: "Simple, accessible Bible study formats that make the Word approachable for beginners.",
    color: "bg-[#EBF7F9] text-[#4CC0D8]",
  },
  {
    icon: Lightbulb,
    title: "Foundational Discovery",
    desc: "Help students uncover their God-given identity and core values from day one.",
    color: "bg-[#FFFBEB] text-[#F59E0B]",
  },
  {
    icon: Users,
    title: "Community Connection",
    desc: "Join a thriving peer community of seekers walking the same journey together.",
    color: "bg-[#EBF7F9] text-[#4CC0D8]",
  },
]

function BeginnerProgram() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Left text */}
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
              A Beginner-Friendly Spiritual Awakening Program
            </h2>
            <p className="text-[#666666]">
              Ignite is designed for young people who are just beginning their
              faith journey—or returning to it. No prior knowledge required.
              Just an open heart and a willingness to discover something
              greater.
            </p>
            <p className="text-[#666666]">
              Through structured lessons, community support, and personal
              mentorship, Ignite gives every seeker the tools they need to build
              a lasting spiritual foundation.
            </p>
            <Button
              asChild
              className="h-11 rounded-lg bg-[#4CC0D8] px-7 font-semibold text-white hover:bg-[#3AB0C8]"
            >
              <Link href="/signup">Join Ignite Today</Link>
            </Button>
          </div>

          {/* Right feature grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROGRAM_FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 bg-[#F8F9FC] p-5 shadow-sm"
              >
                <div
                  className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-bold text-[#1D1D1D]">{title}</h3>
                <p className="text-sm text-[#666666]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Every Young Person Deserves Guidance
// ─────────────────────────────────────────────
const CHALLENGES = [
  {
    icon: SearchCheck,
    title: "Searching for Identity & Purpose",
    desc: "Many young people feel lost without a clear sense of who they are or why they exist.",
  },
  {
    icon: Heart,
    title: "Feeling Spiritually Disconnected",
    desc: "Even those raised in faith often feel distant from God without a structured pathway back.",
  },
  {
    icon: Users,
    title: "Lack of Consistent Mentorship",
    desc: "Few platforms connect young seekers with mentors who genuinely understand their journey.",
  },
  {
    icon: Smartphone,
    title: "Overwhelming Digital Distractions",
    desc: "Constant noise online drowns out the still, small voice that calls them to something deeper.",
  },
]

function EveryoneDeserves() {
  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Every Young Person Deserves Guidance on Their Faith Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#666666]">
            Without the right support, the challenges of early spiritual
            formation can feel insurmountable. Ignite addresses them head-on.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHALLENGES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF7F9] text-[#4CC0D8]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold text-[#1D1D1D]">{title}</h3>
              <p className="text-sm text-[#666666]">{desc}</p>
            </div>
          ))}
        </div>

        {/* Highlight banner */}
        <div className="mt-12 rounded-2xl bg-[#4CC0D8] px-8 py-8 text-center text-white">
          <p className="text-lg font-semibold md:text-xl">
            Ignite provides the initial structure, guidance, supportive
            community, and meaningful growth opportunities every young seeker
            needs to take that first bold step of faith.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Four Steps to Spiritual Awakening
// ─────────────────────────────────────────────
const AWAKENING_STEPS = [
  {
    number: "01",
    title: "Discover Faith",
    desc: "Explore the foundations of Christian faith through guided introductory content tailored for every background and experience level.",
  },
  {
    number: "02",
    title: "Engage with Guided Lessons",
    desc: "Work through structured, bite-sized spiritual lessons that build biblical knowledge and personal reflection habits.",
  },
  {
    number: "03",
    title: "Connect with Mentors & Community",
    desc: "Be matched with a mentor and join a peer group who will walk alongside you, answer questions, and share in your growth.",
  },
  {
    number: "04",
    title: "Continue Growth Path",
    desc: "Complete Ignite with a clear direction forward—advancing into the Reform program or deeper discipleship tracks.",
  },
]

function AwakeningSteps() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <span className="text-sm font-semibold tracking-wider text-[#4CC0D8] uppercase">
            Our Process
          </span>
        </div>
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Four Steps to Spiritual Awakening
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            A clear, simple pathway from first question to transformed heart.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AWAKENING_STEPS.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              {/* Connector arrow (except last) */}
              {idx < AWAKENING_STEPS.length - 1 && (
                <div className="absolute top-6 -right-3 z-10 hidden text-[#4CC0D8] lg:block">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4CC0D8] text-xl font-bold text-white shadow-lg shadow-[#4CC0D8]/30">
                {step.number}
              </div>
              <div className="flex-1 rounded-2xl border border-gray-100 bg-[#F8F9FC] p-6 shadow-sm">
                <h3 className="mb-2 font-bold text-[#1D1D1D]">{step.title}</h3>
                <p className="text-sm text-[#666666]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Designed for Every Seeker
// ─────────────────────────────────────────────
const SEEKERS = [
  {
    title: "New Believers",
    desc: "Perfect for those just beginning their walk with God.",
    image: "/assets/pngs/For web/Image (New Believers).png",
    badge: "bg-[#4CC0D8]",
  },
  {
    title: "Curious Youth",
    desc: "For young people exploring faith with sincere questions.",
    image: "/assets/pngs/For web/Image (Curious Youth).png",
    badge: "bg-[#C776EA]",
  },
  {
    title: "Students Seeking Direction",
    desc: "Ideal for students struggling with identity and purpose.",
    image: "/assets/pngs/For web/Image (Students Seeking Direction).png",
    badge: "bg-[#F59E0B]",
  },
  {
    title: "Young Adults Exploring Faith",
    desc: "Perfect for 19–25 year-olds rediscovering their spiritual roots.",
    image: "/assets/pngs/For web/Image (Young Adults Exploring Faith).png",
    badge: "bg-[#1D1D1D]",
  },
]

function EverySeeker() {
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
            Designed for Every Seeker
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            Wherever you are on your spiritual journey, Ignite meets you there.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEEKERS.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D]/70 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <span
                  className={`mb-2 inline-block rounded-full ${s.badge} px-3 py-0.5 text-xs font-semibold text-white`}
                >
                  {s.title}
                </span>
                <p className="text-xs text-white/80">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Modern Learning, Timeless Truth
// ─────────────────────────────────────────────
const LEARNING_FEATURES = [
  { icon: Video, text: "Short Video Lessons (5–10 mins)" },
  { icon: Compass, text: "Interactive Spiritual Discovery Activities" },
  { icon: Users, text: "Live Mentoring Sessions" },
  { icon: Heart, text: "Spiritual Companion Matching" },
]

function ModernLearning() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="text-sm font-semibold tracking-wider text-[#4CC0D8] uppercase">
              Platform
            </span>
            <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
              Modern Learning, Timeless Truth
            </h2>
            <p className="text-[#666666]">
              Ignite pairs cutting-edge learning technology with eternally
              relevant Scripture to deliver a faith formation experience that
              fits into modern life.
            </p>
            <ul className="space-y-4">
              {LEARNING_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF7F9] text-[#4CC0D8]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-[#1D1D1D]">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
            <Image
              src="/assets/pngs/For web/how learning works.png"
              alt="Learning Platform"
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

// ─────────────────────────────────────────────
// AI Guide
// ─────────────────────────────────────────────
const AI_FEATURES = [
  "Daily AI Spiritual Guide & Verse",
  "Personalized Spiritual Growth Content",
  "Overcome Spiritual Dry Seasons Together",
  "Progress Encouragement & Course Reminders",
]

function AiGuide() {
  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D1D1D]">
              <BrainCircuit className="h-7 w-7 text-[#4CC0D8]" />
            </div>
            <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
              Your Personal Guide, Always Available
            </h2>
            <p className="text-[#666666]">
              Our AI spiritual guide is available 24/7 to answer questions,
              share scripture-based encouragement, and keep your faith journey
              moving forward—even on the hardest days.
            </p>
            <ul className="space-y-3">
              {AI_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[#1D1D1D]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4CC0D8]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="h-11 rounded-lg bg-[#1D1D1D] px-7 font-semibold text-white hover:bg-black"
            >
              <Link href="/ai-guide">
                Meet Your AI Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right — mock chat */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4CC0D8]">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1D1D1D]">
                  Ignite AI Guide
                </p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#EBF7F9] px-4 py-3 text-[#1D1D1D]">
                  Good morning! Here&apos;s your verse for today: &ldquo;Trust
                  in the Lord with all your heart...&rdquo; — Proverbs 3:5
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#4CC0D8] px-4 py-3 text-white">
                  Thank you! Can you explain what walking in faith looks like
                  practically?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#EBF7F9] px-4 py-3 text-[#1D1D1D]">
                  Of course! Walking in faith means taking action based on what
                  God says, even when you can&apos;t see the full picture...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────
const STATS = [
  {
    value: "2,547+",
    label: "Students Impacted",
    color: "text-[#4CC0D8]",
    bg: "bg-[#EBF7F9]",
  },
  {
    value: "89%",
    label: "Completion Rate",
    color: "text-[#F59E0B]",
    bg: "bg-[#FFFBEB]",
  },
  {
    value: "1,893+",
    label: "Transformations Reported",
    color: "text-[#C776EA]",
    bg: "bg-[#FDF6FF]",
  },
  {
    value: "78%",
    label: "Recommendation Rate",
    color: "text-[#4CC0D8]",
    bg: "bg-[#EBF7F9]",
  },
]

function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Making a Real Difference
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            The numbers reflect real lives, real transformations, and a real
            movement of spiritual growth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center rounded-2xl ${s.bg} p-8 text-center`}
            >
              <span className={`text-4xl font-bold ${s.color}`}>{s.value}</span>
              <span className="mt-2 text-sm font-medium text-[#666666]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Path Beyond Ignite
// ─────────────────────────────────────────────
const PATHS = [
  {
    stage: "Ignite",
    current: true,
    color: "bg-[#4CC0D8]",
    items: [
      "Faith foundations & Bible basics",
      "Beginner spiritual formation",
      "Peer community introduction",
      "First mentor connection",
    ],
  },
  {
    stage: "Reform",
    current: false,
    color: "bg-[#F59E0B]",
    items: [
      "Deeper discipleship & theology",
      "Academic & vocational integration",
      "Accountability mentorship",
      "Leadership development",
    ],
  },
  {
    stage: "Leadership",
    current: false,
    color: "bg-[#C776EA]",
    items: [
      "Mentor other students",
      "Serve in ministry projects",
      "Facilitate community groups",
      "Build spiritual legacy",
    ],
  },
]

function PathBeyond() {
  return (
    <section className="bg-[#F8F9FC] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1D1D1D] md:text-4xl">
            Your Path Beyond Ignite
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#666666]">
            Ignite is just the beginning. After completing the program, you can
            advance into deeper discipleship and eventually become a leader.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PATHS.map((p, idx) => (
            <div key={p.stage} className="flex flex-col">
              {/* Connector */}
              {idx > 0 && (
                <div className="mb-4 hidden items-center justify-center md:flex">
                  <ArrowRight className="h-5 w-5 text-[#9CA3AF]" />
                </div>
              )}
              <div
                className={`flex flex-1 flex-col rounded-2xl ${p.color} p-7 text-white shadow-lg`}
              >
                {p.current && (
                  <span className="mb-3 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                    You are here
                  </span>
                )}
                <h3 className="mb-5 text-2xl font-bold">{p.stage}</h3>
                <ul className="flex-1 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#666666]">
          After completing Ignite, you can enroll in{" "}
          <Link
            href="/programs/reform"
            className="font-semibold text-[#4CC0D8] hover:underline"
          >
            Reform
          </Link>{" "}
          for deeper discipleship and continue your journey toward spiritual
          leadership.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Footer CTA
// ─────────────────────────────────────────────
function BottomCta() {
  return (
    <section className="bg-[#1D1D1D] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Be Part of a Generation Being{" "}
          <span className="text-[#4CC0D8]">Spiritually Renewed</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
          Your journey starts with a single spark. Join Ignite today and
          discover what faith, purpose, and community can look like for you.
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
            <Link href="/programs/reform">
              Explore Reform Next <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function IgnitePage() {
  return (
    <main>
      <Navbar />

      <Hero />
      <BeginnerProgram />
      <EveryoneDeserves />
      <AwakeningSteps />
      <EverySeeker />
      <ModernLearning />
      <AiGuide />
      <Stats />
      <PathBeyond />
      <BottomCta />

      <Footer />
    </main>
  )
}
