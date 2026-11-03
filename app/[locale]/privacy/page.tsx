
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { getTranslations } from "next-intl/server";

type Locale = "en" | "pt" | "es"

export const metadata = {
  title: "Privacy Policy | PatchRoot",
  description:
    "Learn how PatchRoot collects, uses, stores, and protects personal data.",
};

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: currentLocale } = await params;

  const supportedLocales: Locale[] = ["en", "pt", "es"];

  if (!supportedLocales.includes(currentLocale)) {
    throw new Error ("Unsupported locale");
  }

  const t = await getTranslations({
    locale: currentLocale,
    namespace: "privacy",
  })

  const policyPath = path.join(
    process.cwd(),
    "content",
    "privacy",
    `privacy-policy.${currentLocale}.md`
  );

  const policy = await fs.readFile(policyPath, "utf-8");

  const datePatterns: Record<Locale, RegExp> = {
    en: /^\*\*Last updated:\*\*\s*(.+)$/m,
    pt: /^\*\*Última atualização:\*\*\s*(.+)$/m,
    es: /^\*\*Última actualización:\*\*\s*(.+)$/m,
  };

  const dateMatch = policy.match(datePatterns[currentLocale]);
  const lastUpdated = dateMatch?.[1]?.trim() ?? "";

  const body = policy
    .replace(/^# .+\n+/m, "")
    .replace(datePatterns[currentLocale], "")
    .trim();

  const sections = Array.from(
    body.matchAll(/^##\s+(.+)$/gm),
    (match) =>({
      title: match[1].trim(),
      id: slugify(match[1].trim()),
    })
  );

  const pageTitles: Record<Locale, string> ={
    en: "Privacy Policy",
    pt: "Política de Privacidad",
    es: "Política de Privacidad",
  };

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm text-[#E6007E]">PATCHROOT / LEGAL</p>

        <h1 className="mt-4 text-4xl font-bold">
          {pageTitles[currentLocale]}
        </h1>

        <p className="mt-2 text-sm text-white/75">
          {lastUpdated}
        </p>

      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            {t("onThisPage")}
          </p>

          <nav className="flex gap-3 overflow-x-auto border-b border-white/10 pb-4 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-l lg:pb-0 lg:pl-4">

            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="whitespace-nowrap text-sm text-white/50 transition-colors hover:text-[#E6007E] lg:whitespace-normal lg:py-2"
              >
                {section.title}
              </a>
            ))}

          </nav>
        </aside>

        <article
          className="
            mt-auto
            max-w-4xl
            px-6
            py-20

            [&>h2]:mt-16
            [&>h2]:mb-6
            [&>h2]:border-b
            [&>h2]:border-white/10
            [&>h2]:pb-4
            [&>h2]:text-2xl
            [&>h2]:font-semibold
            [&>h2]:tracking-tight
            [&>h2]:text-white

            [&>h3]:mt-10
            [&>h3]:mb-4
            [&>h3]:text-lg
            [&>h3]:font-semibold
            [&>h3]:text-[#E6007E]

            [&>p]:mb-6

            [&>ul]:mb-8
            [&>ul]:list-disc
            [&>ul]:space-y-3
            [&>ul]:pl-6

            [&_li]:pl-2
            [&_li::marker]:text-[#E6007E]

            [&_strong]:font-semibold
            [&_strong]:text-white

            [&_a]:text-[#E6007E]
            [&_a]:underline
            [&_a]:underline-offset-4
            [&_a:hover]:text-[#F08BC2]
            "
          >
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
            components={{
              h2:({ children }) => {
                const heading = String(children);

                return (
                  <h2 id={slugify(heading)}>
                    {children}
                  </h2>
                );
              },
            }}
          >
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}