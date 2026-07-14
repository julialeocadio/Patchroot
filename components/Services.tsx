import { ShieldCheck, Code2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("Services");
  return (
    <section className="bg-[#080808] py-28">

      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2 text-sm text-[#FF2E93]">
            {t("services")}
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">

            {t("title")}

          </h2>

          <p className="mt-6 text-lg leading-8 text-[#B3B3B3]">

            {t("subtitle")}

          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Card 1 */}

          <div className="group rounded-3xl border border-[#2C2C2C] bg-[#141414] p-10 transition duration-300 hover:border-[#E6007E] hover:-translate-y-2">

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6007E]/10">

              <ShieldCheck
                className="text-[#E6007E]"
                size={34}
              />

            </div>

            <h3 className="text-3xl font-bold text-white">

              {t("service1")}

            </h3>

            <p className="mt-5 leading-8 text-[#B3B3B3]">

              {t("service1Description")}

            </p>

            <ul className="mt-8 space-y-3 text-[#D9D9D9]">

              <li>• {t("s1")}</li>

              <li>• {t("s2")}</li>

              <li>• {t("s3")}</li>

              <li>• {t("s4")}</li>

              <li>• {t("s5")}</li>

            </ul>

            <button className="mt-10 flex items-center gap-2 font-semibold text-[#E6007E]">

              {t("learnMore")}

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Card 2 */}

          <div className="group rounded-3xl border border-[#2C2C2C] bg-[#141414] p-10 transition duration-300 hover:border-[#E6007E] hover:-translate-y-2">

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6007E]/10">

              <Code2
                className="text-[#E6007E]"
                size={34}
              />

            </div>

            <h3 className="text-3xl font-bold text-white">

              {t("service2")}

            </h3>

            <p className="mt-5 leading-8 text-[#B3B3B3]">

              {t("service2Description")}

            </p>

            <ul className="mt-8 space-y-3 text-[#D9D9D9]">

              <li>• {t("s6")}</li>

              <li>• {t("s7")}</li>

              <li>• {t("s8")}</li>

              <li>• {t("s9")}</li>

              <li>• {t("S10")}</li>

            </ul>

            <button className="mt-10 flex items-center gap-2 font-semibold text-[#E6007E]">

              {t("learnMore")}

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}