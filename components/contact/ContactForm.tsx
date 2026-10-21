"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
    const t = useTranslations("contact.form");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [confirmationSent, setConfirmationSent] = useState(true);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (status === "sending") return;

        const form = event.currentTarget;
        const formData = new FormData(form);

        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    service: formData.get("service"),
                    message: formData.get("message"),
                    website: formData.get("website"),
                    locale: window.location.pathname.split("/")[1] || "en",
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error("CONTACT_SUBMISSION_FAILED");
            }

            setConfirmationSent(result.confirmationSent !== false);
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
        }
    }

    return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm text-white/70"
          >
            {t("name")} <span className="text-[#E6007E]">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            className="w-full rounded-lg border border-white/10 bg-[#08090B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#E6007E]"
            placeholder={t("namePlaceholder")}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm text-white/70"
          >
            {t("email")} <span className="text-[#E6007E]">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            className="w-full rounded-lg border border-white/10 bg-[#08090B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#E6007E]"
            placeholder={t("emailPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-service"
          className="mb-2 block text-sm text-white/70"
        >
          {t("service")} <span className="text-[#E6007E]">*</span>
        </label>
        <select
          id="contact-service"
          name="service"
          required
          defaultValue=""
          className="w-full rounded-lg border border-white/10 bg-[#08090B] px-4 py-3 text-sm text-white outline-none transition focus:border-[#E6007E]"
        >
          <option value="" disabled>
            {t("servicePlaceholder")}
          </option>
          <option value="web-development">
            {t("serviceOptions.web")}
          </option>
          <option value="cybersecurity">
            {t("serviceOptions.security")}
          </option>
          <option value="both">{t("serviceOptions.both")}</option>
          <option value="other">{t("serviceOptions.other")}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm text-white/70"
        >
          {t("message")} <span className="text-[#E6007E]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          minLength={10}
          maxLength={5000}
          required
          className="w-full resize-y rounded-lg border border-white/10 bg-[#08090B] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#E6007E]"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {/* Honeypot: keep this field invisible to ordinary visitors. */}
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#E6007E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#C9006E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6007E] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
        {status !== "sending" && <span aria-hidden="true">↗</span>}
      </button>

      <div aria-live="polite" role="status">
        {status === "success" && (
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] p-4 text-sm leading-6 text-emerald-300">
            {confirmationSent
              ? t("success")
              : t("successNoConfirmation")}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg border border-red-500/25 bg-red-500/[0.06] p-4 text-sm leading-6 text-red-300">
            {t("error")}
          </div>
        )}
      </div>
    </form>
  );
}