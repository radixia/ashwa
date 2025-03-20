/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "assets.vercel.com",
      "nextjs.org",
      "tailwindcss.com",
      "ui.shadcn.com",
      "developer.mozilla.org",
      "github.githubassets.com",
      "cdn.sanity.io",
      "cdn.sstatic.net",
    ],
  },
};

module.exports = nextConfig;
