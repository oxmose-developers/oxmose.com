import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "trackList",
  type: "object",
  fields: [
    defineField({
      name: "tracks",
      type: "array",
      of: [defineArrayMember({ type: "track" })],
    }),
  ],
});
