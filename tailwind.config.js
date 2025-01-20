/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      clipPath: {
        "custom-shape": "polygon(10% 20%, 80% 10%, 70% 90%, 20% 80%)",
      },
      colors: {
        "bg-primary": "rgb(var(--primary-bg))",
        "text-primary": "rgb(var(--primary-text))",
      },
    },
  },
  plugins: [require("tailwindcss-rtl"), flowbite.plugin()],
};
