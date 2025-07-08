'use client'

import { useEffect, useState } from 'react'

import { BookDialog } from '@/app/components/books/book-dialog'
import { BookGrid } from '@/app/components/books/book-grid'
import { DeleteConfirmationDialog } from '@/app/components/books/delete-confirmation-dialog'
import { PaginationControls } from '@/app/components/books/pagination-controls'
import { SearchAndFilters } from '@/app/components/books/search-and-filters'

import { useBooks } from './hooks/useBooks'
import { useBookStore } from './store/books'
import { Book } from './types/book'

export default function BookManagement() {
  const { removeBook, openEditDialog, selectedBook, currentParams } =
    useBookStore()

  // State - ใช้ค่าจาก store เป็นค่าเริ่มต้น
  const [searchQuery, setSearchQuery] = useState(currentParams?.search || '')
  const [selectedGenre, setSelectedGenre] = useState<string>(
    currentParams?.genre || 'all'
  )
  const [currentPage, setCurrentPage] = useState(currentParams?.page || 1)
  const [pageSize, setPageSize] = useState(currentParams?.limit || 12)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)

  // Get books data
  const {
    data: booksResponse,
    isLoading,
    isError,
    error: apiError,
    refetch,
  } = useBooks({
    page: currentPage,
    limit: pageSize,
    search: searchQuery || undefined,
    genre: selectedGenre !== 'all' ? selectedGenre : undefined,
  })

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedGenre, pageSize])

  const handleDelete = (book: Book) => {
    setBookToDelete(book)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await removeBook(bookToDelete.id)
        // หลังจากลบสำเร็จ
        setDeleteDialogOpen(false)
        setBookToDelete(null)
        // refetch ข้อมูลใหม่โดยใช้ filter เดิม
        await refetch()

        // ถ้าหน้าปัจจุบันไม่มีข้อมูลแล้ว (เช่น ลบรายการสุดท้ายของหน้า) ให้ย้อนไปหน้าก่อนหน้า
        if (booksResponse?.data?.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1)
        }
      } catch (error) {
        console.error('Failed to delete book:', error)
      }
    }
  }

  const totalPages = Math.ceil((booksResponse?.meta?.total || 0) / pageSize)

  return (
    <div className="from-background via-background to-muted/30 dark:from-background dark:via-background dark:to-muted/10 container mx-auto min-h-screen bg-gradient-to-br">
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <BookGrid
          books={booksResponse?.data || []}
          loading={isLoading}
          error={isError}
          onEdit={openEditDialog}
          onDelete={handleDelete}
          onRetry={refetch}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={booksResponse?.meta?.total || 0}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </main>

      {/* Dialogs */}
      <BookDialog mode="add" />
      <BookDialog mode="edit" initialData={selectedBook || undefined} />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        book={bookToDelete}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
