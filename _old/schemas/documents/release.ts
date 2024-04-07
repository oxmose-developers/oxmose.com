import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "release",
  title: "Release",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "productImages",
      title: "Product Images",
      description: "This is a collection of product images.",
      type: "array",
      of: [
        {
          type: "image",
          name: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "This will be used as the caption for the image.",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "trackList",
      description: "The list of tracks in the album or record",
      title: "Track List",
      type: "array",
      of: [{ type: "tracklist" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "physicalFormat",
      description: "Is the product available in physical format?",
      title: "Physical Format",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "physicalPrice",
      description: "The price of the product in physical format.",
      title: "Physical Price",
      type: "number",
    }),

    defineField({
      name: "digitalFormat",
      description: "Is the product available in digital format?",
      title: "Digital Format",
      type: "boolean",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "digitalPrice",
      description: "The price of the product in digital format.",
      title: "Digital Price",
      type: "number",
    }),
  ],
});
