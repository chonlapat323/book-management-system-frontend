'use client'

import { useMemo } from 'react'
import { Calendar, Edit, Trash2, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book } from '@/app/types/book'

interface BookCardProps {
  book: Book
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
}

const gradients = [
  //"from-blue-500/20 to-purple-500/20",
  'from-pink-500/20 to-rose-500/20',
  // "from-emerald-500/20 to-teal-500/20",
  // "from-cyan-500/20 to-blue-500/20",
  // "from-gray-500/20 to-slate-500/20",
  // "from-indigo-500/20 to-purple-500/20",
  // "from-amber-500/20 to-orange-500/20",
  // "from-lime-500/20 to-green-500/20",
  // "from-violet-500/20 to-fuchsia-500/20",
]

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  // Generate a gradient based on genre and memoize it
  const gradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length)
    return gradients[randomIndex]
  }, []) // Empty deps array means this will be calculated once per component instance

  return (
    <Card className="group h-full overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:from-gray-900 dark:to-gray-800/50">
      {/* Book Cover Placeholder with Gradient */}
      <div
        className={`h-32 bg-gradient-to-br ${gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute right-3 bottom-3 left-3">
          <div className="truncate text-xs font-medium text-white/90">
            {book.genre}
          </div>
        </div>
      </div>

      <CardHeader className="pt-4 pb-3">
        <CardTitle className="group-hover:text-primary line-clamp-2 text-lg leading-tight font-bold transition-colors">
          {book.title}
        </CardTitle>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <User className="h-3 w-3" />
          <span className="font-medium">{book.author}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3" />
            <span className="font-medium">{book.published_year}</span>
          </div>
          {book.genre && (
            <Badge
              variant="secondary"
              className="from-primary/10 to-primary/5 text-primary border-primary/20 bg-gradient-to-r text-xs font-medium"
            >
              {book.genre}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {onEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(book)}
              className="hover:bg-primary hover:text-primary-foreground group/btn h-9 flex-1 cursor-pointer text-xs font-medium transition-all duration-200"
            >
              <Edit className="mr-1.5 h-3 w-3 transition-transform group-hover/btn:scale-110" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(book)}
              className="hover:bg-destructive hover:border-destructive group/btn h-9 flex-1 cursor-pointer text-xs font-medium transition-all duration-200 hover:text-white"
            >
              <Trash2 className="mr-1.5 h-3 w-3 transition-transform group-hover/btn:scale-110" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
