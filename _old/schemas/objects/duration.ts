import { defineField, defineType } from "sanity";

export default defineType({
  name: "duration",
  title: "duration",
  description: "Enter the duration in minutes and seconds",
  type: "object",
  fields: [
    defineField({
      name: "minutes",
      type: "timeValue",
    }),
    defineField({
      name: "seconds",
      type: "timeValue",
    }),
  ],
  // make the fields render next to each other
  options: { columns: 2 },
});
