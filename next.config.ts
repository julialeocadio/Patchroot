import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // suas configurações do Next.js
  outputFileTracingExcludes: {
    "/": ["./content/privacy-policy.md"],
  },
};

export default withNextIntl(nextConfig);