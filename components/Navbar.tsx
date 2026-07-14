"use client";

import {Link} from "@/i18n/navigation";
import Logo from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import {
    Menu,
    Home,
    Shield,
    User,
    Newspaper,
    Mail
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";

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
        <div className="hidden items-center gap-4 lg:flex">

          <LanguageSwitcher />

          <button className="rounded-lg bg-[#E6007E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#FF2E93]">
            {t("quote")}
          </button>

        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">

        <LanguageSwitcher />

        <Sheet>

            <SheetTrigger>
                <button
                    aria-label="Open navigation menu"
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg
                        border border-[#2C2C2C]
                        bg-[#141414]
                        text-white
                        transition-all
                        hover:border-[#E6007E]
                        hover:bg-[#1C1C1C]"
                >
                    <Menu size={20} />
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[360px] border-[#2C2C2C] bg-[#080808] text-white px-6 py-8"
            >
                <div className="mb-1 border-b border-[#2C2C2C] pb-6">
                    <h2 className="text-2xl font-bold text-white">
                        PatchRoot
                    </h2>
                </div>
                <div className="mt-4 flex flex-col gap-2">

                    <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#D9D9D9] transition-all hover:bg-[#141414] hover:text-white hover:translate-x-1">
                        <Home size={18}/> {t("home")}
                    </Link>

                    <Link href="/services" className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#D9D9D9] transition-all hover:bg-[#141414] hover:text-white hover:translate-x-1">
                        <Shield size={18}/> {t("services")}
                    </Link>

                    <Link href="/about" className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#D9D9D9] transition-all hover:bg-[#141414] hover:text-white hover:translate-x-1">
                        <User size={18}/> {t("about")}
                    </Link>

                    <Link href="/blog" className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#D9D9D9] transition-all hover:bg-[#141414] hover:text-white hover:translate-x-1">
                        <Newspaper size={18}/> {t("blog")}
                    </Link>

                    <Link href="/contact" className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#D9D9D9] transition-all hover:bg-[#141414] hover:text-white hover:translate-x-1">
                        <Mail size={18}/> {t("contact")}
                    </Link>

                </div>

                <div className="mt-6 border-t border-[#2C2C2C] pt-6">
                    <p className="mb-3 text-sm font-medium text-[#D9D9D9]">
                        {t("language")}
                    </p>
                    <LanguageSwitcher compact={false} />
                </div>

                <button
                    className="mt-8 w-full rounded-xl bg-[#E6007E] py-4 font-semibold text-lg transition-all hover:bg-[#FF2E93] hover:shadow-lg hover:shadow-[#E6007E]/20"
                >
                    {t("quote")}
                </button>

            </SheetContent>

        </Sheet>

        </div>
    </div>
    </header>
  );
}