import { defineCliConfig } from "sanity/cli";

import { SANITY_DATASET_NAME, SANITY_PROJECT_ID } from "./lib/sanity";

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET_NAME,
  },
});
