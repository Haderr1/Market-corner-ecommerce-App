import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function CardsLoading() {
  return (
    <div>
      <Card className="w-full max-w-xs">
        <CardHeader>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="aspect-video w-full" />
        </CardContent>
        <CardFooter>
            <Skeleton className="h-8 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}
