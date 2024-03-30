import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "twoColumn",
  type: "object",
  fields: [
    defineField({
      name: "left",
      type: "array",
      of: [
        defineArrayMember({
          type: "credits",
        }),
      ],
    }),
    defineField({
      name: "right",
      type: "array",
      of: [
        defineArrayMember({
          type: "credits",
        }),
      ],
    }),
  ],
});
