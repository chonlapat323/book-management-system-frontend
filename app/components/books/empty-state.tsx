import { Button } from "@/components/ui/button"
import { BookOpen, Plus } from "lucide-react"

export function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">No books found</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {"There are no books matching your current filters. Try adjusting your search or add some new books."}
      </p>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Book
      </Button>
    </div>
  )
}
