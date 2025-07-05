import type { ApiError } from '@/app/types/book'
import axios from 'axios'

// สร้าง axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

// จัดการ error response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = error.response?.data || {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
      requestId: 'unknown',
    }
    return Promise.reject(apiError)
  }
)