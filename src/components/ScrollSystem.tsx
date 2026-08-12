'use client'

import { useEffect } from 'react'

export default function ScrollSystem() {
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let disposed = false
    let rafId = 0

    const run = async () => {
      const [{ default: gsap }, { default: ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('lenis'),
        ])

      if (disposed) return

      gsap.registerPlugin(ScrollTrigger)

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (reducedMotion) {
        ScrollTrigger.refresh()
        cleanup = () => {}
        return
      }

      const lenis = new Lenis({
        lerp: 0.075,
        wheelMultiplier: 0.9,
        smoothWheel: true,
      })

      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
      lenis.on('scroll', ScrollTrigger.update)

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-scroll-panel]').forEach((panel, index) => {
          gsap.fromTo(
            panel,
            { rotateX: index % 2 === 0 ? 6 : -6, y: 28, scale: 0.985 },
            {
              rotateX: 0,
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 82%',
                end: 'top 18%',
                scrub: true,
              },
            }
          )
        })

        gsap.utils.toArray<HTMLElement>('[data-scroll-title]').forEach((title) => {
          gsap.fromTo(
            title,
            { x: -18 },
            {
              x: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: title,
                start: 'top 88%',
                end: 'top 24%',
                scrub: true,
              },
            }
          )
        })
      })

      cleanup = () => {
        context.revert()
        lenis.destroy()
        cancelAnimationFrame(rafId)
      }
    }

    run()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return null
}
