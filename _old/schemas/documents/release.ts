import { PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "release",
  title: "Release",
  type: "document",
  icon: PlayIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "title",
      description: "This field is the title of the record or album.",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "reference",
      to: { type: "artist" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      description: "Used for the <meta> description tag for SEO",
      title: "Overview",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description:
        "This image will be used as the cover image for the album. This is the image displayed in the list within the record page.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
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
      name: "description",
      description: "Used for the record description section",
      title: "Description",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.required(),
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
      name: "releaseDate",
      description: "When the album or record is due for release",
      title: "Release Date",
      type: "date",
      options: {
        dateFormat: "DD.MM.YY",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "releaseReference",
      description: "The label release reference.",
      title: "Release Reference",
      type: "string",
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
    defineField({
      name: "links",
      title: "External Links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});
