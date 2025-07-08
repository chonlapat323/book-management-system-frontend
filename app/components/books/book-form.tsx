"use client"

import { Book, CreateBookDto } from "@/app/types/book"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { YearPicker } from "../ui/year-picker"

const bookFormSchema = z.object({
  title: z.string()
    .min(1, "กรุณากรอกชื่อหนังสือ")
    .max(255, "ชื่อหนังสือต้องไม่เกิน 255 ตัวอักษร"),
  author: z.string()
    .min(1, "กรุณากรอกชื่อผู้แต่ง")
    .max(255, "ชื่อผู้แต่งต้องไม่เกิน 255 ตัวอักษร"),
  genre: z.string().nullable(),
  published_year: z.number()
    .min(1000, "ปีที่พิมพ์ต้องมากกว่า 1000")
    .max(new Date().getFullYear(), "ปีที่พิมพ์ต้องไม่เกินปีปัจจุบัน"),
})

interface BookFormProps {
  book?: Book
  onSubmit: (data: CreateBookDto) => void
  genres: readonly string[]
  isSubmitting?: boolean
  error?: string | null
}

export function BookForm({ book, onSubmit, genres, isSubmitting, error }: BookFormProps) {
  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: book
      ? {
          title: book.title,
          author: book.author,
          genre: book.genre || null,
          published_year: book.published_year,
        }
      : {
          title: "",
          author: "",
          genre: null,
          published_year: new Date().getFullYear(), // ตั้งค่าเริ่มต้นเป็นปีปัจจุบัน
        },
  })

  const handleSubmit = (data: z.infer<typeof bookFormSchema>) => {
    const submitData: CreateBookDto = {
      title: data.title,
      author: data.author,
      genre: data.genre || null,
      published_year: data.published_year,
    }
    onSubmit(submitData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {error && (
          <div className="text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อหนังสือ</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อหนังสือ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ผู้แต่ง</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อผู้แต่ง" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="genre"
  render={({ field }) => (
    <FormItem>
      <FormLabel>ประเภท (ไม่บังคับ)</FormLabel>
      <Select 
        onValueChange={(value) => field.onChange(value === "none" ? null : value)} 
        value={field.value || "none"}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="เลือกประเภทหนังสือ" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="none">ไม่ระบุ</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="published_year"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>ปีที่พิมพ์</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                field.value
              ) : (
                <span>เลือกปีที่พิมพ์</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-3" align="start">
          <YearPicker
            year={field.value}
            onYearChange={field.onChange}
            fromYear={1000}
            toYear={new Date().getFullYear()}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )}
/>

        <div className="flex justify-end gap-4 pt-4 ">
          <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : book ? (
              "บันทึกการแก้ไข"
            ) : (
              "เพิ่มหนังสือ"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}