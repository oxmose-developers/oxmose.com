import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import { sanityIntegration } from "@sanity/astro";

import { SANITY_DATASET_NAME, SANITY_PROJECT_ID } from "./env.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://oxmose.com",
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    sanityIntegration({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET_NAME,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: "/admin",
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  devToolbar: {
    enabled: false,
  },
});
