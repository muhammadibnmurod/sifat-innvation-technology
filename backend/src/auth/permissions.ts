// Admin paneldagi bo'limlar — user'ga shu bo'limlarga ruxsat berish mumkin.
export const PERMISSIONS = [
  "services",
  "news",
  "partners",
  "faq",
  "messages",
  "settings",
] as const;

export type Permission = (typeof PERMISSIONS)[number];
