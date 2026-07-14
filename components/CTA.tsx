import {
  Shield,
  Globe,
  FileText,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function WhyChoose() {
  const t = useTranslations("Us");

  const features = [
  {
    icon: Shield,
    title: t("t1"),
    description:
      t("d1"),
  },
  {
    icon: Globe,
    title: t("t2"),
    description:
      t("d2"),
  },
  {
    icon: FileText,
    title: t("t3"),
    description:
      t("d3"),
  },
  {
    icon: UsersRound,
    title: t("t4"),
    description:
      t("d4"),
  },
];

  return (
    <section className="bg-[#080808] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2 text-sm text-[#FF2E93]">
            {t("title")}
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">

            {t("trusted")}

          </h2>

          <p className="mt-6 text-lg leading-8 text-[#B3B3B3]">

            {t("text")}

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-[#2C2C2C] bg-[#141414] p-8 transition hover:border-[#E6007E]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6007E]/10">

                  <Icon
                    size={28}
                    className="text-[#E6007E]"
                  />

                </div>

                <h3 className="text-2xl font-semibold text-white">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-[#B3B3B3]">

                  {feature.description}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}