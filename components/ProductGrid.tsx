'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import type { Product } from '@/types/product'

interface Props {
  products: Product[]
}

export function ProductGrid({ products }: Props) {
  const [selected, setSelected] = useState<Product | null>(null)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <svg
          className="h-16 w-16 text-white/10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-display font-bold uppercase text-white/30 text-lg tracking-wider">
          No encontramos productos con esos filtros.
        </p>
        <p className="text-white/20 text-sm font-sans">
          Probá con otra categoría o limpiar los filtros.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={setSelected}
          />
        ))}
      </div>

      {selected && (
        <ProductModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
