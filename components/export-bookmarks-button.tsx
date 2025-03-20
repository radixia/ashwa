"use client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function ExportBookmarksButton() {
  const { toast } = useToast();

  // This would normally come from a global state or context
  // For demo purposes, we'll use a function that gets bookmarks from localStorage
  const getBookmarks = () => {
    try {
      const storedBookmarks = localStorage.getItem("bookmarks");
      return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    } catch (error) {
      console.error("Error retrieving bookmarks:", error);
      return [];
    }
  };

  const exportAsMarkdown = () => {
    const bookmarks = getBookmarks();

    if (bookmarks.length === 0) {
      toast({
        title: "No bookmarks to export",
        description: "Add some bookmarks first before exporting.",
        variant: "destructive",
      });
      return;
    }

    let markdownContent = "# Ashwa Bookmarks\n\n";

    // Group bookmarks by category
    const categorizedBookmarks = bookmarks.reduce((acc, bookmark) => {
      if (!acc[bookmark.category]) {
        acc[bookmark.category] = [];
      }
      acc[bookmark.category].push(bookmark);
      return acc;
    }, {});

    // Generate markdown for each category
    Object.entries(categorizedBookmarks).forEach(([category, bookmarks]) => {
      markdownContent += `## ${category}\n\n`;

      bookmarks.forEach((bookmark) => {
        markdownContent += `### [${bookmark.title}](${bookmark.url})\n\n`;
        if (bookmark.description) {
          markdownContent += `${bookmark.description}\n\n`;
        }
        if (bookmark.previewImage) {
          markdownContent += `![${bookmark.title}](${bookmark.previewImage})\n\n`;
        }
      });
    });

    // Create and download the file
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ashwa-bookmarks.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Bookmarks exported",
      description: "Your bookmarks have been exported as Markdown.",
    });
  };

  const exportAsHTML = () => {
    const bookmarks = getBookmarks();

    if (bookmarks.length === 0) {
      toast({
        title: "No bookmarks to export",
        description: "Add some bookmarks first before exporting.",
        variant: "destructive",
      });
      return;
    }

    let htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ashwa Bookmarks</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #256b89; }
          .category { margin-top: 30px; }
          .bookmark { margin-bottom: 20px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .bookmark h3 { margin-top: 0; }
          .bookmark a { color: #256b89; text-decoration: none; }
          .bookmark a:hover { text-decoration: underline; }
          .bookmark img { max-width: 100%; max-height: 200px; margin-top: 10px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Ashwa Bookmarks</h1>
    `;

    // Group bookmarks by category
    const categorizedBookmarks = bookmarks.reduce((acc, bookmark) => {
      if (!acc[bookmark.category]) {
        acc[bookmark.category] = [];
      }
      acc[bookmark.category].push(bookmark);
      return acc;
    }, {});

    // Generate HTML for each category
    Object.entries(categorizedBookmarks).forEach(([category, bookmarks]) => {
      htmlContent += `<div class="category"><h2>${category}</h2>`;

      bookmarks.forEach((bookmark) => {
        htmlContent += `
          <div class="bookmark">
            <h3><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></h3>
            ${bookmark.description ? `<p>${bookmark.description}</p>` : ""}
            ${
              bookmark.previewImage
                ? `<img src="${bookmark.previewImage}" alt="${bookmark.title}">`
                : ""
            }
          </div>
        `;
      });

      htmlContent += `</div>`;
    });

    htmlContent += `
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ashwa-bookmarks.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Bookmarks exported",
      description: "Your bookmarks have been exported as HTML.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportAsMarkdown}>Export as Markdown</DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsHTML}>Export as HTML</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
