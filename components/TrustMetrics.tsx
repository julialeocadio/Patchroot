import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("Metrics");
  return (
    <section className="bg-[#080808] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#2C2C2C] bg-[#141414] p-12 md:p-16">

          {/* Glow */}
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#E6007E]/20 blur-[120px]" />

          <div className="relative text-center">

            <span className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2 text-sm text-[#FF2E93]">
              {t("together")}
            </span>

            <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">
              {t("start")}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#B3B3B3]">
              {t("text")}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <button className="flex items-center gap-2 rounded-xl bg-[#E6007E] px-8 py-4 font-semibold text-white transition hover:bg-[#FF2E93]">

                {t("quote")}

                <ArrowRight size={18} />

              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}