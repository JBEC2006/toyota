'use client'

import { useState, useMemo } from 'react'
import { SearchFilter } from './SearchFilter'
import { ProductGrid } from './ProductGrid'
import type { Product } from '@/types/product'

interface Props {
  products: Product[]
}

export function CatalogShell({ products }: Props) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const availableCategories = useMemo(() => {
    const seen = new Set<string>()
    const result: string[] = []
    for (const p of products) {
      if (p.category && !seen.has(p.category)) {
        seen.add(p.category)
        result.push(p.category)
      }
    }
    return result
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        search === '' || p.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === null || p.category === category
      const matchFeatured = !featuredOnly || p.featured === true
      return matchSearch && matchCategory && matchFeatured
    })
  }, [products, search, category, featuredOnly])

  return (
    <section className="px-4 py-10 max-w-screen-xl mx-auto">
      <SearchFilter
        search={search}
        onSearch={setSearch}
        activeCategory={category}
        onCategory={(cat) =>
          setCategory((prev) => (prev === cat ? null : cat))
        }
        availableCategories={availableCategories}
        featuredOnly={featuredOnly}
        onFeaturedToggle={() => setFeaturedOnly((v) => !v)}
        onClear={() => {
          setSearch('')
          setCategory(null)
          setFeaturedOnly(false)
        }}
      />
      <ProductGrid products={filtered} />
    </section>
  )
}
