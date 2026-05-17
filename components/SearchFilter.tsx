'use client'

interface Props {
  filterPills: Array<{ value: string; label: string }>
  activeCategory: string | null
  onCategory: (cat: string) => void
  onClear: () => void
}

export function SearchFilter({ filterPills, activeCategory, onCategory, onClear }: Props) {
  if (filterPills.length === 0) return null

  return (
    <div
      id="catalog"
      className="flex flex-col gap-3 mb-8 sticky top-16 z-30
                 bg-toyota-black/95 backdrop-blur-sm pt-4 pb-4 -mx-4 px-4"
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5 items-center">
        {filterPills.map((pill) => {
          const isActive = activeCategory === pill.value
          return (
            <button
              key={pill.value}
              onClick={() => onCategory(pill.value)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-display
                          font-bold uppercase tracking-wider transition-all duration-200
                          ${isActive
                            ? 'bg-toyota-red text-white shadow-glow-red'
                            : 'bg-toyota-charcoal text-white/60 hover:text-white hover:bg-white/10'
                          }`}
            >
              {pill.label}
            </button>
          )
        })}

        {activeCategory !== null && (
          <button
            onClick={onClear}
            className="flex-shrink-0 text-xs text-white/40 hover:text-white
                       transition-colors underline underline-offset-2 ml-1"
          >
            Ver todos
          </button>
        )}
      </div>
    </div>
  )
}
