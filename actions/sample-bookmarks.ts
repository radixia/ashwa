import { Bookmark } from "@/domain/types/bookmark";

export const initialBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Vercel",
    url: "https://vercel.com",
    description: "Cloud platform for frontend developers",
    category: "Development",
    color: "blue",
    previewImage: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
  },
  {
    id: "2",
    title: "Next.js",
    url: "https://nextjs.org",
    description: "The React Framework for the Web",
    category: "Development",
    color: "blue",
    previewImage: "https://nextjs.org/static/blog/next-13/twitter-card.png",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework",
    category: "Design",
    color: "emerald",
    previewImage: "https://tailwindcss.com/_next/static/media/social-card-large.a6e71726.jpg",
  },
  {
    id: "4",
    title: "shadcn/ui",
    url: "https://ui.shadcn.com",
    description: "Beautifully designed components",
    category: "Design",
    color: "emerald",
    previewImage: "https://ui.shadcn.com/og.jpg",
  },
  {
    id: "5",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "Resources for developers, by developers",
    category: "Reference",
    color: "amber",
    previewImage: "https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png",
  },
  {
    id: "6",
    title: "GitHub",
    url: "https://github.com",
    description: "Where the world builds software",
    category: "Development",
    color: "blue",
    previewImage:
      "https://github.githubassets.com/images/modules/site/social-cards/github-social.png",
  },
  {
    id: "7",
    title: "Figma",
    url: "https://figma.com",
    description: "The collaborative interface design tool",
    category: "Design",
    color: "emerald",
    previewImage:
      "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1108x1057.png",
  },
  {
    id: "8",
    title: "Stack Overflow",
    url: "https://stackoverflow.com",
    description: "Where developers learn, share, & build careers",
    category: "Reference",
    color: "amber",
    previewImage: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png",
  },
];
