import { ShieldCheck, Code2, ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <section className="bg-[#080808] py-28">

      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-[#E6007E]/30 bg-[#E6007E]/10 px-4 py-2 text-sm text-[#FF2E93]">
            OUR SERVICES
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">

            Development

          </h2>

          <p className="mt-6 text-lg leading-8 text-[#B3B3B3]">

            We combine cybersecurity expertise and modern software
            development to help organizations build secure applications.

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

              Penetration Testing

            </h3>

            <p className="mt-5 leading-8 text-[#B3B3B3]">

              Identify vulnerabilities before attackers do through
              comprehensive security assessments based on industry
              best practices.

            </p>

            <ul className="mt-8 space-y-3 text-[#D9D9D9]">

              <li>• Web Application Testing</li>

              <li>• API Security</li>

              <li>• Network Assessments</li>

              <li>• Vulnerability Reports</li>

              <li>• Remediation Guidance</li>

            </ul>

            <button className="mt-10 flex items-center gap-2 font-semibold text-[#E6007E]">

              Learn More

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

              Web Development

            </h3>

            <p className="mt-5 leading-8 text-[#B3B3B3]">

              We design and develop websites and
              web applications with security integrated from the
              very beginning.

            </p>

            <ul className="mt-8 space-y-3 text-[#D9D9D9]">

              <li>• Corporate Websites</li>

              <li>• Web Applications</li>

              <li>• E-commerce</li>

              <li>• REST APIs</li>

              <li>• Ongoing Maintenance</li>

            </ul>

            <button className="mt-10 flex items-center gap-2 font-semibold text-[#E6007E]">

              Learn More

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}