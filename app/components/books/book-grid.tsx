import { BookCard } from "./book-card"
import { BookSkeleton } from "./book-skeleton"
import { EmptyState } from "./empty-state"
import { ErrorState } from "./error-state"

interface Book {
  id: string
  title: string
  author: string
  genre: string
  publicationYear: number
  description?: string
}

interface BookGridProps {
  books: Book[]
  loading: boolean
  error: boolean
  onEdit: (book: Book) => void
  onDelete: (book: Book) => void
  onRetry: () => void
}

export function BookGrid({ books, loading, error, onEdit, onDelete, onRetry }: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1">
        <ErrorState onRetry={onRetry} />
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
