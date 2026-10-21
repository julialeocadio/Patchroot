import { useTranslations } from "next-intl";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    const t = useTranslations("contact");

    return (
        <main className="min-h-screen bg-[#08090B] text-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
                <div className="mb-12 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#E6007E]" />
                        <span className="font-mono text-sx uppercase tracking-[0.2em] text-[#6007E]">
                            {t("eyebrow")}
                        </span>
                    </div>
                    <span className="font-xs text-white/40">
                        {t("channelId")}
                    </span>
                </div>

                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                    <section className="flex flex-col">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                            {t("introLabel")}
                        </p>

                        <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            {t("title")}
                            <span className="text-[#E6007E]"> {t("titleAccent")}</span>
                            <span className="text-[#E6007E]">_</span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-7 text-white/60">
                            {t("description")}
                        </p>

                        <div className="mt-10 space-y-4">
                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#E6007E]/40">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E6007E]/25 bg-[#E6007E]/[0.08] text-[#E6007E]">
                                        <span aria-hidden="true" className="text-xl">{"</>"}</span>
                                    </div>

                                    <div>
                                        <h2 className="font-medium text-white">
                                            {t("services.development.title")}
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-white/50">
                                            {t("services.development.description")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#E6007E]/40">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E6007E]/25 bg-[#E6007E]/[0.08] text-[#E6007E]">
                                        <span aria-hidden="true" className="text-xl">{"[+]"}</span>
                                    </div>
                                    <div>
                                        <h2 className="font-medium text-white">
                                            {t("services.security.title")}
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-white/50">
                                            {t("services.security.description")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-white/10 pt-6">
                            <p className="font-mono text-xs uppercase tracking-wider text-white/40">
                                {t("directContact")}
                            </p>
                            <a
                                href={`mailto:${t("emailAddress")}`}
                                className="mt-2 inline-flex break-all text-sm text-white transition-colors hover:text-[#E6007E]"
                            >
                                {t("emailAddress")}
                            </a>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-[#0D0E12] p-5 sm:p-8">
                        <div className="mb-8 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E6007E]">
                                    {t("form.eyebrow")}
                                </p>
                                <h2 className="mt-3 text-2x1 font-semibold text-white">
                                    {t("form.title")}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-white/50">
                                    {t("form.description")}
                                </p>
                            </div>
                            <span
                                aria-hidden="true"
                                className="hidden rounded-lg border-white/10 px-3 py-2 font-mono text-xs text-white/40 sm:block"
                            >
                                01 / INIT
                            </span>
                        </div>

                        <ContactForm />
                        <p className="mt-6 text-xs leading-5 text-white/40">
                            {t("privacy.before")}{" "}
                            <a
                                href="/privacy"
                                className="text-white underline decoration-[#E6007E]/60 underline-offset-4 hover:text-[#E6007E]"
                            >
                                {t("privacy.link")}
                            </a>
                            {t("privacy.after")}
                        </p>
                    </section>
                </div>

                <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-wider text-white/30">
                    <span>{t("footer.left")}</span>
                    <span>{t("footer.right")}</span>
                </div>
            </div>
        </main>
    );
}