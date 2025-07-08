'use client'

import { Book } from '@/app/types/book'

import { BookCard } from './book-card'
import { BookSkeleton } from './book-skeleton'
import { EmptyState } from './empty-state'
import { ErrorState } from './error-state'

interface BookGridProps {
  books: Book[]
  loading: boolean
  error: boolean
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
  onRetry?: () => void
}

export function BookGrid({
  books,
  loading,
  error,
  onEdit,
  onDelete,
  onRetry,
}: BookGridProps) {
  if (error) {
    return <ErrorState onRetry={onRetry} />
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <BookSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
