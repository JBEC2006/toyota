'use client'

import { useState, useMemo, useEffect } from 'react'
import { SearchFilter } from './SearchFilter'
import { ProductGrid } from './ProductGrid'
import type { Product, Section } from '@/types/product'

const SECTION_LABELS: Record<string, string> = {
  'gr':            'Colección GR',
  'corolla-cross': 'Corolla Cross',
  'yaris-cross':   'Yaris Cross',
}

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
  products: Product[]
  activeSection: Section
  search: string
}

export function CatalogShell({ products, activeSection, search }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    setActiveCategory(null)
  }, [activeSection])

  const sectionProducts = useMemo(() => {
    if (activeSection === 'ver-todo') return products
    return products.filter((p) => p.section === activeSection)
  }, [products, activeSection])

  const filterPills = useMemo(() => {
    if (activeSection === 'ver-todo') {
      return (['gr', 'corolla-cross', 'yaris-cross'] as const)
        .filter((s) => products.some((p) => p.section === s))
        .map((s) => ({ value: s, label: SECTION_LABELS[s] }))
    }
    const seen = new Set<string>()
    const result: Array<{ value: string; label: string }> = []
    for (const p of sectionProducts) {
      if (p.category && !seen.has(p.category)) {
        seen.add(p.category)
        result.push({
          value: p.category,
          label: CATEGORY_LABELS[p.category] ?? p.category.replace(/-/g, ' '),
        })
      }
    }
    return result
  }, [products, activeSection, sectionProducts])

  const filtered = useMemo(() => {
    return sectionProducts.filter((p) => {
      const matchSearch =
        search === '' || p.name.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        activeCategory === null ||
        (activeSection === 'ver-todo'
          ? p.section === activeCategory
          : p.category === activeCategory)
      return matchSearch && matchFilter
    })
  }, [sectionProducts, search, activeCategory, activeSection])

  return (
    <section className="px-4 py-10 max-w-screen-xl mx-auto">
      <SearchFilter
        filterPills={filterPills}
        activeCategory={activeCategory}
        onCategory={(cat) => setActiveCategory((prev) => (prev === cat ? null : cat))}
        onClear={() => setActiveCategory(null)}
      />
      <ProductGrid products={filtered} />
    </section>
  )
}
