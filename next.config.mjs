/** @type {import('next').NextConfig} */

const mediaHostname =
  process.env.NEXT_PUBLIC_MEDIA_HOSTNAME || "api-remnant.duckdns.org"

const nextConfig = {
  ...(process.env.NODE_ENV === "production" && { output: "export" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: ["http", "https"].flatMap((protocol) =>
      [undefined, "8888"].map((port) => ({
        protocol,
        hostname: mediaHostname,
        ...(port && { port }),
        pathname: "/media/**",
      }))
    ),
  },
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "10.10.13.25",
    "api-remnant.duckdns.org",
    "sisterlike-tastelessly-mike.ngrok-free.dev",
  ],
}

export default nextConfig
