// Shared Framer Motion variants.
// Only `transform` + `opacity` are animated to stay at 60fps.
// prefers-reduced-motion is respected globally via CSS + Framer's
// useReducedMotion in components where entrance matters.

const EASE = [0.22, 1, 0.36, 1];

// Fade + 24px rise — the default section/child reveal.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Parent that staggers its children on reveal.
export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

// Hero headline words rising one by one.
export const wordRise = {
  hidden: { opacity: 0, y: "0.9em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Shared whileInView config — reveal once, a bit before fully in view.
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.2, margin: "0px 0px -80px 0px" },
};

// Hover interactions.
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.02, transition: { duration: 0.25, ease: EASE } },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};
