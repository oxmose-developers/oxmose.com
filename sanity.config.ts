// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { SANITY_DATASET_NAME, SANITY_PROJECT_ID } from "../env.mjs/index.js";
import { schemaTypes, singletonTypes } from "./schemas/index.js";

/**
 * Define the actions that should be available for singleton documents
 */
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string,
) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export default defineConfig({
  name: "oxmose",
  title: "Oxmose Admin",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
  plugins: [
    structureTool({
      structure: (S) => {
        const defaultItems = S.documentTypeListItems().filter(
          (listItem) => !singletonTypes.has(listItem.getId() as string),
        );

        const singletonItems = schemaTypes
          .filter((type) => singletonTypes.has(type.name))
          .map((schemaType) =>
            singletonListItem(S, schemaType.name, schemaType.title),
          );

        return S.list()
          .title("Content")
          .id("content")
          .items([...singletonItems, S.divider(), ...defaultItems]);
      },
    }),
    visionTool(),
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
