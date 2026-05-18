'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-toyota-black flex flex-col items-center justify-center gap-6 px-4 text-center">
      <Image
        src="/logo-white.png"
        alt="Toyota Gazoo Racing Uruguay"
        width={200}
        height={66}
        className="h-12 w-auto opacity-50"
      />
      <p className="font-display font-bold uppercase tracking-widest text-white/30 text-sm">
        Algo salió mal
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-toyota-red text-white rounded-full
                   font-display font-bold uppercase tracking-wider text-sm
                   hover:bg-red-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}
