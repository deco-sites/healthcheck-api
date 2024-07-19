import daisyui from "daisyui";

const withOpacity =
  (token: string) => ({ opacityVariable }: { opacityVariable?: string }) =>
    opacityVariable
      ? `hsl(var(--${token}),var(${opacityVariable}))`
      : `hsl(var(--${token}))`;

export default {
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
    logs: false,
  },
  content: ["./**/*.tsx"],
  darkMode: "class",
  theme: {
    container: { center: true },
    extend: {
      animation: {
        "slide-up": "slide-up 0.5s ease forwards",
        "spin-left": "spin-left 1s linear infinite",
        "shake": "shake 1.25s ease infinite",
      },
      keyframes: {
        "shake": {
          "0%": { transform: "translate(.5px, .5px) rotate(0deg)" },
          "10%": { transform: "translate(-.5px, -1px) rotate(-.5deg)" },
          "20%": { transform: "translate(-1.5px, 0px) rotate(.5deg)" },
          "30%": { transform: "translate(1.5px, 1px) rotate(0deg)" },
          "40%": { transform: "translate(.5px, -.5px) rotate(.5deg)" },
          "50%": { transform: "translate(-.5px, 1px) rotate(-.5deg)" },
          "60%": { transform: "translate(-1.5px, .5px) rotate(0deg)" },
          "70%": { transform: "translate(1.5px, .5px) rotate(-.5deg)" },
          "80%": { transform: "translate(-.5px, -.5px) rotate(.5deg)" },
          "90%": { transform: "translate(.5px, 1px) rotate(0deg)" },
          "100%": { transform: "translate(.5px, -1px) rotate(-.5deg)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(50px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "spin-left": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
      fontSize: {
        // OLD THEME
        "hero-large": ["40px", "48px"],
        "hero-medium": ["32px", "40px"],
        "hero-small": ["28px", "32px"],
        "display": ["24px", "28px"],
        "heading": ["20px", "24px"],
        "subheading": ["13px", "16px"],
        "body-strong": ["12px", "20px"],
        "body-regular": ["12px", "20px"],
        "caption-strong": ["12px", "20px"],
        "caption-regular": ["12px", "20px"],
        "body-regular-10": ["10px", "14px"],

        "xs": ".75rem", // 75% of the base font size
        "sm": ".875rem", // 87.5% of the base font size
        "base": "1rem", // 100% of the base font size
        "lg": "1.125rem", // 112.5% of the base font size
        "xl": "1.25rem", // 125% of the base font size
        "2xl": "1.5rem", // 150% of the base font size
        "3xl": "1.875rem", // 187.5% of the base font size
        "4xl": "2.25rem", // 225% of the base font size
        "5xl": "3rem", // 300% of the base font size
        "6xl": "4rem", // 400% of the base font size
      },
      fontWeight: {
        // OLD THEME
        "hero-large": 600,
        "hero-medium": 500,
        "hero-small": 600,
        "display": 400,
        "heading": 600,
        "subheading": 600,
        "body-strong": 500,
        "body-regular": 400,
        "caption-strong": 500,
        "caption-regular": 400,
        "body-regular-10": 400,
      },
      boxShadow: {
        // TODO: Stop using this shadow
        "dark": "1px 1px 2px rgba(0, 0, 0, 0.2)",

        /** New design system foundations */
        "s-low-light":
          "0px 4px 8px rgba(0, 0, 0, 0.03), 0px 2px 4px rgba(0, 0, 0, 0.2)",
        "s-medium-light":
          "0px 4px 4px rgba(0, 0, 0, 0.12), 0px 8px 16px rgba(0, 0, 0, 0.07)",
        "s-high-light":
          "0px 4px 8px rgba(0, 0, 0, 0.15), 0px 8px 32px rgba(0, 0, 0, 0.1)",
        "s-low-dark":
          "0px 4px 8px rgba(0, 0, 0, 0.53), 0px 2px 4px rgba(0, 0, 0, 0.7)",
        "s-medium-dark":
          "0px 4px 4px rgba(0, 0, 0, 0.72), 0px 8px 16px rgba(0, 0, 0, 0.67)",
        "s-high-dark":
          "0px 4px 8px rgba(0, 0, 0, 0.85), 0px 8px 32px rgba(0, 0, 0, 0.8)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["serif"],
        "argent": ["argent-pixel", "sans-serif"],
      },
      colors: [
        "base-000",
        "base-100",
        "base-200",
        "base-300",
        "base-400",
        "base-500",
        "base-600",
        "base-700",

        "critical-100",
        "critical-200",
        "critical-800",
        "critical-900",

        "warning-100",
        "warning-200",
        "warning-800",
        "warning-900",

        "positive-100",
        "positive-200",
        "positive-800",
        "positive-900",

        "highlight-100",
        "highlight-200",
        "highlight-800",
        "highlight-900",

        "notification-500",

        "decorative-one-500",
        "decorative-one-900",

        "decorative-two-500",
        "decorative-two-900",

        "decorative-three-500",
        "decorative-three-900",
      ].reduce(
        (acc, token) => ({ [token]: withOpacity(token), ...acc }),
        {},
      ),
    },
  },
};
