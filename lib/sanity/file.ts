import { getFileAsset } from "@sanity/asset-utils";
import type { File as SanityFile } from "sanity";

import { SANITY_DATASET_NAME, SANITY_PROJECT_ID } from "./config";

export const urlForFile = (source: SanityFile) => {
  if (!source.asset) return undefined;
  return getFileAsset(source.asset, {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET_NAME,
  }).url;
};
