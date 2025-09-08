import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function EventsLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-32" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar grid skeleton */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mb-6">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>

          {/* Upcoming events skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
