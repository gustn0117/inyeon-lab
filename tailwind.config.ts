import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FFF0F5",
          100: "#FFE4EE",
          200: "#FFC1D6",
          300: "#FF9EBE",
          400: "#FF7BA6",
          500: "#FF5A8E",
          600: "#E84580",
          700: "#C93070",
          800: "#A32060",
          900: "#7D1050",
        },
      },
      fontFamily: {
        sans: ["Cafe24SurroundAir", "Nunito", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
