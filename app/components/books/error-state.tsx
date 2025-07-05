"use client"

import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

interface ErrorStateProps {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <BookOpen className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load books</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        {"There was an error loading your books. Please try again."}
      </p>
      <Button onClick={onRetry} variant="outline">
        Try Again
      </Button>
    </div>
  )
}
