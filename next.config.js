/** @type {import('next').NextConfig} */
const nextConfig = {
  // For development, we'll use the server
  // output: 'export', // Uncomment this for static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
