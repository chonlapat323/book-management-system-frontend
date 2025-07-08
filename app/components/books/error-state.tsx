'use client'

import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  onRetry?: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="text-destructive mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
      <p className="text-muted-foreground mb-4">
        An error occurred while loading the books.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try again
        </Button>
      )}
    </div>
  )
}
