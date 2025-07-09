import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'], // เพิ่ม domains ที่อนุญาตให้โหลดรูปได้
  },
}

export default nextConfig
