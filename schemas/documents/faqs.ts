import { HelpCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "F.A.Q.",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      description: "This field is a frequently asked question.",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "answer",
      title: "Answer",
      description: "This field is the answer to the question.",
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
      validation: (rule) => rule.required()
    }),
  ]
})