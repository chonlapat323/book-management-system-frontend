export function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="relative">
        {/* วงนอก - หมุนช้ากว่า */}
        <div className="h-24 w-24 animate-[spin_2s_linear_infinite] rounded-full border-8 border-gray-200 border-t-blue-500" />

        {/* วงกลาง - หมุนเร็วขึ้น */}
        <div className="absolute top-1 left-1 h-22 w-22 animate-[spin_1.5s_linear_infinite] rounded-full border-6 border-gray-200 border-t-blue-400" />

        {/* วงใน - หมุนเร็วที่สุด */}
        <div className="absolute top-3 left-3 h-18 w-18 animate-[spin_1s_linear_infinite] rounded-full border-4 border-gray-200 border-t-blue-300" />

        {/* ข้อความ */}
        <div className="mt-8 text-center">
          <p className="animate-pulse text-gray-500">กำลังโหลด...</p>
        </div>
      </div>
    </div>
  )
}
