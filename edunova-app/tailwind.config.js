/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#005cae",
        "primary-dark": "#004689",
        "primary-light": "#e3edfb",
        secondary: "#006c52",
        "secondary-light": "#d8f5e9",
        background: "#f7f9fc",
        surface: "#ffffff",
        "surface-alt": "#eef2fa",
        border: "#d7dce6",
        text: "#111c2d",
        "text-muted": "#5b6472",
        danger: "#ba1a1a",
      },
    },
  },
  plugins: [],
};
