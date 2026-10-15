"use client";

import { useTranslations } from "next-intl";
import { team } from "@/data/team";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamSection() {
    const t = useTranslations("about.team");

    return (
        <section id="team" className="border-t border-white/10 py-16 sm:py-24">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#E6007E]">
                        {t("eyebrow")}    
                    </p>

                    <h2 className="font-mono text-3xl uppercase tracking-tight text-white sm:text-5xl">
                        {t("title")}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                        {t("description")}
                    </p>
                </div>

                <p className="font-mono text-xs uppercase tracking-wider text-white/40">
                    {t("memberCount", { count: team.length })}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member, index) => (
                    <TeamMemberCard
                        key={member.id}
                        member={member}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}