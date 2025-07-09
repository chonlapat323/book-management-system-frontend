import type {
  ApiResponse,
  Book,
  BookQueryParams,
  CreateBookDto,
  UpdateBookDto,
} from '@/app/types/book'

import { api } from './axios'

// ดึงรายการหนังสือ
export async function getBooks(params?: BookQueryParams) {
  const response = await api.get<ApiResponse<Book[]>>('/books', { params })
  return response.data
}

// ดึงข้อมูลหนังสือตาม ID
export async function getBook(id: number) {
  const response = await api.get<ApiResponse<Book>>(`/books/${id}`)
  return response.data
}

// เพิ่มหนังสือใหม่
export async function createBook(data: CreateBookDto) {
  const response = await api.post<ApiResponse<Book>>('/books', data)
  return response.data
}

// แก้ไขข้อมูลหนังสือ
export async function updateBook(id: number, data: UpdateBookDto) {
  const response = await api.patch<ApiResponse<Book>>(`/books/${id}`, data)
  return response.data
}

// ลบหนังสือ
export async function deleteBook(id: number) {
  const response = await api.delete<ApiResponse<void>>(`/books/${id}`)
  return response.data
}
