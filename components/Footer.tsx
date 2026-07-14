import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2C2C2C] bg-[#080808]">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">

        {/* Company */}

        <div>

          <h2 className="text-2xl font-bold text-white">
            Secure Digital
          </h2>

          <span className="text-[#E6007E]">
            Solutions
          </span>

          <p className="mt-6 leading-7 text-[#B3B3B3]">
            Professional penetration testing and secure web
            development for businesses worldwide.
          </p>

        </div>

        {/* Services */}

        <div>

          <h3 className="mb-6 font-semibold text-white">
            Services
          </h3>

          <ul className="space-y-3 text-[#B3B3B3]">

            <li>
              <Link href="/services">
                Penetration Testing
              </Link>
            </li>

            <li>
              <Link href="/services">
                Web Development
              </Link>
            </li>

            <li>
              <Link href="/services">
                Security Consulting
              </Link>
            </li>

            <li>
              <Link href="/services">
                Vulnerability Assessment
              </Link>
            </li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h3 className="mb-6 font-semibold text-white">
            Company
          </h3>

          <ul className="space-y-3 text-[#B3B3B3]">

            <li>
              <Link href="/about">
                About
              </Link>
            </li>

            <li>
              <Link href="/blog">
                Blog
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Contact
              </Link>
            </li>

            <li>
              <Link href="/privacy">
                Privacy Policy
              </Link>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="mb-6 font-semibold text-white">
            Contact
          </h3>

          <div className="space-y-4">

            <a
              href="mailto:contact@company.com"
              className="flex items-center gap-3 text-[#B3B3B3] hover:text-white"
            >
              <Mail size={18} />
              contact@company.com
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-[#2C2C2C]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-[#707070] md:flex-row">

          <p>
            © 2026 Secure Digital Solutions. All rights reserved.
          </p>

          <div className="flex gap-6">

            <button className="hover:text-white">
              EN
            </button>

            <button className="hover:text-white">
              PT
            </button>

            <button className="hover:text-white">
              ES
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}