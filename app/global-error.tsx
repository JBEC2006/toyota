'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="es">
      <body style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', fontFamily: 'sans-serif' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Algo salió mal
        </p>
        <button
          onClick={reset}
          style={{ background: '#EB0A1E', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          Reintentar
        </button>
      </body>
    </html>
  )
}
