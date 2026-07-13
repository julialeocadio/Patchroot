"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import Logo from "next/image";

export default function Navbar() {
    return (
        <header className= "fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#080808]/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo
            src="/logo.png"
            alt="PatchRoot Tech Logo"
            width={40}
            height={40}
          />

          <div className="hidden sm:block">
            <p className="text-lg font-bold text-white">
              Secure Digital
            </p>
            <p className="text-xs tracking-widest text-[#B3B3B3] uppercase">
              Solutions
            </p>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#D9D9D9] lg:flex">

          <Link href="/" className="transition hover:text-[#E6007E]">
            Home
          </Link>

          <Link href="/services" className="transition hover:text-[#E6007E]">
            Services
          </Link>

          <Link href="/industries" className="transition hover:text-[#E6007E]">
            Industries
          </Link>

          <Link href="/about" className="transition hover:text-[#E6007E]">
            About
          </Link>

          <Link href="/blog" className="transition hover:text-[#E6007E]">
            Blog
          </Link>

          <Link href="/contact" className="transition hover:text-[#E6007E]">
            Contact
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="flex items-center gap-2 rounded-lg border border-[#2C2C2C] px-4 py-2 text-sm text-[#D9D9D9] transition hover:border-[#E6007E]">

            <Globe size={16} />

            EN

          </button>

          <button className="rounded-lg bg-[#E6007E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#FF2E93]">
            Request Quote
          </button>

        </div>

      </div>
    </header>
  );
}