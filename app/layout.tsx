"use client"
import { AddBookDialog } from './components/books/add-book-dialog'
import { BookManagementHeader } from "./components/books/book-management-header"
import "./globals.css"
import { useBookStore } from "./store/books"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { openAddDialog } = useBookStore()

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <BookManagementHeader onAddBook={openAddDialog} />
        {children}
        <AddBookDialog />
      </body>
    </html>
  )
}