export default function Loading() {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="relative">
          {/* กลุ่มของ dots ที่หมุน */}
          <div className="relative h-32 w-32">
            {/* Dot 1 */}
            <div className="absolute h-4 w-4 animate-[bounce_1s_infinite]">
              <div className="h-full w-full rounded-full bg-blue-500 opacity-90" />
            </div>
            
            {/* Dot 2 */}
            <div className="absolute h-4 w-4 animate-[bounce_1s_infinite_0.1s]" style={{ left: '45%' }}>
              <div className="h-full w-full rounded-full bg-blue-400 opacity-80" />
            </div>
            
            {/* Dot 3 */}
            <div className="absolute h-4 w-4 animate-[bounce_1s_infinite_0.2s]" style={{ left: '90%' }}>
              <div className="h-full w-full rounded-full bg-blue-300 opacity-70" />
            </div>
            
            {/* แถวล่าง */}
            <div className="absolute bottom-0 h-4 w-4 animate-[bounce_1s_infinite_0.3s]">
              <div className="h-full w-full rounded-full bg-blue-500 opacity-60" />
            </div>
            
            <div className="absolute bottom-0 h-4 w-4 animate-[bounce_1s_infinite_0.4s]" style={{ left: '45%' }}>
              <div className="h-full w-full rounded-full bg-blue-400 opacity-50" />
            </div>
            
            <div className="absolute bottom-0 h-4 w-4 animate-[bounce_1s_infinite_0.5s]" style={{ left: '90%' }}>
              <div className="h-full w-full rounded-full bg-blue-300 opacity-40" />
            </div>
          </div>
          
          {/* ข้อความ */}
          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-gray-600">กำลังโหลด</p>
            <div className="flex justify-center space-x-1 mt-2">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-[bounce_0.5s_infinite]" />
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-[bounce_0.5s_infinite_0.1s]" />
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-[bounce_0.5s_infinite_0.2s]" />
            </div>
          </div>
        </div>
      </div>
    )
  }