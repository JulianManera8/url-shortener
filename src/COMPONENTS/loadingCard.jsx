/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/COMPONENTS/ui/card"
import { Loader2 } from "lucide-react"

export default function LoadingCard({msg}) {
  return (
    <Card className="w-full max-w-md mx-auto mt-32">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-center">
          {msg ? msg : 'Loading content...'}
        </p>
        <p className="text-sm text-muted-foreground text-center">
          Were preparing your content. This may take a few moments.
        </p>
      </CardContent>
    </Card>
  )
}

