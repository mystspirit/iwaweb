/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // For Cloudinary image hosting
  },
};

module.exports = nextConfig;
