
import { getTranslations } from "next-intl/server";

type Locale = "en" | "pt" | "es";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "servicesPage",
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "servicesPage",
  });

  return (
    <main className="min-h-screen bg-[#08090B] text-white">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <p className="text-sm font-medium tracking-widest text-[#E6007E]">
          {t("eyebrow")}
        </p>

        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {t("heading")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#A5A9B2] md:text-lg">
            {t("intro")}
          </p>
        </div>

      </section>

      {/* Services cards will go here */}

    </main>
  );
}
