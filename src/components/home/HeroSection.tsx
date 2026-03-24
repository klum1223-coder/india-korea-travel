import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #1B3A5C 0%, #0f2540 40%, #1a3352 70%, rgba(27,58,92,0.92) 100%)',
      }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, #E8732A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4A843 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-accent text-sm font-semibold tracking-wide uppercase">
            Educational Travel
          </span>
          <span className="text-white/60 text-xs">•</span>
          <span className="text-white/70 text-sm">India → Korea</span>
        </div>

        {/* Main headline */}
        <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-5xl mx-auto mb-6">
          Korea Educational Immersion Program{' '}
          <span className="text-secondary">for Indian Students</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Where Ancient Traditions Meet Cutting-Edge Innovation
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center font-semibold transition-colors duration-200 bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 shadow-lg px-7 py-3.5 text-lg rounded-xl"
          >
            Explore Packages
          </Link>
          <Link
            href="/for-schools"
            className="inline-flex items-center justify-center font-semibold transition-colors duration-200 border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary px-7 py-3.5 text-lg rounded-xl"
          >
            Request a Proposal
          </Link>
        </div>

        {/* Quick stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: '50+', label: 'Schools Trust Us' },
            { value: '1000+', label: 'Students Transformed' },
            { value: '4.9/5', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-poppins text-2xl md:text-3xl font-bold text-secondary">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z"
            fill="#F8F6F3"
          />
        </svg>
      </div>
    </section>
  )
}
