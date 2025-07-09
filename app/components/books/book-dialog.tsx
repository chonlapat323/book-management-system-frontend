'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BOOK_GENRES, useBookStore } from '@/app/store/books'
import { Book, CreateBookDto, UpdateBookDto } from '@/app/types/book'

import { BookForm } from './book-form'

interface BookDialogProps {
  mode: 'add' | 'edit'
  initialData?: Book
}

export function BookDialog({ mode, initialData }: BookDialogProps) {
  const {
    isAddDialogOpen,
    isEditDialogOpen,
    closeAddDialog,
    closeEditDialog,
    addBook,
    editBook,
    isLoading,
    error,
  } = useBookStore()

  const isOpen = mode === 'add' ? isAddDialogOpen : isEditDialogOpen
  const onClose = mode === 'add' ? closeAddDialog : closeEditDialog

  const handleSubmit = (data: CreateBookDto) => {
    if (mode === 'add') {
      addBook(data)
    } else if (initialData?.id) {
      editBook(initialData.id, data as UpdateBookDto)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'เพิ่มหนังสือใหม่' : 'แก้ไขหนังสือ'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'กรอกข้อมูลหนังสือที่ต้องการเพิ่ม'
              : 'แก้ไขข้อมูลหนังสือ'}
          </DialogDescription>
        </DialogHeader>
        <BookForm
          genres={BOOK_GENRES}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
          error={error}
          book={initialData}
        />
      </DialogContent>
    </Dialog>
  )
}
