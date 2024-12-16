/** @type {import('next').NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/catalogue",
        destination: "/",
        permanent: false,
      },
      {
        source: "/visuals",
        destination: "/",
        permanent: false,
      },
      {
        source: "/videos",
        destination: "/",
        permanent: false,
      },
      {
        source: "/staff",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/newsletter",
        destination: "/",
        permanent: false,
      },
      {
        source: "/artist/shcaa",
        destination: "/artists/sacha-khalife",
        permanent: true,
      },
      {
        source: "/artist/roberto-musci-",
        destination: "/artists/roberto-musci",
        permanent: true,
      },
      {
        source: "/artist/:slug",
        destination: "/artists/:slug",
        permanent: true,
      },
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
