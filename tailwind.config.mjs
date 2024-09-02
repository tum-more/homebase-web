const plugin = require("tailwindcss/plugin");
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Archivo Variable", ...defaultTheme.fontFamily.sans],
        body: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "16/9": "16/9",
      },
      colors: {
        black: "hsl(var(--black))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        gray: {
          default: "hsl(var(--content-gray-default))",
          secondary: "hsl(var(--content-gray-secondary))",
          tertiary: "hsl(var(--content-gray-tertiary))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand-500))",
          subtle: "hsl(var(--brand-subtle))",
        },
      },
      rotate: {
        45: "45deg",
        135: "135deg",
        225: "225deg",
        315: "315deg",
      },
      animation: {
        twinkle: "twinkle 2s ease-in-out forwards",
        meteor: "meteor 3s ease-in-out forwards",
      },
      keyframes: {
        twinkle: {
          "0%": {
            opacity: 0,
            transform: "rotate(0deg)",
          },
          "50%": {
            opacity: 1,
            transform: "rotate(180deg)",
          },
          "100%": {
            opacity: 0,
            transform: "rotate(360deg)",
          },
        },
        meteor: {
          "0%": {
            opacity: 0,
            transform: "translateY(200%)",
          },
          "50%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addComponents, addUtilities, theme }) {
      addUtilities({
        ".text-heading-2": {
          fontFamily: theme("fontFamily.heading"),
          fontSize: theme("fontSize.6xl"),
          lineHeight: "120%",
          fontWeight: theme("fontWeight.black"),
          letterSpacing: theme("letterSpacing.tighter"),
          textTransform: "uppercase",
        },
        ".text-heading-3": {
          fontFamily: theme("fontFamily.heading"),
          fontSize: theme("fontSize.5xl"),
          lineHeight: "120%",
          fontWeight: theme("fontWeight.extrabold"),
          letterSpacing: "-1.44px",
          "&-extrabold": {
            fontWeight: theme("fontWeight.extrabold"),
          },
          "&-black": {
            fontWeight: theme("fontWeight.black"),
          },
        },
        ".text-heading-4": {
          fontFamily: theme("fontFamily.heading"),
          fontSize: theme("fontSize.4xl"),
          lineHeight: "120%",
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: theme("letterSpacing.tighter"),
        },
        ".text-heading-5": {
          fontFamily: theme("fontFamily.heading"),
          fontSize: theme("fontSize.2xl"),
          lineHeight: "150%",
          fontWeight: theme("fontWeight.black"),
          letterSpacing: theme("letterSpacing.tighter"),
          textTransform: "uppercase",
        },
        ".text-heading-6": {
          fontFamily: theme("fontFamily.body"),
          fontSize: theme("fontSize.xl"),
          lineHeight: "150%",
          fontWeight: theme("fontWeight.bold"),
        },

        ".text-body-2": {
          fontFamily: theme("fontFamily.body"),
          fontSize: theme("fontSize.base"),
          lineHeight: "150%",
          fontWeight: theme("fontWeight.normal"),
        },
        ".text-body-4": {
          fontFamily: theme("fontFamily.body"),
          fontSize: theme("fontSize.xs"),
          lineHeight: "150%",
          fontWeight: theme("fontWeight.normal"),
        },
      });
    }),
  ],
};
