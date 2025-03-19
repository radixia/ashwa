"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Grid, List, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditBookmarkDialog } from "@/components/edit-bookmark-dialog"
import { DeleteBookmarkDialog } from "@/components/delete-bookmark-dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bookmark } from "lucide-react"
import { AddBookmarkDialog } from "./add-bookmark-dialog"
import { SaveWebsiteDialog } from "./save-website-dialog"
import { useToast } from "@/hooks/use-toast"

// Sample data - in a real app this would come from a database
const initialBookmarks = [
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
    previewImage: "https://github.githubassets.com/images/modules/site/social-cards/github-social.png",
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
]

// Map category to color
const categoryColors: Record<string, string> = {
  Development: "blue",
  Design: "emerald",
  Reference: "amber",
  Tools: "purple",
  Personal: "pink",
  Other: "gray",
}

// Color style maps
const colorMap: Record<string, { bg: string; text: string; bgLight: string; bgDark: string }> = {
  blue: {
    bg: "rgb(59, 130, 246)",
    text: "rgb(59, 130, 246)",
    bgLight: "rgb(219, 234, 254)",
    bgDark: "rgb(30, 58, 138)",
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
}

export function BookmarkList() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const { toast } = useToast()

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem("bookmarks")
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks))
      } else {
        // If no bookmarks in localStorage, save the initial ones
        localStorage.setItem("bookmarks", JSON.stringify(initialBookmarks))
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error)
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    } catch (error) {
      console.error("Error saving bookmarks:", error)
    }
  }, [bookmarks])

  // Get unique categories
  const categories = ["all", ...new Set(bookmarks.map((bookmark) => bookmark.category))]

  // Filter bookmarks based on search query and active tab
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeTab === "all" || bookmark.category === activeTab

    return matchesSearch && matchesCategory
  })

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  const handleUpdateBookmark = (updatedBookmark: (typeof bookmarks)[0]) => {
    setBookmarks(bookmarks.map((bookmark) => (bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark)))
  }

  const handleAddBookmark = (newBookmark: Omit<(typeof bookmarks)[0], "id">) => {
    const bookmark = {
      ...newBookmark,
      id: Date.now().toString(),
    }
    setBookmarks([...bookmarks, bookmark])
  }

  // Get color for category
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || "gray"
  }

  const handleSaveWebsite = async (bookmark: (typeof bookmarks)[0]) => {
    try {
      // In a real app, this would call a server action to fetch and save the website content
      // For demo purposes, we'll just show a toast
      toast({
        title: "Website saved",
        description: `${bookmark.title} has been saved locally.`,
      })
    } catch (error) {
      console.error("Error saving website:", error)
      toast({
        title: "Error saving website",
        description: "There was an error saving the website locally.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 pt-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Collection</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex w-full overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab} className="mt-0">
          {filteredBookmarks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center"
            >
              <div className="rounded-full bg-muted p-4">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No bookmarks found</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <AddBookmarkDialog onAdd={handleAddBookmark} />
            </motion.div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredBookmarks.map((bookmark, index) => {
                  const colorKey = getCategoryColor(bookmark.category)
                  const color = colorMap[colorKey]

                  return (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5">
                        <div style={{ height: "6px", backgroundColor: color.bg }} />
                        {bookmark.previewImage && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <img
                              src={bookmark.previewImage || "/placeholder.svg"}
                              alt={`Preview of ${bookmark.title}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="line-clamp-1 text-lg group-hover:text-primary">
                              {bookmark.title}
                            </CardTitle>
                            <Badge variant="outline" className="ml-2 flex items-center gap-1">
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: color.bg,
                                  marginRight: "4px",
                                }}
                              />
                              <span>{bookmark.category}</span>
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2 text-sm text-muted-foreground">{bookmark.description}</p>
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {bookmark.url.replace(/^https?:\/\//, "")}
                          </a>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex gap-1">
                            <EditBookmarkDialog bookmark={bookmark} onUpdate={handleUpdateBookmark} />
                            <SaveWebsiteDialog bookmark={bookmark} onSave={handleSaveWebsite} />
                          </div>
                          <DeleteBookmarkDialog
                            bookmarkId={bookmark.id}
                            bookmarkTitle={bookmark.title}
                            onDelete={handleDeleteBookmark}
                          />
                        </CardFooter>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredBookmarks.map((bookmark, index) => {
                  const colorKey = getCategoryColor(bookmark.category)
                  const color = colorMap[colorKey]

                  return (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                    >
                      <div className="group flex items-center justify-between rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          {bookmark.previewImage ? (
                            <div className="h-12 w-12 overflow-hidden rounded-md">
                              <img
                                src={bookmark.previewImage || "/placeholder.svg"}
                                alt={`Preview of ${bookmark.title}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "48px",
                                height: "48px",
                                borderRadius: "6px",
                                backgroundColor: color.bgLight,
                                color: color.text,
                              }}
                              className="dark:bg-opacity-20"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium group-hover:text-primary">{bookmark.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {bookmark.url.replace(/^https?:\/\//, "")}
                              </span>
                              <Badge variant="outline" size="sm" className="flex h-5 items-center gap-1 text-xs">
                                <span
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    backgroundColor: color.bg,
                                  }}
                                />
                                {bookmark.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Open</span>
                            </a>
                          </Button>
                          <SaveWebsiteDialog bookmark={bookmark} onSave={handleSaveWebsite} />
                          <EditBookmarkDialog bookmark={bookmark} onUpdate={handleUpdateBookmark} />
                          <DeleteBookmarkDialog
                            bookmarkId={bookmark.id}
                            bookmarkTitle={bookmark.title}
                            onDelete={handleDeleteBookmark}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

