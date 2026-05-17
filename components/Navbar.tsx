'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const links = [
    { label: 'Gorros', href: '#catalog' },
    { label: 'Camperas', href: '#catalog' },
    { label: 'Chombas', href: '#catalog' },
    { label: 'Bolsos', href: '#catalog' },
    { label: 'Accesorios', href: '#catalog' },
  ]

  return (
    <nav className="bg-toyota-black border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-white.png"
            alt="Toyota Gazoo Racing Uruguay"
            width={130}
            height={42}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-display font-bold
                           uppercase tracking-wider text-white/70
                           hover:text-white hover:bg-toyota-charcoal
                           transition-all duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search bar (expands on click) */}
          <div className="flex items-center">
            {searchOpen && (
              <input
                autoFocus
                type="search"
                placeholder="Buscar..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => {
                  if (!searchValue) setSearchOpen(false)
                }}
                className="bg-toyota-charcoal border border-white/20 rounded-l-full
                           px-4 py-1.5 text-sm text-white placeholder-white/40
                           outline-none focus:border-toyota-red transition-colors
                           w-40 md:w-56"
              />
            )}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar"
              className={`p-2 text-white/70 hover:text-white transition-colors
                         ${searchOpen ? 'bg-toyota-charcoal rounded-r-full border border-l-0 border-white/20' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>
          </div>

          {/* Hamburger (mobile only) */}
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
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-display font-bold
                             uppercase tracking-wider text-white/70
                             hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
