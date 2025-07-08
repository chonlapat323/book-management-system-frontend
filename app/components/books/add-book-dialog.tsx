"use client"

import { BOOK_GENRES, useBookStore } from "@/app/store/books"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookForm } from "./book-form"

export function AddBookDialog() {
  const { 
    isAddDialogOpen, 
    closeAddDialog, 
    addBook,
    isLoading,
    error
  } = useBookStore()

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={closeAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เพิ่มหนังสือใหม่</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลหนังสือที่ต้องการเพิ่ม
          </DialogDescription>
        </DialogHeader>
        <BookForm
          genres={BOOK_GENRES}
          onSubmit={addBook}
          isSubmitting={isLoading}
          error={error}
        />
      </DialogContent>
    </Dialog>
  )
}