"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TeamMember } from "@/data/team";

type Props = {
    member: TeamMember;
    index: number;
};

export default function TeamMemberCard({ member, index }: Props) {
    const t = useTranslations("about.team");

    return (
        <article className="group border border-white/10 bg-white/[0.02] p-3 transitions-colors duration-300 hover:border-[#E6007E]/60 sm:p-4">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#111116]">
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={t(member.roleKey)}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />    
                ): (
                    <div className="flex h-full items-center justify-center font-mono text-5xl text-white/20">
                        {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                    </div>
                )}

                <span className="absolute bottom-3 left-3 bg-[#08090B]/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[#E60007E]">
                    {t("member")} / {String(index + 1).padStart(3, "0")}
                </span>
            </div>

            <div className="px-1 pb-2 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E60007E]">
                    {t(member.roleKey)}
                </p>

                <h3 className="mt-2 break-words font-mono text-lg uppercase tracking-tight text-white sm:text-xl">
                    {member.name}
                </h3>

                <p className="mt-3 min-h-16 text-sm leading-6 text-white/55">
                    {t(member.bioKey)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                        <span
                            key={skill}
                            className="border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widertext-white/50"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}