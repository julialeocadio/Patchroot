"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

    return (
        <section className="relative overflow-hidden bg-[#080808] text-white">

      {/* Glow Background */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#E6007E]/20 blur-[160px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="grid w-full gap-16 lg:grid-cols-2">

          {/* Left */}

          <div className="flex flex-col justify-center">

            <div className="mb-8 flex w-fit items-center gap-2 rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2">

              <ShieldCheck
                size={18}
                className="text-[#FF2E93]"
              />

              <span className="text-sm text-[#FF2E93]">
                {t("trust")}
              </span>

            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">

              PatchRoot

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#D9D9D9]">

              {t("subtitle")}

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex items-center gap-2 rounded-xl bg-[#E6007E] px-7 py-4 font-semibold transition hover:bg-[#FF2E93]">

                {t("start")}

                <ArrowRight size={18} />

              </button>

              <button className="rounded-xl border border-[#2C2C2C] px-7 py-4 transition hover:border-[#E6007E] hover:bg-[#141414]">

                {t("contact")}

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="hidden items-center justify-center lg:flex">

            <div className="relative">

              <div className="h-[420px] w-[420px] rounded-full border border-[#2C2C2C]" />

              <div className="absolute inset-10 rounded-full border border-[#E6007E]/40" />

              <div className="absolute inset-24 rounded-full border border-[#FF2E93]/50" />

              <div className="absolute inset-0 flex items-center justify-center">

                <ShieldCheck
                  size={90}
                  className="text-[#E6007E]"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}