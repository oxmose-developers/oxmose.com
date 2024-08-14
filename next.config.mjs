/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "cdn.shopify.com" },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default config;
