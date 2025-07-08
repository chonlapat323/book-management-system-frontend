'use client'

import { ThemeProvider } from 'next-themes'

import { BookManagementHeader } from './components/books/book-management-header'

import './globals.css'

import { useBookStore } from './store/books'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { openAddDialog } = useBookStore()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-background min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BookManagementHeader onAddBook={openAddDialog} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
