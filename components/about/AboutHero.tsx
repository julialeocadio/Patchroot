"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden border border-white/10">
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="text-[#E6007E]">PATCHROOT</span>
          {" / "}
          {t("breadcrumb")}
        </p>

        <h1 className="font-mono text-4xl uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {t("heroTitle")}{" "}
          <span className="text-[#E6007E]">
            {t("heroAccent")}
          </span>
        </h1>

        <h2 className="mt-8 font-mono text-xl uppercase sm:text-2xl">
          {t("tagline")}
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["development", "cybersecurity", "secureSystems"] as const).map(
            (key) => (
              <span
                key={key}
                className="border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white/60"
              >
                {t(`specialties.${key}`)}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}