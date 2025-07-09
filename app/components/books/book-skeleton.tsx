import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BookSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      {/* Book Cover Skeleton */}
      <div className="relative h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        {/* <div className="absolute top-3 right-3">
          <Skeleton className="h-4 w-4 rounded-full" />
        </div> */}
        <div className="absolute right-3 bottom-3 left-3">
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <CardHeader className="pt-4 pb-3">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}
