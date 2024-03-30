/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

import { env } from "../env.js";
import { apiVersion, dataset, projectId } from "./lib/sanity.api.js";
import { singletonPlugin } from "../plugins/settings.jsx";
import artist from "./schemas/documents/artist.js";
import faqs from "./schemas/documents/faqs.js";
import page from "./schemas/documents/page.js";
import privacy from "./schemas/documents/privacy.js";
import release from "./schemas/documents/release.js";
import terms from "./schemas/documents/terms.js";
import duration from "./schemas/objects/duration.js";
import link from "./schemas/objects/link.js";
import role from "./schemas/objects/role.js";
import tracklist from "./schemas/objects/tracklist.js";
import about from "./schemas/singletons/about.js";
import home from "./schemas/singletons/home.js";
import settings from "./schemas/singletons/settings.js";
import team from "./schemas/singletons/team.js";
import time from "./schemas/singletons/time.js";

const title = env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Oxmose Studio";

export const PREVIEWABLE_DOCUMENT_TYPES = [
  home.name,
  page.name,
  about.name,
  artist.name,
] satisfies string[];

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
  page.name,
  artist.name,
] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES;

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = "/api/draft";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      about,
      home,
      settings,
      team,
      time,
      // Documents
      artist,
      page,
      faqs,
      privacy,
      release,
      terms,
      // Objects
      duration,
      link,
      role,
      tracklist,
    ],
  },
  plugins: [
    structureTool(),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name, about.name, team.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
