import { useEffect, useRef } from 'react'

import type { BookQueryParams } from '@/app/types/book'

import { useBookStore } from '../store/books'

// Hook สำหรับดึงรายการหนังสือ
export function useBooks(params?: BookQueryParams) {
  const { books, meta, isLoading, error, fetchBooks } = useBookStore()

  // เก็บ params ปัจจุบันไว้ใน ref เพื่อใช้ตอน refetch
  const currentParams = useRef(params)

  useEffect(() => {
    currentParams.current = params
    fetchBooks(params)
  }, [
    fetchBooks,
    params?.page,
    params?.limit,
    params?.search,
    params?.genre,
    params?.author,
  ])

  return {
    data: {
      data: books,
      meta: meta || {
        total: 0,
        page: params?.page || 1,
        limit: params?.limit || 10,
      },
    },
    isLoading,
    isError: !!error,
    error,
    // ใช้ params ที่เก็บไว้ตอน refetch
    refetch: () => fetchBooks(currentParams.current),
  }
}
