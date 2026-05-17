import Image from 'next/image'

export function HeroBanner() {
  return (
    <section className="relative w-full h-[58vh] min-h-[380px] bg-toyota-black overflow-hidden flex items-center justify-center">
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

      {/* Animated red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-toyota-red opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 select-none flex flex-col items-center">
        <Image
          src="/logo-white.png"
          alt="Toyota Gazoo Racing Uruguay"
          width={420}
          height={280}
          priority
          className="w-[260px] md:w-[360px] lg:w-[420px] h-auto drop-shadow-2xl"
        />

        <p className="mt-6 font-sans text-sm md:text-base text-white/60 uppercase tracking-[0.25em]">
          Colección Oficial Uruguay
        </p>

        <div className="mt-4 flex justify-center">
          <span className="inline-block h-0.5 w-16 bg-toyota-red rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
