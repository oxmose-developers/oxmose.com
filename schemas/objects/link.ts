import { defineField } from "sanity";

export default defineField({
  type: "object",
  name: "link",
  title: "Link",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
    }),
    defineField({
      type: "url",
      name: "href",
      title: "URL",
    }),
  ],
});
