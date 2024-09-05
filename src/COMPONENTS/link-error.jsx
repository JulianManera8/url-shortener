import { Card, CardContent, CardFooter } from "@/COMPONENTS/ui/card"
import { Button } from "@/COMPONENTS/ui/button"
import { XCircle } from "lucide-react"
import {Link} from "react-router-dom"

export default function LinkError() {
  return (
    <Card className="w-full max-w-md mx-auto mt-32">
      <CardContent className="flex flex-col items-center justify-center pt-6 pb-4 space-y-4">
        <XCircle className="h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-bold text-center">Page Not Found</h1>
        <p className="text-center text-muted-foreground">
          Oops! This link does not exist! Try another one or contact whoever sent this link to you.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button asChild>
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}