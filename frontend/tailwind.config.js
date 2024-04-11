import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-main": "#2D72E8",
        "blue-secondary": "#254582",
        "buttons-secondary": "#6668A01A",
        "nav-bg": "#f7f9fb",
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
};
