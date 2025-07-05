"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedGenre: string
  onGenreChange: (genre: string) => void
  selectedAuthor: string
  onAuthorChange: (author: string) => void
  genres: string[]
  authors: string[]
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedAuthor,
  onAuthorChange,
  genres,
  authors,
}: SearchAndFiltersProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books or authors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
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
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAuthor} onValueChange={onAuthorChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map((author) => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
