/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      sans: "var(--font-sans)",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
