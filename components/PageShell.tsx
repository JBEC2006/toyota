'use client'

import { useState } from 'react'
import { Navbar } from './Navbar'
import { HeroBanner } from './HeroBanner'
import { CatalogShell } from './CatalogShell'
import type { Product, Section } from '@/types/product'

interface Props {
  products: Product[]
}

export function PageShell({ products }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('ver-todo')
  const [search, setSearch] = useState('')

  const handleSearch = (value: string) => {
    setSearch(value)
    if (value) setActiveSection('ver-todo')
  }

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    setSearch('')
  }

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        search={search}
        onSearch={handleSearch}
      />
      <HeroBanner />
      <CatalogShell
        products={products}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        search={search}
      />
    </>
  )
}
