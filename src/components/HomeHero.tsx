import Image from 'next/image'

export default function HomeHero() {
  return (
    <section className="hero-shell hero-shell--photo" data-scroll-panel>
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        className="hero-photo"
        sizes="100vw"
      />
      <div className="hero-photo-overlay" aria-hidden="true" />
      <div className="hero-copy">
        <h1 className="hero-wordmark">LEGIONS</h1>
        <p className="hero-line">For the youth who inspire</p>
      </div>
    </section>
  )
}
