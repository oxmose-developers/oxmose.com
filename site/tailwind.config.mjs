const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        128: "32rem",
      },
      screens: { xs: "420px" },
      borderWidth: { hairline: "0.5px" },
      colors: {
        oxe: {
          grey: "#7B7878",
          purple: "#BEB9FD",
        },
      },
      fontFamily: {
        sans: ["var(--font-monument-grotesk)", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        tighter: 1.2,
        12.5: "3.125rem",
        15: "3.75rem",
        15.5: "3.875rem",
        16: "4rem",
        24: "6rem",
      },
      fontSize: {
        "oxe-xs": ["1.125rem", { lineHeight: "1.5625rem" }],

        "oxe-sm": ["1.5625rem", { lineHeight: "2.125rem" }],
        "oxe-md": ["1.875rem", { lineHeight: "2.1875rem" }],
        "oxe-xl": ["2.5rem", { lineHeight: "2.8125rem" }],
        "oxe-xxl": ["2.8125rem", { lineHeight: "3.125rem" }],
        "oxe-xxxl": ["3.75rem"],
        "oxe-xxxxl": ["5rem", { lineHeight: "5.625rem" }],
        "oxe-xxxxxl": ["10.625rem"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};

export default config;
