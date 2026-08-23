import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const csp = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Vercel's adapter packages the build itself. Its trace processing conflicts
// with Next's standalone copy step, while local and Docker builds need it.
const isAdapterBuild = Boolean(
  process.env.NEXT_ADAPTER_PATH || process.env.VERCEL,
);

const nextConfig: NextConfig = {
  output: isAdapterBuild ? undefined : "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/impressum",
        destination: "/imprint",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);
