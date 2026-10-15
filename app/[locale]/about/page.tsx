import AboutHero from "@/components/about/AboutHero";
import TeamSection from "@/components/about/TeamSection";

export default function AboutPage() {
    return(
        <main className="min-h-screen bg-[#08090B] text-white">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <AboutHero />
                <TeamSection />
            </div>
        </main>
    )
}