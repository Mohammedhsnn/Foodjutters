/** Decoratieve animaties voor de homepage-hero — wijzigt geen bestaande hero-inhoud. */
export function HeroAmbience() {
  return (
    <div className="hero-ambience pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      <div className="hero-shimmer" />
      <span className="hero-orb hero-orb-1" />
      <span className="hero-orb hero-orb-2" />
      <span className="hero-orb hero-orb-3" />
      <span className="hero-orb hero-orb-4" />
      <span className="hero-sparkle hero-sparkle-1" />
      <span className="hero-sparkle hero-sparkle-2" />
      <span className="hero-sparkle hero-sparkle-3" />
      <p className="hero-whisper hero-whisper-1">smullen</p>
      <p className="hero-whisper hero-whisper-2">borrelen</p>
      <p className="hero-whisper hero-whisper-3">genieten</p>
      <svg
        className="hero-waves"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="hero-wave-path hero-wave-path-a"
          d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,56 L1440,120 L0,120 Z"
          fill="currentColor"
        />
        <path
          className="hero-wave-path hero-wave-path-b"
          d="M0,80 C200,40 400,100 720,72 C1040,44 1240,88 1440,64 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
