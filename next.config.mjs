/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default config;
