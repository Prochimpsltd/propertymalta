/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        malta: {
          warm: "#FAFAF7",
          white: "#FFFFFF",
          blue: "#176B87",
          "blue-hover": "#12556B",
          navy: "#0F4C5C",
          sky: "#DDEFF3",
          "sky-light": "#F0F8FA",
          sand: "#E8D8BE",
          "sand-light": "#F3E6D2",
          "sand-dark": "#D4BE9B",
          charcoal: "#243238",
          slate: "#68777D",
          border: "#E8ECEC",
          "border-dark": "#D3DCDE",
          green: "#3E8064",
          "green-light": "#EAF5EF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        btn: "9px",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(36, 50, 56, 0.04)",
        card: "0 4px 20px rgba(36, 50, 56, 0.06)",
        hover: "0 10px 30px rgba(23, 107, 135, 0.09)",
        dropdown: "0 12px 36px rgba(36, 50, 56, 0.12)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
      },
    },
  },
  plugins: [],
};
