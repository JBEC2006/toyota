'use client'

import { useState, useMemo, useEffect } from 'react'
import { SearchFilter } from './SearchFilter'
import { ProductGrid } from './ProductGrid'
import type { Product, Section, SortOrder } from '@/types/product'

const SECTION_LABELS: Record<string, string> = {
  'gr':            'Colección GR',
  'corolla-cross': 'Corolla Cross',
  'yaris-cross':   'Yaris Cross',
}

const CATEGORY_LABELS: Record<string, string> = {
  'indumentaria':  'Indumentaria',
  'merchandising': 'Merchandising',
}

function sortPriority(p: Product): number {
  if (p.section === 'gr' && p.category === 'indumentaria') return 0
  if (p.section === 'gr' && p.category === 'merchandising') return 1
  if (p.section === 'gr') return 2
  if (p.section === 'corolla-cross') return 3
  if (p.section === 'yaris-cross') return 4
  return 5
}

function defaultSort(a: Product, b: Product): number {
  const diff = sortPriority(a) - sortPriority(b)
  if (diff !== 0) return diff
  const nameDiff = (a.name ?? '').localeCompare(b.name ?? '', 'es')
  if (nameDiff !== 0) return nameDiff
  return (a.price ?? 0) - (b.price ?? 0)
}

interface Props {
  products: Product[]
  activeSection: Section
  onSectionChange: (s: Section) => void
  search: string
}

export function CatalogShell({ products, activeSection, onSectionChange, search }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('default')

  useEffect(() => {
    setActiveCategory(null)
    setSortOrder('default')
  }, [activeSection])

  const sectionProducts = useMemo(() => {
    if (activeSection === 'ver-todo') return products
    return products.filter((p) => p.section === activeSection)
  }, [products, activeSection])

  const filtered = useMemo(() => {
    const base = sectionProducts.filter((p) => {
      const matchSearch =
        search === '' || p.name.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        activeCategory === null ||
        (activeSection === 'ver-todo'
          ? p.section === activeCategory
          : p.category === activeCategory)
      return matchSearch && matchFilter
    })

    if (sortOrder === 'default') {
      return [...base].sort(defaultSort)
    }

    const dir = sortOrder === 'price-asc' ? 1 : -1
    return [...base].sort((a, b) => {
      const ac = a.currency === 'USD' ? 1 : 0
      const bc = b.currency === 'USD' ? 1 : 0
      if (ac !== bc) return ac - bc
      return dir * ((a.price ?? 0) - (b.price ?? 0))
    })
  }, [sectionProducts, search, activeCategory, activeSection, sortOrder])

  return (
    <section className="px-4 py-10 max-w-screen-xl mx-auto">
      <SearchFilter
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
        hasCategoryFilter={activeSection === 'gr'}
        sortOrder={sortOrder}
        onSort={setSortOrder}
      />
      <ProductGrid products={filtered} />
    </section>
  )
}
