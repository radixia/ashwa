// Map category to color
export const categoryColors: Record<string, string> = {
  Development: "blue",
  Design: "emerald",
  Reference: "amber",
  Tools: "purple",
  Personal: "pink",
  Other: "gray",
};

// Color style maps
export const colorMap: Record<
  string,
  { bg: string; text: string; bgLight: string; bgDark: string }
> = {
  blue: {
    bg: "rgb(35, 67, 232)",
    text: "rgb(35, 67, 232)",
    bgLight: "rgb(219, 234, 254)",
    bgDark: "rgb(17, 57, 137)",
  },
  emerald: {
    bg: "rgb(16, 185, 129)",
    text: "rgb(16, 185, 129)",
    bgLight: "rgb(209, 250, 229)",
    bgDark: "rgb(6, 78, 59)",
  },
  amber: {
    bg: "rgb(245, 158, 11)",
    text: "rgb(245, 158, 11)",
    bgLight: "rgb(254, 243, 199)",
    bgDark: "rgb(120, 53, 15)",
  },
  purple: {
    bg: "rgb(168, 85, 247)",
    text: "rgb(168, 85, 247)",
    bgLight: "rgb(237, 233, 254)",
    bgDark: "rgb(88, 28, 135)",
  },
  pink: {
    bg: "rgb(236, 72, 153)",
    text: "rgb(236, 72, 153)",
    bgLight: "rgb(252, 231, 243)",
    bgDark: "rgb(112, 26, 117)",
  },
  gray: {
    bg: "rgb(107, 114, 128)",
    text: "rgb(107, 114, 128)",
    bgLight: "rgb(229, 231, 235)",
    bgDark: "rgb(31, 41, 55)",
  },
};
