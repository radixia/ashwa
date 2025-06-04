"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  previewImage: z.string().url("Please enter a valid URL").optional(),
});

// Very small heuristic to guess a category based on the url hostname
// This helps implementing the "Smart Organization" feature from the specs
const categoryLookup: Record<string, string> = {
  vercel: "Development",
  github: "Development",
  stackoverflow: "Reference",
  "developer.mozilla": "Reference",
  figma: "Design",
  tailwindcss: "Design",
};

interface AddBookmarkDialogProps {
  onAdd?: (bookmark: z.infer<typeof formSchema>) => void;
}

export function AddBookmarkDialog({ onAdd }: AddBookmarkDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      category: "",
      previewImage: "",
    },
  });

  // Watch URL field to automatically suggest a category and preview image
  const urlValue = form.watch("url");
  const categoryValue = form.watch("category");

  useEffect(() => {
    if (!urlValue) return;
    try {
      const hostname = new URL(urlValue).hostname;
      const key = Object.keys(categoryLookup).find((d) => hostname.includes(d));
      if (key && !categoryValue) {
        form.setValue("category", categoryLookup[key]);
      }

      const preview = `https://image.thum.io/get/${encodeURIComponent(urlValue)}`;
      if (!form.getValues("previewImage")) {
        form.setValue("previewImage", preview);
      }
    } catch {
      // ignore URL parsing errors
    }
  }, [urlValue, categoryValue, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save this to a database
    console.log(values);
    if (onAdd) {
      onAdd(values);
    }
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <Plus className="h-4 w-4" />
          Add Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>Add a new bookmark to your collection.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Website name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the website"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previewImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preview Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Reference">Reference</SelectItem>
                      <SelectItem value="Tools">Tools</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
