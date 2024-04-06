import { defineType } from "sanity";

export default defineType({
  name: "timeValue",
  title: "TimeValue",
  type: "string",
  options: {
    list: ALLOWED_TIMES(),
  },
});

function ALLOWED_TIMES() {
  const times: string[] = [];
  for (let t = 0; t < 60; t++) {
    times.push(t.toString());
  }
  return times;
}
