"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global app error', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Unexpected error</p>
          <h1 className="mt-4 text-3xl font-poppins font-bold text-gray-900">We are reloading the app for you</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Something interrupted the rendering process. The page will try to refresh automatically, but you can also retry manually using the buttons below.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-gray-400">Error reference: {error.digest}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={reset} className="rounded-full bg-soft-blue px-6 py-2 text-white">
              Reload app
            </Button>
            <Link href="/">
              <Button variant="outline" className="rounded-full border-gray-200 px-6 py-2 text-gray-700">
                Go home safely
              </Button>
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
