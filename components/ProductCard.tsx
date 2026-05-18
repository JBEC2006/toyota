'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Product } from '@/types/product'

const CATEGORY_LABELS: Record<string, string> = {
  'gorros-de-visera':  'Gorros Visera',
  'gorros-de-lana':    'Gorros Lana',
  'bufandas':          'Bufandas',
  'camperas':          'Camperas',
  'chombas':           'Chombas',
  'bolsos-y-mochilas': 'Bolsos y Mochilas',
  'billeteras':        'Billeteras',
  'porta-netbook':     'Porta Netbook',
  'llaveros':          'Llaveros',
  'porta-llaves':      'Porta Llaves',
  'botellas':          'Botellas',
  'libros':            'Libros',
  'paraguas':          'Paraguas',
  'puzzles':           'Puzzles',
  'otros':             'Otros',
}

interface Props {
  product: Product
  onClick: (product: Product) => void
}

export function ProductCard({ product, onClick }: Props) {
  const firstImage = product.images?.[0]
  const imageUrl = firstImage
    ? urlFor(firstImage).width(600).height(600).auto('format').fit('crop').url()
    : null

  const categoryLabel =
    (product.category && CATEGORY_LABELS[product.category]) ??
    product.category?.replace(/-/g, ' ') ??
    ''

  return (
    <article
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
      aria-label={`Ver detalles de ${product.name}`}
      className="group cursor-pointer bg-toyota-charcoal rounded-2xl overflow-hidden
                 border border-white/5
                 hover:border-toyota-red/60 hover:shadow-glow-red
                 transition-all duration-300 outline-none
                 focus-visible:ring-2 focus-visible:ring-toyota-red"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-[#111] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={firstImage?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/10">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-display uppercase tracking-wider">Sin imagen</span>
          </div>
        )}

        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-2.5 left-2.5 bg-toyota-red text-white
                           text-[10px] font-display font-bold uppercase tracking-wider
                           px-2 py-0.5 rounded-full shadow-lg">
            Destacado
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {categoryLabel && (
          <p className="text-toyota-red text-[10px] font-display font-bold uppercase
                        tracking-widest mb-1">
            {categoryLabel}
          </p>
        )}

        <h3 className="font-display font-bold uppercase text-white text-sm md:text-base
                       leading-tight line-clamp-2 tracking-wide">
          {product.name}
        </h3>

        {product.price != null && (
          <p className="mt-2 text-white font-bold text-base">
            {product.currency === 'USD'
              ? `U$S ${product.price.toLocaleString('es-UY')}`
              : `$${product.price.toLocaleString('es-UY')}`}{' '}
            <span className="text-white/40 text-xs font-normal">IVA INC</span>
          </p>
        )}
      </div>
    </article>
  )
}
