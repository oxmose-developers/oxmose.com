import { defineType, defineField } from "sanity";

export default defineType({
  name: "questionAnswer",
  title: "Question Answer",
  type: "object",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: "answer",
      type: "blockContent",
      validation: (Rule) => [Rule.required()],
    }),
  ],
});
