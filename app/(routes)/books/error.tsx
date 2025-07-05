'use client' // ต้องใส่บรรทัดนี้เสมอ

interface ErrorProps {
  error: Error
  reset: () => void // ฟังก์ชันที่ Next.js ให้มาสำหรับ retry
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          เกิดข้อผิดพลาด
        </h2>
        
        {/* แสดงข้อความ error ถ้าอยู่ใน development mode */}
        {process.env.NODE_ENV === 'development' && (
          <p className="mb-4 text-gray-600">{error.message}</p>
        )}
        
        <button
          onClick={reset}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </div>
  )
}