import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-[#2C2C2C] bg-[#080808]">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">

        {/* Company */}

        <div>

          <h2 className="text-2xl font-bold text-white">
            {t("title")}
          </h2>

          <p className="mt-6 leading-7 text-[#B3B3B3]">
            {t("subtitle")}
          </p>

        </div>

        {/* Services */}

        <div>

          <h3 className="mb-6 font-semibold text-white">
            {t("services")}
          </h3>

          <ul className="space-y-3 text-[#B3B3B3]">

            <li>
              <Link href="/services">
                {t("service1")}
              </Link>
            </li>

            <li>
              <Link href="/services">
                {t("service2")}
              </Link>
            </li>

            <li>
              <Link href="/services">
                {t("service3")}
              </Link>
            </li>

            <li>
              <Link href="/services">
                {t("service4")}
              </Link>
            </li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h3 className="mb-6 font-semibold text-white">
            {t("company")}
          </h3>

          <ul className="space-y-3 text-[#B3B3B3]">

            <li>
              <Link href="/about">
                {t("about")}
              </Link>
            </li>

            <li>
              <Link href="/blog">
                {t("blog")}
              </Link>
            </li>

            <li>
              <Link href="/contact">
                {t("contact")}
              </Link>
            </li>

            <li>
              <Link href="/privacy">
                {t("privacy")}
              </Link>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="mb-6 font-semibold text-white">
            {t("contact")}
          </h3>

          <div className="space-y-4">

            <a
              href="mailto:patchroot.tech@gmail.com"
              className="flex items-center gap-3 text-[#B3B3B3] hover:text-white"
            >
              <Mail size={18} />
              patchroot.tech@gmail.com
            </a>

            <a
              href="https://wa.me/346731670175"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#B3B3B3] hover:text-white"
            >
              <MessageCircle size={18} />
              +34 631 67 01 75
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-[#2C2C2C]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-[#707070] md:flex-row">

          <p>
            © 2026 PatchRoot Tech. All rights reserved.
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