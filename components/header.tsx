import { Bookmark } from "lucide-react"
import Link from "next/link"

import { AddBookmarkDialog } from "@/components/add-bookmark-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExportBookmarksButton } from "./export-bookmarks-button"

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Bookmark className="h-4 w-4" />
          </div>
          <span>Ashwa</span>
        </Link>
        <div className="flex items-center gap-2">
          <ExportBookmarksButton />
          <AddBookmarkDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

