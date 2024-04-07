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
      name: "description",
      type: "blockContent",
    }),
    defineField({
      name: "releaseDate",
      type: "releaseDate",
    }),
    defineField({
      name: "releaseReference",
      description: "Label reference",
      type: "string",
      validation: (Rule) => [Rule.required()],
      placeholder: "e.g. OXE #004",
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
    }),
  ],
});
