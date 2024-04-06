import { defineField } from "sanity";

export default defineField({
  title: "Tracklist",
  name: "tracklist",
  type: "object",
  fields: [
    { name: "title", type: "string", title: "Track Title" },
    { name: "duration", type: "duration", title: "Track Length" },
  ],
});
