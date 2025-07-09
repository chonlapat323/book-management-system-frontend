import { BookOpen, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <BookOpen className="text-muted-foreground mb-4 h-16 w-16" />
      <h3 className="text-foreground mb-2 text-lg font-semibold">
        No books found
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {
          'There are no books matching your current filters. Try adjusting your search or add some new books.'
        }
      </p>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Your First Book
      </Button>
    </div>
  )
}
