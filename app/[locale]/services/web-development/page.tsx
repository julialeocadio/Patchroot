import { Section } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Locale = "en" | "pt" | "es";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
})  {
    const { locale } = await params;

    const t = await getTranslations({
        locale,
        namespace: "webDevelopmentPage",
    });

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function webDevelopmentPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

     const t = await getTranslations({
        locale,
        namespace: "webDevelopmentPage",
     });

     return (
        <main className="min-h-screen bg-[#08090B] text-white">

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-24">
                <p className="text-sm font-medium tracking-widest text-[#E6007E]">
                    {t("eyebrow")}
                </p>

                <div className="mt-6 max-w-3xl">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                        {t("heading")}
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-[#A5A9B2] md:text-lg">
                        {t("intro")}
                    </p>
                </div>
            </section>

            <section className="border-t border-white/5 bg-[#0D0E12] py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-14 max-w-2xl">
                        <p className="text-sm font-medium tracking-widest text-[#E6007E]">
                            {t("services.eyebrow")}
                        </p>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {t("services.heading")}
                        </h2>

                        <p className="mt-5 leading-8 text-[#A5A9B2]">
                            {t("services.intro")}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {(
                            ["custom", "landing", "responsive", "redesign", "ecommerce", "maintenance"] as const
                        ).map((service, index) => (
                            <div
                                key={service}
                                className="group rounded-2xl border border-white/10 bg-[#141519] p-8 transcition duration-300 hover:-translate-y-1 hover:border-[#E6007E]/50"
                            >
                                <span className="text-sm font-medium tracking-widest text-[#E6007E]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3 className="mt-6 text-xl font-semibold text-white transition-color group-hover:text-[#E6007E]">
                                    {t(`services.${service}.title`)}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-[#A5A9B2]">
                                    {t(`services.${service}.description`)}
                                </p>

                                <ul className="mt-6 space-y-3">
                                    {([0, 1] as const).map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 text-sm text-[#D9D9D9]"
                                        >
                                            <span className="text-[#E6007E]">+</span>
                                            {t(`services.${service}.items.${item}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Development Process */}
            <section className="border-t border-white/5 bg-[#08090B] py-24">
                <div className="mx-auto max-w-7xl px-6">

                    {/* Section Header */}
                    <div className="mx-auto mb-16 max-w-2xl text-center">
                        <p className="text-sm font-medium tracking-widest text-[#E6007E]">
                            {t("process.eyebrow")}
                        </p>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {t("process.heading")}
                        </h2>

                        <p className="mt-5 leading-8 text-[#A5A9B2]">
                            {t("process.intro")}
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {([1, 2, 3, 4] as const).map((step) => (
                            <div
                                key={step}
                                className="relative border-t border-white/10 pt-8"
                            >
                                <span className="text-4xl font-bold text-[#E6007E]">
                                    {String(step).padStart(2, "0")}
                                </span>

                                <h3 className="mt-6 text-xl font-semibold text-white">
                                    {t(`process.step${step}.title`)}
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-[#A5A9B2]">
                                    {t(`process.step${step}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>


                    {/* Technoly Stack */}
                    <section className="border-t border-white/5 bg-[#0D0E12] py-24">
                        <div className="mx-auto max-w-7xl px-6">

                            {/* Section Header */}
                            <div className="mx-auto mb-16 max-w-2xl text-center">
                                <p className="text-sm font-medium tracking-widest text-[#E6007E]">
                                    {t("technology.eyebrow")}
                                </p>

                                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                                    {t("technology.heading")}
                                </h2>

                                <p className="mt-5 leading-8 text-[#A5A9B2]">
                                    {t("technology.intro")}
                                </p>
                            </div>

                                {/* Technology Groups */}
                            <div className="grid gap-6 md:grid-cols-3">

                                {/* Frontend */}
                                <div className="rounded-2xl border border-white/10 bg-[#141519] p-8">
                                    <h3 className="text-xl font-semibold text-white">
                                        {t("technology.frontend.title")}
                                    </h3>

                                    <p className="mt-3 min-h-14 text-sm leading-7 text-[#A5A9B2]">
                                        {t("technology.frontend.description")}
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-2">
                                        {["Next.js", "React", "TypeScript", "JavaScript"].map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#D9D9D9]"
                                        >
                                            {tech}
                                        </span>
                                        ))}
                                    </div>
                                </div>

                                    {/* Backend & Data */}
                                <div className="rounded-2xl border border-white/10 bg-[#141519] p-8">
                                    <h3 className="text-xl font-semibold text-white">
                                        {t("technology.backend.title")}
                                    </h3>

                                    <p className="mt-3 min-h-14 text-sm leading-7 text-[#A5A9B2]">
                                        {t("technology.backend.description")}
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-2">
                                        {["Python", "SQL"].map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#D9D9D9]"
                                        >
                                            {tech}
                                        </span>
                                        ))}
                                    </div>
                                </div>

                                    {/* CMS & Deployment */}
                                <div className="rounded-2xl border border-white/10 bg-[#141519] p-8">
                                    <h3 className="text-xl font-semibold text-white">
                                        {t("technology.platforms.title")}
                                    </h3>

                                    <p className="mt-3 min-h-14 text-sm leading-7 text-[#A5A9B2]">
                                        {t("technology.platforms.description")}
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-2">
                                        {["Sanity", "Vercel"].map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#D9D9D9]"
                                        >
                                            {tech}
                                        </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                   { /* CTA */} 
                    <section className="border-t border-white/5 bg-[#08090B] px-6 py-24">
                        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#E6007E]/30 bg-[#141115] px-8 py-16 text-center md:px-16 md:py-20">
                        
                        {/* Background Glow */}
                        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#E6007E]/15 blur-[100px]" />
                            <div className="relative z-10 mx-auto max-w-3xl">
                                <span className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2 text-sm font-medium text-[#FF2E93]">
                                        {t("cta.eyebrow")}
                                </span>
                                <h2 className="mt-8 text-3xl font-bold tracking-tight text-white md:text-5xl">
                                    {t("cta.heading")}
                                </h2>
                                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#B3B3B3] md:text-lg">
                                    {t("cta.description")}
                                </p>
                                <Link
                                    href="/contact"
                                    className="mt-10 inline-flex items-center justify-center gap-3 rounded-xl bg-[#E6007E] px-8 py-4 font-semibold text-white transition duration-300 hover-bg-[#FF2E93] hover:shadow-[0_0_30px_rgba(230,0,126,0.25)]"
                                >
                                    {t("cta.button")}
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}