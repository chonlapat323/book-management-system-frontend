"use client"

import { BookGrid } from "@/app/components/books/book-grid"
import { BookManagementHeader } from "@/app/components/books/book-management-header"
import { DeleteConfirmationDialog } from "@/app/components/books/delete-confirmation-dialog"
import { PaginationControls } from "@/app/components/books/pagination-controls"
import { SearchAndFilters } from "@/app/components/books/search-and-filters"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useMemo, useState } from "react"

interface Book {
  id: string
  title: string
  author: string
  genre: string
  publicationYear: number
  description?: string
}

// Mock data
const mockBooks: Book[] = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", publicationYear: 1925 },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publicationYear: 1960 },
  { id: "3", title: "1984", author: "George Orwell", genre: "Dystopian", publicationYear: 1949 },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", publicationYear: 1813 },
  { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", publicationYear: 1951 },
  { id: "6", title: "Lord of the Flies", author: "William Golding", genre: "Fiction", publicationYear: 1954 },
  { id: "7", title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", publicationYear: 1937 },
  { id: "8", title: "Fahrenheit 451", author: "Ray Bradbury", genre: "Science Fiction", publicationYear: 1953 },
  { id: "9", title: "Jane Eyre", author: "Charlotte Brontë", genre: "Romance", publicationYear: 1847 },
  { id: "10", title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", publicationYear: 1954 },
  { id: "11", title: "Brave New World", author: "Aldous Huxley", genre: "Science Fiction", publicationYear: 1932 },
  { id: "12", title: "The Chronicles of Narnia", author: "C.S. Lewis", genre: "Fantasy", publicationYear: 1950 },
  { id: "13", title: "Dune", author: "Frank Herbert", genre: "Science Fiction", publicationYear: 1965 },
  { id: "14", title: "The Handmaid's Tale", author: "Margaret Atwood", genre: "Dystopian", publicationYear: 1985 },
]

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  // Simulate API call
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      setError(false)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setBooks(mockBooks)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Get unique genres and authors for filters
  const genres = useMemo(() => {
    const uniqueGenres = Array.from(new Set(books.map((book) => book.genre)))
    return uniqueGenres.sort()
  }, [books])

  const authors = useMemo(() => {
    const uniqueAuthors = Array.from(new Set(books.map((book) => book.author)))
    return uniqueAuthors.sort()
  }, [books])

  // Filter and paginate books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre
      const matchesAuthor = selectedAuthor === "all" || book.author === selectedAuthor

      return matchesSearch && matchesGenre && matchesAuthor
    })
  }, [books, searchQuery, selectedGenre, selectedAuthor])

  const totalPages = Math.ceil(filteredBooks.length / pageSize)
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedGenre, selectedAuthor, pageSize])

  const handleEdit = (book: Book) => {
    setBookToEdit(book)
    setEditDialogOpen(true)
  }

  const handleDelete = (book: Book) => {
    setBookToDelete(book)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter((book) => book.id !== bookToDelete.id))
      setDeleteDialogOpen(false)
      setBookToDelete(null)
    }
  }

  const handleRetry = () => {
    setError(false)
    setLoading(true)
    // Simulate retry
    setTimeout(() => {
      setBooks(mockBooks)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <BookManagementHeader onAddBook={() => setAddDialogOpen(true)} />

      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        selectedAuthor={selectedAuthor}
        onAuthorChange={setSelectedAuthor}
        genres={genres}
        authors={authors}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <BookGrid
          books={paginatedBooks}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRetry={handleRetry}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredBooks.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </main>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        book={bookToDelete}
        onConfirm={confirmDelete}
      />

      {/* Edit Dialog Placeholder */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Edit the details for "{bookToEdit?.title}".</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">Edit form would go here...</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog Placeholder */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>Add a new book to your collection.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">Add form would go here...</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAddDialogOpen(false)}>Add Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
