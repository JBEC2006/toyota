'use client'

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
  search: string
  onSearch: (v: string) => void
  activeCategory: string | null
  onCategory: (cat: string) => void
  availableCategories: string[]
  featuredOnly: boolean
  onFeaturedToggle: () => void
  onClear: () => void
}

export function SearchFilter({
  search,
  onSearch,
  activeCategory,
  onCategory,
  availableCategories,
  featuredOnly,
  onFeaturedToggle,
  onClear,
}: Props) {
  const hasActiveFilter = search !== '' || activeCategory !== null || featuredOnly

  return (
    <div
      id="catalog"
      className="flex flex-col gap-4 mb-8 sticky top-16 z-30
                 bg-toyota-black/95 backdrop-blur-sm pt-4 pb-4 -mx-4 px-4"
    >
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-toyota-charcoal border border-white/10 rounded-xl
                     pl-10 pr-4 py-3 text-sm text-white placeholder-white/30
                     outline-none focus:border-toyota-red transition-colors"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => onCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-display
                          font-bold uppercase tracking-wider transition-all duration-200
                          ${isActive
                            ? 'bg-toyota-red text-white shadow-glow-red'
                            : 'bg-toyota-charcoal text-white/60 hover:text-white hover:bg-white/10'
                          }`}
            >
              {CATEGORY_LABELS[cat] ?? cat.replace(/-/g, ' ')}
            </button>
          )
        })}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={onFeaturedToggle}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs
                      font-display font-bold uppercase tracking-wider border
                      transition-all duration-200
                      ${featuredOnly
                        ? 'bg-toyota-red border-toyota-red text-white'
                        : 'border-white/20 text-white/50 hover:border-toyota-red hover:text-white'
                      }`}
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Destacados
        </button>

        {hasActiveFilter && (
          <button
            onClick={onClear}
            className="text-xs text-white/40 hover:text-white transition-colors underline
                       underline-offset-2"
          >
            Ver todos
          </button>
        )}
      </div>
    </div>
  )
}
