import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  icon: UserIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: "name",
      description: "This field is the name of the artist.",
      title: "Name",
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
        "This image will be used as the cover image for the artist. This is the image displayed in the list within the artists page.",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "about",
      description: "Used for the artists about section",
      title: "About",
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
      name: "links",
      title: "External Links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});
