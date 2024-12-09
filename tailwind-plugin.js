const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities, theme }) {
  addUtilities({
    ".text-heading-1": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.7xl"),
      lineHeight: "120%",
      fontWeight: theme("fontWeight.black"),
      letterSpacing: "-2.56px",
      textTransform: "uppercase",
    },
    ".text-heading-2": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.6xl"),
      lineHeight: "120%",
      fontWeight: theme("fontWeight.black"),
      letterSpacing: "-1.92px",
      textTransform: "uppercase",
    },
    ".text-heading-3": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.5xl"),
      lineHeight: "120%",
      fontWeight: theme("fontWeight.black"),
      letterSpacing: "-1.44px",
      textTransform: "uppercase",
    },
    ".text-heading-4": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.4xl"),
      lineHeight: "120%",
      letterSpacing: "-1.28px",
      textTransform: "uppercase",
      "&-black": {
        fontWeight: theme("fontWeight.black"),
      },
      "&-bold": {
        fontWeight: theme("fontWeight.bold"),
      },
    },
    ".text-heading-5": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.2xl"),
      lineHeight: "120%",
      letterSpacing: "-0.96px",
      textTransform: "uppercase",
      "&-black": {
        fontWeight: theme("fontWeight.black"),
      },
      "&-bold": {
        fontWeight: theme("fontWeight.bold"),
      },
    },
    ".text-heading-6": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.xl"),
      lineHeight: "120%",
      letterSpacing: "-0.8px",
      textTransform: "uppercase",
      "&-black": {
        fontWeight: theme("fontWeight.black"),
      },
      "&-bold": {
        fontWeight: theme("fontWeight.bold"),
      },
    },
    ".text-heading-7": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.lg"),
      lineHeight: "150%",
      letterSpacing: "-0.72px",
      textTransform: "uppercase",
      "&-black": {
        fontWeight: theme("fontWeight.black"),
      },
      "&-semi-bold": {
        fontWeight: "600",
      },
    },
    ".text-heading-8": {
      fontFamily: theme("fontFamily.heading"),
      fontSize: theme("fontSize.base"),
      lineHeight: "150%",
      letterSpacing: "-0.64px",
      textTransform: "uppercase",
      "&-black": {
        fontWeight: theme("fontWeight.black"),
      },
      "&-bold": {
        fontWeight: theme("fontWeight.bold"),
      },
      "&-semi-bold": {
        fontWeight: "600",
      },
    },
    ".text-body-1": {
      fontFamily: theme("fontFamily.body"),
      fontSize: theme("fontSize.xl"),
      lineHeight: "150%",
      fontWeight: "600",
    },
    ".text-body-2": {
      fontFamily: theme("fontFamily.body"),
      fontSize: theme("fontSize.lg"),
      lineHeight: "150%",
      fontWeight: theme("fontWeight.normal"),
    },
    ".text-body-3": {
      fontFamily: theme("fontFamily.body"),
      fontSize: theme("fontSize.base"),
      lineHeight: "150%",
      fontWeight: theme("fontWeight.normal"),
      "&-semi-bold": {
        fontWeight: "600",
      },
    },
    ".text-body-4": {
      fontFamily: theme("fontFamily.body"),
      fontSize: theme("fontSize.sm"),
      lineHeight: "150%",
      fontWeight: theme("fontWeight.normal"),
      "&-semi-bold": {
        fontWeight: "600",
      },
    },
    ".text-body-5": {
      fontFamily: theme("fontFamily.body"),
      fontSize: theme("fontSize.xs"),
      lineHeight: "150%",
      fontWeight: theme("fontWeight.normal"),
      "&-bold": {
        fontWeight: theme("fontWeight.bold"),
      },
    },
  });
});
