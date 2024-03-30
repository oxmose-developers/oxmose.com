import { defineType, defineField } from "sanity";

export default defineType({
  name: "accessibleImage",
  title: "Accessible Image",
  type: "object",
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Alternative text is required.",
      hidden: ({ parent }) => !parent?.asset,
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
      hidden: ({ parent }) => !parent?.asset,
    }),
  ],
});
