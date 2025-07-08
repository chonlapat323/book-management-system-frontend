// Book type
export interface Book {
  id: number
  title: string
  author: string
  published_year: number
  genre: string | null
}

// Query Parameters
export interface BookQueryParams {
  page?: number
  limit?: number
  search?: string
  genre?: string
  author?: string
}

// API Response format
export interface ApiResponse<T> {
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Error Response
export interface ApiError {
  statusCode: number
  error: string
  message: string
  requestId: string
}

// Create Book DTO
export interface CreateBookDto {
  title: string
  author: string
  published_year: number
  genre: string | null
}

// Update Book DTO
export interface UpdateBookDto {
  title?: string
  author?: string
  published_year?: number
  genre?: string | null
}
