export const tokens = {
  typeScale: {
    hero: "clamp(2.8rem, 8vw, 7rem)",
    h1: "clamp(2.2rem, 5vw, 4.5rem)",
    h2: "clamp(1.7rem, 3vw, 2.8rem)",
    body: "1rem",
  },
  leading: {
    tight: 0.92,
    base: 1.4,
  },
  spacing: {
    8: "0.5rem",
    16: "1rem",
    24: "1.5rem",
    40: "2.5rem",
    64: "4rem",
  },
  radius: {
    md: "1rem",
    lg: "1.5rem",
  },
} as const;
