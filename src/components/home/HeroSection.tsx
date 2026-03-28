import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      aria-label="Hero — Korea Educational Immersion Program for Indian Students"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/hero/seoul-skyline.jpg"
        alt="Seoul cityscape at night"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(27,58,92,0.9) 0%, rgba(45,95,138,0.8) 25%, rgba(27,58,92,0.85) 50%, rgba(45,95,138,0.8) 75%, rgba(27,58,92,0.9) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden="true"
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 82%, #E8732A 0%, transparent 48%), radial-gradient(circle at 82% 18%, #D4A843 0%, transparent 48%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Decorative ring (top-right) */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10 opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
          <span className="text-accent text-sm font-semibold tracking-wide uppercase">
            Educational Travel
          </span>
          <span className="text-white/80 text-xs" aria-hidden="true">•</span>
          <span className="text-white/85 text-sm">India → Korea</span>
        </div>

        {/* Main headline */}
        <h1
          className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-5xl mx-auto mb-6 animate-fade-in-up"
          style={{ animationDelay: '60ms' }}
        >
          Korea{' '}
          <span
            className="gradient-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #D4A843, #E8C76A, #F5D78E)' }}
          >
            Educational Immersion
          </span>{' '}
          Program{' '}
          <span className="text-secondary">for Indian Students</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '120ms' }}
        >
          Where Ancient Traditions Meet Cutting-Edge Innovation
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: '180ms' }}
        >
          <Link
            href="/packages"
            className="inline-flex items-center justify-center font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:scale-[1.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-primary px-7 py-3.5 text-lg rounded-xl [background-image:linear-gradient(135deg,#E8732A,#D4A843)] [background-size:200%_200%] [background-position:0%_0%] hover:[background-position:100%_100%]"
          >
            Explore Packages
          </Link>
          <Link
            href="/for-schools"
            className="inline-flex items-center justify-center font-semibold transition-all duration-200 border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-primary px-7 py-3.5 text-lg rounded-xl"
          >
            Request a Proposal
          </Link>
        </div>

        {/* Quick stats row */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in-up"
          style={{ animationDelay: '240ms' }}
        >
          {[
            { value: '50+', label: 'Schools Trust Us' },
            { value: '1000+', label: 'Students Transformed' },
            { value: '4.9/5', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-poppins text-2xl md:text-3xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-white/85 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
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
