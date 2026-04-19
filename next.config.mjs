/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
      ignoreBuildErrors: true,
   },
   allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '10.10.13.25'],
}

export default nextConfig
