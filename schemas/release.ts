import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "release",
  title: "Release",
  type: "document",
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
      validation: (ArrayRule) => [ArrayRule.required()],
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
      of: [
        defineArrayMember({
          type: "link",
        }),
      ],
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "trackList",
      type: "trackList",
    }),
    defineField({
      name: "shopifyProductDigital",
      type: "string",
      placeholder: "e.g. 8775887061330",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "shopifyProductPhysical",
      type: "string",
      placeholder: "e.g. 8775887061330",
      validation: (Rule) => [Rule.required()],
    }),
  ],
});
