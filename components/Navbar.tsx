'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import type { Section } from '@/types/product'

const TOP_NAV: { label: string; value: Section }[] = [
  { label: 'Ver todo',     value: 'ver-todo' },
  { label: 'Colección GR', value: 'gr' },
]

const MODEL_SECTIONS: { label: string; value: Section }[] = [
  { label: 'Corolla Cross', value: 'corolla-cross' },
  { label: 'Yaris Cross',   value: 'yaris-cross' },
  { label: 'Hilux',         value: 'hilux' },
  { label: 'Corolla',       value: 'corolla' },
  { label: 'Yaris',         value: 'yaris' },
]

interface Props {
  activeSection: Section
  onSectionChange: (s: Section) => void
  search: string
  onSearch: (v: string) => void
}

export function Navbar({ activeSection, onSectionChange, search, onSearch }: Props) {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [modelsOpen, setModelsOpen] = useState(false)
  const [flash, setFlash]           = useState(false)
  const inputRef           = useRef<HTMLInputElement>(null)
  const modelsRef          = useRef<HTMLLIElement>(null)
  const mobileModelsRef    = useRef<HTMLLIElement>(null)

  const isModelActive = MODEL_SECTIONS.some((m) => m.value === activeSection)

  useEffect(() => {
    function handler(e: PointerEvent) {
      const target = e.target as Node
      const inDesktop = modelsRef.current?.contains(target)
      const inMobile  = mobileModelsRef.current?.contains(target)
      if (!inDesktop && !inMobile) setModelsOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

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
            src="/logo-ayax.svg"
            alt="Ayax Toyota"
            width={213}
            height={19}
            priority
            className="h-5 w-auto"
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {TOP_NAV.map((item) => {
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

          {/* Modelos dropdown */}
          <li ref={modelsRef} className="relative">
            <button
              onClick={() => setModelsOpen((v) => !v)}
              className={`px-3 py-1.5 rounded-full text-xs font-display font-bold
                         uppercase tracking-wider transition-all duration-200
                         flex items-center gap-1 touch-manipulation
                         ${isModelActive
                           ? 'bg-toyota-red text-white'
                           : 'text-white/70 hover:text-white hover:bg-toyota-charcoal'
                         }`}
            >
              Modelos
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${modelsOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {modelsOpen && (
              <div className="absolute top-full mt-2 left-0 z-50
                              bg-toyota-charcoal border border-white/10
                              rounded-xl shadow-xl overflow-hidden min-w-max">
                {MODEL_SECTIONS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => { onSectionChange(m.value); setModelsOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5
                                text-xs font-display font-bold uppercase tracking-wider
                                transition-colors duration-150
                                ${activeSection === m.value
                                  ? 'text-toyota-red bg-white/5'
                                  : 'text-white/70 hover:text-white hover:bg-white/5'
                                }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right: search + hamburger */}
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
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors touch-manipulation"
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
            {TOP_NAV.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => { onSectionChange(item.value); setMenuOpen(false) }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm
                             font-display font-bold uppercase tracking-wider transition-all
                             ${activeSection === item.value
                               ? 'bg-toyota-red text-white'
                               : 'text-white/70 hover:text-white hover:bg-white/5'
                             }`}
                >
                  {item.label}
                </button>
              </li>
            ))}

            {/* Modelos accordion */}
            <li ref={mobileModelsRef}>
              <button
                onClick={() => setModelsOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm
                           font-display font-bold uppercase tracking-wider transition-all
                           touch-manipulation
                           ${isModelActive
                             ? 'text-toyota-red'
                             : 'text-white/70 hover:text-white hover:bg-white/5'
                           }`}
              >
                Modelos
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${modelsOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {modelsOpen && (
                <ul className="ml-4 mt-1 flex flex-col gap-0.5">
                  {MODEL_SECTIONS.map((m) => (
                    <li key={m.value}>
                      <button
                        onClick={() => {
                          onSectionChange(m.value)
                          setMenuOpen(false)
                          setModelsOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-xs
                                   font-display font-bold uppercase tracking-wider transition-all
                                   ${activeSection === m.value
                                     ? 'bg-toyota-red text-white'
                                     : 'text-white/60 hover:text-white hover:bg-white/5'
                                   }`}
                      >
                        {m.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
