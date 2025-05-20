import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // Enable dark mode via a class on <html>
  theme: {
    extend: {
      colors: {
        brand: '#000000',
        background: {
          light: '#ffffff',
          dark: '#1f2937', // Tailwind gray-800
        },
        surface: {
          light: '#f9fafb', // Tailwind gray-50
          dark: '#374151',  // Tailwind gray-700
        },
        text: {
          light: '#111827', // Tailwind gray-900
          dark: '#d1d5db',  // Tailwind gray-300
        },
        primary: {
          light: '#2563eb', // Tailwind blue-600
          dark: '#3b82f6',  // Tailwind blue-500
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
