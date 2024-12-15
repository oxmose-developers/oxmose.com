import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "name",
      title: "Name",
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      type: "url",
      name: "href",
      title: "URL",
      validation: (UrlRule) => [
        UrlRule.required().uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
      ],
    }),
  ],
});
