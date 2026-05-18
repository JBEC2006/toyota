export function HeroBanner() {
  return (
    <section className="relative w-full h-[42vh] min-h-[280px] bg-toyota-black overflow-hidden flex items-center justify-center">

      {/* Red diagonal accent */}
      <div className="absolute inset-0 diagonal-accent opacity-75" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),' +
            'repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)',
        }}
      />

      {/* Toyota emblem watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 270 186"
          className="w-[62vw] md:w-[38vw] max-w-[440px] opacity-[0.09]"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer ring */}
          <path
            fillRule="evenodd"
            d="M 4,93 A 131,90 0 1,1 266,93 A 131,90 0 1,1 4,93 Z M 20,93 A 115,74 0 1,0 250,93 A 115,74 0 1,0 20,93 Z"
          />
          {/* T crossbar */}
          <ellipse cx="135" cy="72" rx="88" ry="35" />
          {/* T stem */}
          <ellipse cx="135" cy="106" rx="29" ry="79" />
        </svg>
      </div>

      {/* Animated red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-toyota-red opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 select-none flex flex-col items-center">
        <p className="font-display font-bold uppercase tracking-[0.5em] text-white/40 text-[10px] md:text-xs mb-3">
          Toyota
        </p>

        <h1 className="font-display font-black uppercase leading-none tracking-tight text-white text-5xl md:text-7xl lg:text-8xl">
          Accesorios
        </h1>

        <div className="mt-4 mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-toyota-red/60" />
          <span className="font-display font-bold uppercase tracking-[0.4em] text-toyota-red text-[10px]">
            Uruguay
          </span>
          <span className="h-px w-8 bg-toyota-red/60" />
        </div>

        <p className="font-sans uppercase tracking-[0.35em] text-white/25 text-[9px] md:text-[10px]">
          Accesorios&nbsp;·&nbsp;Indumentaria&nbsp;·&nbsp;Equipamiento
        </p>
      </div>

    </section>
  )
}
