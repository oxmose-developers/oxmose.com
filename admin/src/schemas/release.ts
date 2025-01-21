import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "release",
  title: "Release",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "releaseReference",
    },
  },
  orderings: [
    {
      title: "Release Reference, Chronological",
      name: "releaseReferenceDesc",
      by: [{ field: "releaseReference", direction: "asc" }],
    },
    {
      title: "Title, Ascending",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Title, Descending",
      name: "titleDesc",
      by: [{ field: "title", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (StringRule) => [StringRule.required()],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (SlugRule) => [SlugRule.required()],
    }),
    defineField({
      name: "artist",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "artist" },
        }),
      ],
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
      name: "productImages",
      type: "array",
      of: [defineArrayMember({ type: "image" })],
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "description",
      type: "blockContent",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "releaseDate",
      type: "releaseDate",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "releaseReference",
      description: "Label reference",
      type: "string",
      placeholder: "e.g. OXE #004",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "links",
      description: "Where to stream this release",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "trackList",
      type: "trackList",
    }),
    defineField({
      name: "shopifyProductDigital",
      description: "Found as the URL Handle in Shopify",
      type: "string",
      placeholder: "e.g. oxe-001-digital",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "digitalProductFormat",
      type: "string",
      placeholder: "WAV 24bit",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "shopifyProductPhysical",
      description: "Found as the URL Handle in Shopify",
      type: "string",
      placeholder: "e.g. oxe-001-vinyl",
    }),
    defineField({
      name: "physicalProductFormat",
      type: "string",
      placeholder: '12" 180g limited edition',
    }),
  ],
});
