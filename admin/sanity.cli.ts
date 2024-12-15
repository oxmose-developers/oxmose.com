/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { defineCliConfig } from "sanity/cli";

const SANITY_PROJECT_ID = "5byknxyc";

const SANITY_DATASET_NAME = "production";

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET_NAME,
  },
  /**
   * Visit https://www.sanity.io/docs/environment-variables to leanr more about using environment variables for local & production.
   */
  studioHost: "oxmose",
  autoUpdates: true,
});
