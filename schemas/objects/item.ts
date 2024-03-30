import { defineField, defineType } from "sanity";

export default defineType({
  name: "item",
  title: "Item",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "name",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      type: "url",
      name: "link",
    }),
  ],
});
