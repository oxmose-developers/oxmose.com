import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { type StructureBuilder, structureTool } from "sanity/structure";

import { schemaTypes, singletonTypes } from "./src/schemas";

const SANITY_PROJECT_ID = "5byknxyc";

const SANITY_DATASET_NAME = "production";

const SANITY_API_VERSION = "2023-05-03";

/**
 * Define the actions that should be available for singleton documents
 */
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string
) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export default defineConfig({
  name: "oxmose",
  title: "Oxmose Admin",

  studioHost: "oxmose",

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) => {
        const defaultItems = S.documentTypeListItems().filter(
          (listItem) => !singletonTypes.has(listItem.getId()!)
        );

        const singletonItems = schemaTypes
          .filter((type) => singletonTypes.has(type.name))
          .map((schemaType) =>
            singletonListItem(S, schemaType.name, schemaType.title)
          );

        return S.list()
          .title("Content")
          .id("content")
          .items([...singletonItems, S.divider(), ...defaultItems]);
      },
    }),
    visionTool({ defaultApiVersion: SANITY_API_VERSION }),
  ],
  schema: {
    types: schemaTypes,
    /**
     * Filter out singleton types from the global “New document” menu options
     */
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    /**
     * For singleton types, filter out actions that are not explicitly included in the `singletonActions` list defined above
     */
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : prev,
  },
});
