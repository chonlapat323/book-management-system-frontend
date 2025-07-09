import axios from 'axios'

import type { ApiError } from '@/app/types/book'

// สร้าง axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.paodev.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
})
console.log(process.env.NEXT_PUBLIC_API_URL)
// Log requests
api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 [API] ${config.method?.toUpperCase()} ${config.url}`,
      config.params || {}
    )
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Log responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API] Response:`, response.config.url, response.data)
    return response
  },
  (error) => {
    const apiError: ApiError = error.response?.data || {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
      requestId: 'unknown',
    }
    console.error(`❌ [API] Error:`, error.config.url, apiError)
    return Promise.reject(apiError)
  }
)
