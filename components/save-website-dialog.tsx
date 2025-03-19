"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SaveWebsiteDialogProps {
  bookmark: {
    id: string
    title: string
    url: string
    description?: string
    category: string
    previewImage?: string
  }
  onSave: (bookmark: SaveWebsiteDialogProps["bookmark"]) => void
}

export function SaveWebsiteDialog({ bookmark, onSave }: SaveWebsiteDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("preview")

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await onSave(bookmark)
      setOpen(false)
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
    } finally {
      setIsLoading(false)
    }
  }

  // This would be populated with actual content in a real app
  const previewContent = `
# ${bookmark.title}

${bookmark.description || ""}

[Visit Website](${bookmark.url})

${bookmark.previewImage ? `![Preview](${bookmark.previewImage})` : ""}
  `

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Download className="h-4 w-4" />
          <span className="sr-only">Save Website</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Save Website Locally</DialogTitle>
          <DialogDescription>Save a local copy of {bookmark.title} for offline access.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <div className="max-h-[300px] overflow-auto rounded-md border p-4">
              <div className="prose dark:prose-invert">
                <h1>{bookmark.title}</h1>
                {bookmark.description && <p>{bookmark.description}</p>}
                <p>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                    {bookmark.url}
                  </a>
                </p>
                {bookmark.previewImage && (
                  <img
                    src={bookmark.previewImage || "/placeholder.svg"}
                    alt={`Preview of ${bookmark.title}`}
                    className="mt-4 max-h-[200px] rounded-md object-cover"
                  />
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="options" className="mt-4">
            <div className="space-y-4 rounded-md border p-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Save Options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="save-images"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="save-images" className="text-sm">
                      Save images
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="save-css" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <label htmlFor="save-css" className="text-sm">
                      Save CSS styles
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="save-js" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="save-js" className="text-sm">
                      Save JavaScript (may not work offline)
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Format</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="format-html"
                      name="format"
                      className="h-4 w-4 rounded-full border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="format-html" className="text-sm">
                      HTML
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="format-markdown"
                      name="format"
                      className="h-4 w-4 rounded-full border-gray-300"
                    />
                    <label htmlFor="format-markdown" className="text-sm">
                      Markdown
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="format-pdf"
                      name="format"
                      className="h-4 w-4 rounded-full border-gray-300"
                    />
                    <label htmlFor="format-pdf" className="text-sm">
                      PDF
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Website"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

