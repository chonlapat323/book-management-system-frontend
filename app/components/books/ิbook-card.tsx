"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Filter, Trash2 } from "lucide-react"

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
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {book.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground font-medium">{book.author}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <Badge variant="secondary" className="text-xs">
            {book.genre}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{book.publicationYear}</span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(book)} className="flex-1 h-8 text-xs">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(book)}
            className="flex-1 h-8 text-xs hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
