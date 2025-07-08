'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface YearPickerProps {
  year: number | null
  onYearChange: (year: number | null) => void
  fromYear?: number
  toYear?: number
  className?: string
}

export function YearPicker({
  year,
  onYearChange,
  fromYear = 1000,
  toYear = new Date().getFullYear(),
  className,
}: YearPickerProps) {
  const [decade, setDecade] = React.useState(() => {
    if (year) {
      return Math.floor(year / 10) * 10
    }
    const currentYear = new Date().getFullYear()
    return Math.floor(currentYear / 10) * 10
  })

  const years = React.useMemo(() => {
    const years: number[] = []
    // แก้ไขตรงนี้ ให้ loop แค่ถึงปีปัจจุบัน
    for (let i = decade; i <= Math.min(decade + 9, toYear); i++) {
      if (i >= fromYear) {
        years.push(i)
      }
    }
    return years
  }, [decade, fromYear, toYear])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDecade((d) => Math.max(fromYear, d - 10))}
          disabled={decade <= fromYear}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">
          {decade} - {Math.min(decade + 9, toYear)}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setDecade((d) => Math.min(toYear - (toYear % 10), d + 10))
          }
          disabled={decade >= toYear - (toYear % 10)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[200px] rounded-md border">
        <div className="grid grid-cols-3 gap-2 p-2">
          {years.map((y) => (
            <Button
              key={y}
              variant={year === y ? 'default' : 'outline'}
              className="w-full"
              onClick={() => onYearChange(y)}
            >
              {y}
            </Button>
          ))}
        </div>
      </ScrollArea>
      {year && (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={() => onYearChange(null)}>
            ล้างค่า
          </Button>
        </div>
      )}
    </div>
  )
}
