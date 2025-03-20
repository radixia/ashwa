"use client";

import { useState } from "react";
import { ExternalLink, Grid, List, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditBookmarkDialog } from "@/components/edit-bookmark-dialog";
import { DeleteBookmarkDialog } from "@/components/delete-bookmark-dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bookmark } from "lucide-react";
import { AddBookmarkDialog } from "./add-bookmark-dialog";
import { SaveWebsiteDialog } from "./save-website-dialog";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Bookmark as BookmarkType } from "@/domain/types/bookmark";
import { categoryColors, colorMap } from "@/lib/mappings/bookmark-mappings";
import { initialBookmarks } from "@/actions/sample-bookmarks";

export function BookmarkList() {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkType[]>("bookmarks", initialBookmarks);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const { toast } = useToast();

  // Get unique categories
  const categories = ["all", ...new Set(bookmarks.map((bookmark) => bookmark.category))];

  // Filter bookmarks based on search query and active tab
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeTab === "all" || bookmark.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  const handleDeleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleUpdateBookmark = (updatedBookmark: Omit<BookmarkType, "color">) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id
          ? { ...updatedBookmark, color: getCategoryColor(updatedBookmark.category) }
          : bookmark
      )
    );
  };

  const handleAddBookmark = (newBookmark: Omit<BookmarkType, "id" | "color">) => {
    const bookmark = {
      ...newBookmark,
      id: Date.now().toString(),
      color: getCategoryColor(newBookmark.category),
    };
    setBookmarks([...bookmarks, bookmark]);
  };

  // Get color for category
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || "gray";
  };

  const handleSaveWebsite = async (bookmark: BookmarkType) => {
    try {
      // In a real app, this would call a server action to fetch and save the website content
      // For demo purposes, we'll just show a toast
      toast({
        title: "Website saved",
        description: `${bookmark.title} has been saved locally.`,
      });
    } catch (error) {
      console.error("Error saving website:", error);
      toast({
        title: "Error saving website",
        description: "There was an error saving the website locally.",
        variant: "destructive",
      });
    }
  };

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
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value)}
          >
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
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
              <AddBookmarkDialog onAdd={handleAddBookmark} />
            </motion.div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredBookmarks.map((bookmark, index) => {
                  const colorKey = getCategoryColor(bookmark.category);
                  const color = colorMap[colorKey];

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
                            <Image
                              src={bookmark.previewImage || "/placeholder.svg"}
                              alt={`Preview of ${bookmark.title}`}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {bookmark.description}
                          </p>
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
                            <EditBookmarkDialog
                              bookmark={bookmark}
                              onUpdate={handleUpdateBookmark}
                            />
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
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {filteredBookmarks.map((bookmark, index) => {
                  const colorKey = getCategoryColor(bookmark.category);
                  const color = colorMap[colorKey];

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
                              <Image
                                src={bookmark.previewImage || "/placeholder.svg"}
                                alt={`Preview of ${bookmark.title}`}
                                fill
                                className="object-cover"
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
                            <h3 className="font-medium group-hover:text-primary">
                              {bookmark.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {bookmark.url.replace(/^https?:\/\//, "")}
                              </span>
                              <Badge
                                variant="outline"
                                className="flex h-5 items-center gap-1 text-xs"
                              >
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
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
