import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const initHeroAnimation = (heroElement: HTMLElement | Element | null, imageElement: HTMLElement | Element | null) => {
  if (!heroElement || !imageElement) return

  gsap.fromTo(
    imageElement,
    { scale: 1.05 },
    { scale: 1, duration: 1.5, ease: 'power3.out' }
  )
}

export const initTextReveal = (container: HTMLElement | Element | null) => {
  if (!container) return

  const elements = container.querySelectorAll('.reveal-text')
  
  if (elements.length === 0) return

  gsap.fromTo(
    elements,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true
      },
    }
  )
}

export const initParallaxDrift = (bgElement: HTMLElement | Element | null, fgElement: HTMLElement | Element | null) => {
  if (!bgElement || !fgElement) return

  gsap.to(bgElement, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: fgElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export const initBentoHover = (cardElement: HTMLElement | Element | null, imageElement: HTMLElement | Element | null) => {
  if (!cardElement || !imageElement) return

  cardElement.addEventListener('mouseenter', () => {
    gsap.to(imageElement, { scale: 1.05, duration: 0.6, ease: 'power2.out' })
    gsap.to(cardElement, { borderColor: 'rgba(63, 224, 197, 0.4)', duration: 0.4 })
  })

  cardElement.addEventListener('mouseleave', () => {
    gsap.to(imageElement, { scale: 1, duration: 0.6, ease: 'power2.out' })
    gsap.to(cardElement, { borderColor: 'rgba(255, 255, 255, 0.15)', duration: 0.4 })
  })
}
