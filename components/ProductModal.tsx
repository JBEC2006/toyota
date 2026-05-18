'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Product } from '@/types/product'

const CATEGORY_LABELS: Record<string, string> = {
  'indumentaria':  'Indumentaria',
  'merchandising': 'Merchandising',
}

interface Props {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const images = product.images ?? []

  const handleClose = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [handleClose])

  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0))
  const next = () => setActiveIndex((i) => Math.min(i + 1, images.length - 1))

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX)

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const delta = touchStart - e.changedTouches[0].clientX
    if (delta > 50) next()
    if (delta < -50) prev()
    setTouchStart(null)
  }

  const activeImage = images[activeIndex]
  const imageUrl = activeImage
    ? urlFor(activeImage).width(1200).height(900).auto('format').fit('max').url()
    : null

  const categoryLabel =
    (product.category && CATEGORY_LABELS[product.category]) ??
    product.category?.replace(/-/g, ' ') ??
    ''

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={handleClose}
    >
      <div
        className="relative bg-toyota-charcoal rounded-2xl w-full max-w-4xl
                   max-h-[90vh] overflow-y-auto
                   grid md:grid-cols-2
                   shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 z-10 p-2 rounded-full
                     bg-black/50 text-white/60 hover:text-white hover:bg-black/80
                     transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image gallery */}
        <div
          className="relative aspect-square bg-[#111] overflow-hidden
                     rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={activeImage?.alt ?? product.name}
              fill
              priority
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10">
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Imagen anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2
                           p-2 rounded-full bg-black/50 text-white
                           hover:bg-black/80 disabled:opacity-20
                           transition-all"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={activeIndex === images.length - 1}
                aria-label="Imagen siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2
                           p-2 rounded-full bg-black/50 text-white
                           hover:bg-black/80 disabled:opacity-20
                           transition-all"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Imagen ${i + 1}`}
                  className={`rounded-full transition-all duration-200
                    ${i === activeIndex
                      ? 'bg-toyota-red w-4 h-2'
                      : 'bg-white/40 w-2 h-2 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <span className="absolute top-3 left-3 bg-black/60 text-white/70
                             text-xs px-2 py-0.5 rounded-full font-sans">
              {activeIndex + 1} / {images.length}
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="p-6 md:p-8 flex flex-col gap-4">
          {categoryLabel && (
            <p className="text-toyota-red text-xs font-display font-bold
                          uppercase tracking-[0.2em]">
              {categoryLabel}
            </p>
          )}

          <h2 className="font-display font-black uppercase text-white
                         text-2xl md:text-3xl leading-tight tracking-wide">
            {product.name}
          </h2>

          {product.price != null && (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">
                {product.currency === 'USD'
                  ? `U$S ${product.price.toLocaleString('es-UY')}`
                  : `$${product.price.toLocaleString('es-UY')}`}
              </span>
              <span className="text-sm text-white/40 font-sans">IVA INC</span>
            </div>
          )}

          {product.description && (
            <p className="text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3">
            {product.available ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/30
                               text-emerald-400 rounded-full text-xs font-display font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Disponible
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5
                               text-white/30 rounded-full text-xs font-display font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                No disponible
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
