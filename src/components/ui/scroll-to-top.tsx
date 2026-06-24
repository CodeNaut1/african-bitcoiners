'use client'

import { ChevronUp } from 'lucide-react'
import * as React from 'react'

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white shadow-elevated hover:bg-brand-secondary transition-colors duration-200"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}

export { ScrollToTop }
