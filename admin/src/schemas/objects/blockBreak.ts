import { defineField, defineType } from "sanity";

export default defineType({
  name: "blockBreak",
  title: "Block Break",
  type: "object",
  preview: {
    prepare() {
      return {
        title: "Block Break",
      };
    },
  },
  fields: [
    defineField({
      name: "style",
      type: "string",
      initialValue: "break",
      readOnly: true,
    }),
  ],
});
