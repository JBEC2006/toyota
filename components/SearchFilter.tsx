'use client'

import { useRef, useEffect, useState } from 'react'
import type { Section, SortOrder } from '@/types/product'

const SECTION_OPTIONS: { label: string; value: Section }[] = [
  { label: 'Todas las secciones', value: 'ver-todo' },
  { label: 'Colección GR',        value: 'gr' },
  { label: 'Corolla Cross',       value: 'corolla-cross' },
  { label: 'Yaris Cross',         value: 'yaris-cross' },
]

const CATEGORY_OPTIONS = [
  { label: 'Todas',         value: null },
  { label: 'Indumentaria',  value: 'indumentaria' },
  { label: 'Merchandising', value: 'merchandising' },
]

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: 'Por defecto',         value: 'default' },
  { label: 'Precio: menor a mayor', value: 'price-asc' },
  { label: 'Precio: mayor a menor', value: 'price-desc' },
]

interface DropdownProps<T> {
  label: string
  options: { label: string; value: T }[]
  value: T
  onChange: (v: T) => void
}

function Dropdown<T>({ label, options, value, onChange }: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = options.find((o) => o.value === value)

  useEffect(() => {
    function handler(e: PointerEvent) {
      if (e.target && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl
                   bg-toyota-charcoal border border-white/10
                   text-xs font-display font-bold uppercase tracking-wider
                   text-white/80 hover:text-white hover:border-white/25
                   transition-all duration-200 whitespace-nowrap touch-manipulation"
      >
        <span className={active?.value !== (options[0]?.value as unknown) ? 'text-toyota-red' : ''}>
          {active?.label ?? label}
        </span>
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 z-40
                        bg-toyota-charcoal border border-white/10
                        rounded-xl shadow-xl overflow-hidden min-w-max">
          {options.map((opt) => {
            const isActive = opt.value === value
            return (
              <button
                key={String(opt.value)}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`block w-full text-left px-4 py-2.5
                            text-xs font-display font-bold uppercase tracking-wider
                            transition-colors duration-150
                            ${isActive
                              ? 'text-toyota-red bg-white/5'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface Props {
  activeSection: Section
  onSectionChange: (s: Section) => void
  activeCategory: string | null
  onCategory: (cat: string | null) => void
  hasCategoryFilter: boolean
  sortOrder: SortOrder
  onSort: (s: SortOrder) => void
  onReset: () => void
}

export function SearchFilter({
  activeSection, onSectionChange,
  activeCategory, onCategory,
  hasCategoryFilter,
  sortOrder, onSort,
  onReset,
}: Props) {
  const hasActiveFilters =
    activeSection !== 'ver-todo' || activeCategory !== null || sortOrder !== 'default'

  return (
    <div
      id="catalog"
      className="flex flex-wrap gap-2 mb-8 sticky top-16 z-30
                 bg-toyota-black pt-4 pb-4 -mx-4 px-4"
    >
      <Dropdown
        label="Sección"
        options={SECTION_OPTIONS}
        value={activeSection}
        onChange={onSectionChange}
      />

      {hasCategoryFilter && (
        <Dropdown
          label="Categoría"
          options={CATEGORY_OPTIONS}
          value={activeCategory}
          onChange={onCategory}
        />
      )}

      <Dropdown
        label="Ordenar"
        options={SORT_OPTIONS}
        value={sortOrder}
        onChange={onSort}
      />

      {hasActiveFilters && (
        <button
          onClick={onReset}
          aria-label="Limpiar filtros"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                     border border-white/10 text-white/40
                     hover:text-toyota-red hover:border-toyota-red/40
                     transition-all duration-200"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span className="text-xs font-display font-bold uppercase tracking-wider">
            Limpiar
          </span>
        </button>
      )}
    </div>
  )
}
