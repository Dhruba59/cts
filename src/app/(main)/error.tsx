'use client' // Error components must be Client Components
 
import Button from '@/components/ui/button'
import { appInsights } from '@/service/appInsights-service'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  // need to implement application insight
  useEffect(() => {
    // Log the error to an error reporting service
    //TrackTrace
    appInsights.trackException({ error: error, severityLevel: 1 })
    console.table(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}