"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

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

interface DeleteBookmarkDialogProps {
  bookmarkId: string
  bookmarkTitle: string
  onDelete: (id: string) => void
}

export function DeleteBookmarkDialog({ bookmarkId, bookmarkTitle, onDelete }: DeleteBookmarkDialogProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    onDelete(bookmarkId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
          <Trash2 className="mr-2 h-3.5 w-3.5" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Bookmark</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{bookmarkTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

