export default function Page() {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        {/* การ์ดพื้นฐาน */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Tailwind CSS Test
          </h1>
          
          {/* ปุ่มหลายสี */}
          <div className="space-x-4">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Blue Button
            </button>
            <button className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Green Button
            </button>
            <button className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Red Button
            </button>
          </div>
  
          {/* Flexbox & Grid */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="flex h-20 items-center justify-center rounded-md bg-purple-200">
              Grid 1
            </div>
            <div className="flex h-20 items-center justify-center rounded-md bg-pink-200">
              Grid 2
            </div>
            <div className="flex h-20 items-center justify-center rounded-md bg-yellow-200">
              Grid 3
            </div>
          </div>
  
          {/* Responsive Design */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 sm:text-base md:text-lg lg:text-xl">
              Responsive Text
            </p>
          </div>
  
          {/* Hover & Focus Effects */}
          <div className="mt-6">
            <input 
              type="text" 
              placeholder="Focus me!"
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Animation */}
          <div className="mt-6">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent">
            </div>
          </div>
        </div>
      </div>
    )
  }