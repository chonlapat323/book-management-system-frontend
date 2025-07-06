"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { BookManagementHeader } from "./components/books/book-management-header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <BookManagementHeader onAddBook={() => setAddDialogOpen(true)} />
        {children}

        {/* Add Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>Add a new book to your collection.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">Add form would go here...</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddDialogOpen(false)}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </body>
    </html>
  );
}