import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@ant-design/*/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "accent-content": "#A0A1A3",
        "red-brown": "#D4625C",
      },
    },
  },
  plugins: [],
};

export default config;
