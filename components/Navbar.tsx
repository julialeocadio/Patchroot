"use client";

import {Link} from "@/i18n/navigation";
import { Globe } from "lucide-react";
import Logo from "next/image";
import { useTranslations } from "next-intl";

export default function Navbar() {
    const t = useTranslations("Navbar");

    return (
        <header className= "fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#080808]/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo
            src="/images/logo.jpeg"
            alt="PatchRoot Logo"
            width={40}
            height={40}
          />

          <div className="hidden sm:block">
            <p className="text-lg font-bold text-white">
              PatchRoot
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#D9D9D9] lg:flex">

          <Link href="/" className="transition hover:text-[#E6007E]">
            {t("home")}
          </Link>

          <Link href="/services" className="transition hover:text-[#E6007E]">
            {t("services")}
          </Link>

          <Link href="/about" className="transition hover:text-[#E6007E]">
            {t("about")}
          </Link>

          <Link href="/blog" className="transition hover:text-[#E6007E]">  
            {t("blog")}
          </Link>

          <Link href="/contact" className="transition hover:text-[#E6007E]">
            {t("contact")}
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="flex items-center gap-2 rounded-lg border border-[#2C2C2C] px-4 py-2 text-sm text-[#D9D9D9] transition hover:border-[#E6007E]">

            <Globe size={16} />

            EN

          </button>

          <button className="rounded-lg bg-[#E6007E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#FF2E93]">
            {t("quote")}
          </button>

        </div>

      </div>
    </header>
  );
}