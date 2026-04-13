'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      inner.style.left = `${mouseX}px`
      inner.style.top = `${mouseY}px`
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-hover]')
      if (isInteractive) {
        outer.classList.add('hover')
        inner.classList.add('hover')
      } else {
        outer.classList.remove('hover')
        inner.classList.remove('hover')
      }
    }

    const animate = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      outer.style.left = `${outerX}px`
      outer.style.top = `${outerY}px`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  )
}
