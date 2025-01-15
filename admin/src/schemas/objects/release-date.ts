import { defineType } from "sanity";

export default defineType({
  name: "releaseDate",
  type: "date",
  options: {
    dateFormat: "DD-MM-YY",
  },
  validation: (Rule) => [Rule.required()],
});
