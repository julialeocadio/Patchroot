import { ArrowRight, CalendarDays } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#080808] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#2C2C2C] bg-[#141414] p-12 md:p-16">

          {/* Glow */}
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#E6007E]/20 blur-[120px]" />

          <div className="relative text-center">

            <span className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2 text-sm text-[#FF2E93]">
              LET'S WORK TOGETHER
            </span>

            <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">
              Ready to Secure Your Next Project?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#B3B3B3]">
              Whether you need a professional penetration test or a
              modern and secure web application, our team is ready
              to help you achieve your goals.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <button className="flex items-center gap-2 rounded-xl bg-[#E6007E] px-8 py-4 font-semibold text-white transition hover:bg-[#FF2E93]">

                Request a Quote

                <ArrowRight size={18} />

              </button>

              <button className="flex items-center gap-2 rounded-xl border border-[#2C2C2C] px-8 py-4 text-white transition hover:border-[#E6007E] hover:bg-[#2C2C2C]">

                <CalendarDays size={18} />

                Schedule a Meeting

              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}