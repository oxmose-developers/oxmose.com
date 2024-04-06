import { BillIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "terms",
  title: "Terms Articles",
  type: "document",
  icon: BillIcon,
  fields: [
    defineField({
      name: "category",
      title: "Category",
      description: "This field is the title or category of the article.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "article",
      title: "Article",
      description: "This field is the article of the category.",
      type: "array",
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: "Italic",
                value: "em",
              },
              {
                title: "Strong",
                value: "strong",
              },
            ],
          },
          styles: [],
          type: "block",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
