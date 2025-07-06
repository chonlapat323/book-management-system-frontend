"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Trash2, User } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  genre: string
  publicationYear: number
  description?: string
}

interface BookCardProps {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (book: Book) => void
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  // Generate a gradient based on genre
  const getRandomGradient = () => {
    const gradients = [
      "from-blue-500/20 to-purple-500/20",
      "from-pink-500/20 to-rose-500/20",
      "from-emerald-500/20 to-teal-500/20",
      "from-cyan-500/20 to-blue-500/20",
      "from-gray-500/20 to-slate-500/20",
      "from-indigo-500/20 to-purple-500/20",
      "from-amber-500/20 to-orange-500/20",
      "from-lime-500/20 to-green-500/20",
      "from-violet-500/20 to-fuchsia-500/20",
    ]
    
    const randomIndex = Math.floor(Math.random() * gradients.length)
    return gradients[randomIndex]
  }

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Book Cover Placeholder with Gradient */}
      <div className={`h-32 bg-gradient-to-br ${getRandomGradient()} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {/* <div className="absolute top-3 right-3">
          <Sparkles className="h-4 w-4 text-white/70" />หกด
        </div> */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white/90 text-xs font-medium truncate">{book.genre}</div>
        </div>
      </div>

      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {book.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-3 w-3" />
          <span className="font-medium">{book.author}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20"
          >
            {book.genre}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="font-medium">{book.publicationYear}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(book)}
            className="flex-1 h-9 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 group/btn cursor-pointer"
          >
            <Edit className="h-3 w-3 mr-1.5 group-hover/btn:scale-110 transition-transform" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(book)}
            className="flex-1 h-9 text-xs font-medium hover:bg-destructive hover:text-white hover:border-destructive transition-all duration-200 group/btn cursor-pointer"
          >
            <Trash2 className="h-3 w-3 mr-1.5 group-hover/btn:scale-110 transition-transform " />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
