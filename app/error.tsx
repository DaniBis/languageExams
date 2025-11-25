"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App route error', error)
  }, [error])

  return (
    <section className="container mx-auto max-w-3xl min-h-[60vh] px-6 py-20 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-poppins font-bold text-gray-900">We could not load this page</h1>
      <p className="mt-3 text-gray-600">
        The page reload should resolve it automatically. If the issue persists, please refresh or head back home.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-gray-400">Error reference: {error.digest}</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button onClick={reset} className="rounded-full bg-soft-blue px-6 py-2 text-white">
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline" className="rounded-full border-gray-200 px-6 py-2 text-gray-700">
            Back to homepage
          </Button>
        </Link>
      </div>
    </section>
  )
}
