"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface BookManagementHeaderProps {
  onAddBook: () => void
}

export function BookManagementHeader({ onAddBook }: BookManagementHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Book Management</h1>
            <p className="text-muted-foreground">Manage your book collection</p>
          </div>
          <Button onClick={onAddBook} className="md:w-auto cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Button>
        </div>
      </div>
    </header>
  )
}
