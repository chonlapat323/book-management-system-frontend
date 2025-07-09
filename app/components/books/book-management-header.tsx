'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { ThemeToggle } from '../theme-toggle'

interface BookManagementHeaderProps {
  onAddBook: () => void
}

export function BookManagementHeader({ onAddBook }: BookManagementHeaderProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Book Management
              </h1>
              <p className="text-muted-foreground">
                Manage your book collection
              </p>
            </div>
            <ThemeToggle />
          </div>
          <Button onClick={onAddBook} className="cursor-pointer md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add New Book
          </Button>
        </div>
      </div>
    </header>
  )
}
