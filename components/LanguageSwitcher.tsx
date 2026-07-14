"use client";

import {Globe} from "lucide-react";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  {
    code: "en",
    label: "English",
    flag: "🇺🇸",
  },
  {
    code: "pt",
    label: "Português",
    flag: "🇧🇷",
  },
  {
    code: "es",
    label: "Español",
    flag: "🇪🇸",
  },
] as const;

type LanguageSwitcherProps = {
    compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const locale = useLocale();

  const pathname = usePathname();

  const router = useRouter();

  const current =
    languages.find((l) => l.code === locale) ??
    languages[0];

  function changeLanguage(locale: string) {
    router.replace(pathname, {locale});
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger>

        <button
          className="
            flex items-center gap-2
            rounded-lg
            border border-[#2C2C2C]
            bg-[#141414]
            px-4 py-2
            text-sm
            text-white
            transition
            hover:border-[#E6007E]
          "
        >
          <Globe size={16} />

          <span>{current.flag}</span>

          {!compact && <span>{current.label}</span>}
        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          w-52
          border-[#2C2C2C]
          bg-[#141414]
          text-white
        "
      >
        {languages.map((language) => (

          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="
              cursor-pointer
              focus:bg-[#E6007E]
              focus:text-white
            "
          >
            <span className="mr-3">

              {language.flag}

            </span>

            {language.label}

          </DropdownMenuItem>

        ))}
      </DropdownMenuContent>

    </DropdownMenu>
  );
}
