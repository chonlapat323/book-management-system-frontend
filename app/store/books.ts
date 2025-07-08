import { create } from 'zustand'
import { createBook, deleteBook, getBooks, updateBook } from '../lib/api/books'
import { Book, BookQueryParams, CreateBookDto, UpdateBookDto } from '../types/book'

// ย้าย genres มาไว้ที่นี่
export const BOOK_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Mystery",
  "Horror",
  "Biography",
  "History",
  "Poetry"
] as const

export type BookGenre = typeof BOOK_GENRES[number]

interface BookStore {
  // Data States
  books: Book[]
  meta: {
    total: number
    page: number
    limit: number
  } | null
  
  // Query Params
  currentParams: BookQueryParams | undefined
  
  // Dialog States
  isAddDialogOpen: boolean
  isEditDialogOpen: boolean
  isDeleteDialogOpen: boolean
  
  // Book being edited/deleted
  selectedBook: Book | null
  
  // Loading States
  isLoading: boolean
  error: string | null

  // Actions - Dialog
  openAddDialog: () => void
  closeAddDialog: () => void
  openEditDialog: (book: Book) => void
  closeEditDialog: () => void
  openDeleteDialog: (book: Book) => void
  closeDeleteDialog: () => void

  // Actions - Book Operations
  fetchBooks: (params?: BookQueryParams) => Promise<void>
  addBook: (book: CreateBookDto) => Promise<void>
  editBook: (id: number, book: UpdateBookDto) => Promise<void>
  removeBook: (id: number) => Promise<void>
  
  // Action - Reset
  resetError: () => void
}

export const useBookStore = create<BookStore>((set, get) => ({
  // Initial States
  books: [],
  meta: null,
  currentParams: undefined,
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,
  selectedBook: null,
  isLoading: false,
  error: null,

  // Dialog Actions
  openAddDialog: () => set({ isAddDialogOpen: true }),
  closeAddDialog: () => set({ isAddDialogOpen: false, error: null }),
  openEditDialog: (book) => set({ isEditDialogOpen: true, selectedBook: book }),
  closeEditDialog: () => set({ isEditDialogOpen: false, selectedBook: null, error: null }),
  openDeleteDialog: (book) => set({ isDeleteDialogOpen: true, selectedBook: book }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false, selectedBook: null, error: null }),

  // Book Operations
  fetchBooks: async (params) => {
    try {
      set({ isLoading: true, error: null })
      // ถ้าไม่มี params ใหม่ ใช้ params เดิม
      const queryParams = params || get().currentParams
      
      // ปรับ params ก่อนส่งไป API
      const apiParams: BookQueryParams = {
        ...queryParams,
        // ถ้า genre เป็น 'all' ให้เป็น undefined
        genre: queryParams?.genre === 'all' ? undefined : queryParams?.genre
      }
      
      const response = await getBooks(apiParams)
      set({ 
        books: response.data,
        meta: response.meta,
        // เก็บ params ที่ยังไม่ได้แปลงไว้ (เพื่อให้ UI แสดงค่าถูกต้อง)
        currentParams: queryParams
      })
    } catch (error) {
      set({ error: 'Failed to fetch books' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  addBook: async (book) => {
    try {
      set({ isLoading: true, error: null })
      await createBook(book)
      // Fetch updated list with current params
      await get().fetchBooks()
      set({ isAddDialogOpen: false })
    } catch (error) {
      set({ error: 'Failed to add book' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  editBook: async (id, book) => {
    try {
      set({ isLoading: true, error: null })
      await updateBook(id, book)
      // Fetch updated list with current params
      await get().fetchBooks()
      set({ isEditDialogOpen: false, selectedBook: null })
    } catch (error) {
      set({ error: 'Failed to update book' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  removeBook: async (id) => {
    try {
      set({ isLoading: true, error: null })
      await deleteBook(id)
      // Fetch updated list with current params
      await get().fetchBooks()
      set({ isDeleteDialogOpen: false, selectedBook: null })
    } catch (error) {
      set({ error: 'Failed to delete book' })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  // Reset Error
  resetError: () => set({ error: null })
}))