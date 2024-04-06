import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "credits",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "item",
          validation: (Rule) => [Rule.required()],
        }),
      ],
    }),
  ],
});
