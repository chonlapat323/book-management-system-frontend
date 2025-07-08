import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // ตั้ง timer เพื่อ delay การอัพเดทค่า
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // cleanup timer เมื่อ value หรือ delay เปลี่ยน
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
