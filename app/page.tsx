import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/app/home/hero"
import { WhoFor } from "@/app/home/who-for"
import { AiBanner } from "@/app/home/ai-banner"
import { HowItWorks } from "@/app/home/how-it-works"
import { Features } from "@/app/home/features"
import { AgeLearning } from "@/app/home/age-learning"
import { Trusted } from "@/app/home/trusted"
import { Cta } from "@/app/home/cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* <NavigationMenuDemo /> */}

      <main>
        <Hero />
        <WhoFor />
        <AiBanner />
        <HowItWorks />
        <Features />
        <AgeLearning />
        <Trusted />
        <Cta />
      </main>

      <Footer />
    </div>
  )
}
