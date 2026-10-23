/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9F9F6",
        foreground: "#0C2016",
        ivory: {
          50: "#FDFDFC",
          100: "#F9F9F6",
          200: "#F3F3EC",
          300: "#E7E7DC",
          400: "#D6D6C4",
          500: "#B8B8A2",
        },
        forest: {
          50: "#F2F7F4",
          100: "#E1EDE6",
          200: "#C4DBD0",
          300: "#9CBEB0",
          400: "#5D947C",
          500: "#367257",
          600: "#245741",
          700: "#1B4433",
          800: "#143527",
          900: "#0F281D",
          950: "#071710",
        },
        limeAccent: {
          50: "#F7FEE7",
          100: "#ECFCCB",
          200: "#D9F99D",
          300: "#BEF264",
          400: "#A3E635",
          500: "#84CC16",
          600: "#65A30D",
        },
        muted: {
          DEFAULT: "#F1F1E8",
          foreground: "#526359",
        },
        border: "#E2E2D5",
      },
      fontFamily: {
        sans: ["Manrope", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 40, 29, 0.04), 0 1px 2px 0 rgba(15, 40, 29, 0.02)',
        'card': '0 4px 20px -2px rgba(15, 40, 29, 0.05), 0 2px 6px -1px rgba(15, 40, 29, 0.03)',
        'elevated': '0 12px 32px -4px rgba(15, 40, 29, 0.08), 0 4px 12px -2px rgba(15, 40, 29, 0.04)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
};
