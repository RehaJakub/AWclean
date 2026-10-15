import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// One colour source for Tailwind utilities and the existing component CSS.
export const palette = {
  primary: { DEFAULT: "#122B4D", brand: "#2A59A7", bright: "#0089CF" },
  accent: { DEFAULT: "#00AEEF", ink: "#00749D" },
  neutral: {
    900: "#182937",
    700: "#405365",
    600: "#596774",
    300: "#BDCAD6",
    200: "#DDE5EC",
  },
  surface: {
    DEFAULT: "#F3F7FA",
    white: "#FFFFFF",
    blue: "#EAF5FC",
    ice: "#CDE6FF",
  },
} as const;

export default {
  theme: {
    extend: {
      colors: palette,
      fontFamily: { sans: ["Inter Variable", "sans-serif"] },
    },
  },
  plugins: [
    plugin(({ addBase }) =>
      addBase({
        ":root": {
          "--color-primary": palette.primary.DEFAULT,
          "--color-brand": palette.primary.brand,
          "--color-secondary": palette.primary.bright,
          "--color-accent": palette.accent.DEFAULT,
          "--color-accent-ink": palette.accent.ink,
          "--color-ink": palette.neutral[900],
          "--color-muted": palette.neutral[600],
          "--color-line": palette.neutral[200],
          "--color-surface": palette.surface.DEFAULT,
          "--color-surface-blue": palette.surface.blue,
          "--color-navy": palette.primary.DEFAULT,
          "--color-ice": palette.surface.ice,
        },
      }),
    ),
  ],
} satisfies Config;
