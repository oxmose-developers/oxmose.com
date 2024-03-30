import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "faqs",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({
      name: "category",
      type: "string",
      validation: (StringRule) => [StringRule.required()],
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "category",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (SlugRule) => [SlugRule.required()],
    }),
    defineField({
      name: "questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "questionAnswer",
        }),
      ],
    }),
  ],
});
