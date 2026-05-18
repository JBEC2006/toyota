'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import type { Section } from '@/types/product'

const NAV_ITEMS: { label: string; value: Section }[] = [
  { label: 'Ver todo',      value: 'ver-todo' },
  { label: 'Colección GR',  value: 'gr' },
  { label: 'Corolla Cross', value: 'corolla-cross' },
  { label: 'Yaris Cross',   value: 'yaris-cross' },
]

interface Props {
  activeSection: Section
  onSectionChange: (s: Section) => void
  search: string
  onSearch: (v: string) => void
}

export function Navbar({ activeSection, onSectionChange, search, onSearch }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [flash, setFlash] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFlash(true)
      setTimeout(() => setFlash(false), 500)
    }
  }

  return (
    <nav className="bg-toyota-black border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={() => onSectionChange('ver-todo')} className="flex-shrink-0">
          <Image
            src="/logo-white.png"
            alt="Toyota Gazoo Racing Uruguay"
            width={130}
            height={42}
            priority
            className="h-10 w-auto"
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.value
            return (
              <li key={item.value}>
                <button
                  onClick={() => onSectionChange(item.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-display font-bold
                             uppercase tracking-wider transition-all duration-200
                             ${isActive
                               ? 'bg-toyota-red text-white'
                               : 'text-white/70 hover:text-white hover:bg-toyota-charcoal'
                             }`}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Right: search always visible + hamburger */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center bg-toyota-charcoal border rounded-full
                           transition-all duration-300
                           ${flash
                             ? 'border-toyota-red shadow-[0_0_12px_rgba(235,10,30,0.6)]'
                             : 'border-white/20 hover:border-toyota-red/60 hover:shadow-[0_0_8px_rgba(235,10,30,0.25)]'
                           }`}>
            <input
              ref={inputRef}
              type="search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent pl-4 pr-1 py-1.5 text-sm text-white
                         placeholder-white/40 outline-none w-32 md:w-52
                         transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.focus()}
              aria-label="Buscar"
              className="pr-3 pl-1 text-white/40 hover:text-white/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-toyota-charcoal border-t border-white/10 px-4 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.value
              return (
                <li key={item.value}>
                  <button
                    onClick={() => { onSectionChange(item.value); setMenuOpen(false) }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm
                               font-display font-bold uppercase tracking-wider
                               transition-all
                               ${isActive
                                 ? 'bg-toyota-red text-white'
                                 : 'text-white/70 hover:text-white hover:bg-white/5'
                               }`}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
