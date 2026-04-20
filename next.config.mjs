/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.13.99",
        port: "8888",
        pathname: "/media/**",
      },
    ],
  },

  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "10.10.13.25"],
}

export default nextConfig
