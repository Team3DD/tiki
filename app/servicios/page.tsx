"use client"

import { GlassmorphismNav } from "@/components/navbar"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-black dark:bg-black light:bg-white overflow-hidden transition-colors duration-300">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <div className="pt-32 md:pt-40">
            <FeaturesSection />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  )
}
