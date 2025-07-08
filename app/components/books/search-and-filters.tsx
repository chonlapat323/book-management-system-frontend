"use client"

import { useDebounce } from "@/app/hooks/useDebounce"
import { BOOK_GENRES } from "@/app/store/books"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedGenre: string
  onGenreChange: (genre: string) => void
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
}: SearchAndFiltersProps) {
  // แยก local state สำหรับ input value
  const [inputValue, setInputValue] = useState(searchQuery)
  // debounce input value
  const debouncedValue = useDebounce(inputValue, 500)

  // เมื่อ debounced value เปลี่ยน ค่อยเรียก onSearchChange
  useEffect(() => {
    onSearchChange(debouncedValue)
  }, [debouncedValue, onSearchChange])

  // เมื่อ searchQuery (prop) เปลี่ยนจากภายนอก อัพเดท local state
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedGenre} onValueChange={onGenreChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {BOOK_GENRES.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
