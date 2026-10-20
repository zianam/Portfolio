import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#100b24",
        lavender: "#c9b7ff",
        pink: "#ff62bb"
      }
    }
  },
  plugins: []
};

export default config;
