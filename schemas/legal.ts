import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "legal",
  title: "Legal",
  type: "document",
  groups: [
    {
      name: "english",
      title: "English",
    },
    {
      name: "french",
      title: "French",
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
      name: "overview",
      type: "metaDescription",
    }),
    defineField({
      name: "englishTitle",
      type: "string",
      group: "english",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "englishContent",
      type: "array",
      group: "english",
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "frenchTitle",
      type: "string",
      group: "french",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "frenchContent",
      type: "array",
      group: "french",
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => [Rule.required()],
    }),
  ],
});
