import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "publishingArtist",
  title: "Publishing Artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (SlugRule) => [SlugRule.required()],
    }),
    defineField({
      name: "overview",
      type: "metaDescription",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "works",
      type: "trackList",
    }),
  ],
});
