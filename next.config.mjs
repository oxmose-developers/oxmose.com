/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/faq",
        destination: "/faq/orders",
        permanent: false,
      },
    ];
  },
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
