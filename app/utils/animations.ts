import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initHeroAnimation = (heroRef: React.RefObject<HTMLElement | null>, imageRef: React.RefObject<HTMLImageElement | null>) => {
  if (!heroRef.current || !imageRef.current) return

  gsap.fromTo(
    imageRef.current,
    { scale: 1.05 },
    { scale: 1, duration: 1.5, ease: 'power3.out' }
  )
}

export const initTextReveal = (containerRef: React.RefObject<HTMLElement | null>) => {
  if (!containerRef.current) return

  const elements = containerRef.current.querySelectorAll('.reveal-up')
  
  gsap.fromTo(
    elements,
    { y: '100%' },
    {
      y: '0%',
      duration: 1,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
    }
  )
}

export const initParallaxDrift = (bgRef: React.RefObject<HTMLElement | null>, fgRef: React.RefObject<HTMLElement | null>) => {
  if (!bgRef.current || !fgRef.current) return

  gsap.to(bgRef.current, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: fgRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export const initBentoHover = (cardRef: React.RefObject<HTMLElement | null>, imageRef: React.RefObject<HTMLElement | null>) => {
  if (!cardRef.current || !imageRef.current) return

  cardRef.current.addEventListener('mouseenter', () => {
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.6, ease: 'power2.out' })
    gsap.to(cardRef.current, { borderColor: 'rgba(63, 224, 197, 0.4)', duration: 0.4 })
  })

  cardRef.current.addEventListener('mouseleave', () => {
    gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' })
    gsap.to(cardRef.current, { borderColor: 'rgba(255, 255, 255, 0.15)', duration: 0.4 })
  })
}
