import { useEffect, useState } from 'react'

const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useMediaQuery(breakpoint: keyof typeof tailwindBreakpoints) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const query = `(min-width: ${tailwindBreakpoints[breakpoint]}px)`
        const media = window.matchMedia(query)
        
        if (media.matches !== matches) {
        setMatches(media.matches)
        }

        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)
        
        return () => media.removeEventListener('change', listener)
    }, [matches, breakpoint])

    return matches
}