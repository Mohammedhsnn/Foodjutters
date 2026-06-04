import localFont from 'next/font/local'

/** Zware display-titels (zoals BINNEKORT OPEN / PLANK op social) */
export const gestard = localFont({
  src: '../app/fonts/Gestard.ttf',
  variable: '--font-gestard',
  display: 'swap',
  weight: '400',
})

/** Typewriter-labels & subtitels (Paviljoen aan de Schelde) */
export const specialElite = localFont({
  src: '../app/fonts/SpecialElite-Regular.ttf',
  variable: '--font-special-elite',
  display: 'swap',
  weight: '400',
})

/**
 * Steelworks Vintage Demo — Burntilldead / DaFont
 * https://www.dafont.com/steelworks.font
 */
export const steelworksVintage = localFont({
  src: '../app/fonts/SteelworksVintageDemo.ttf',
  variable: '--font-steelworks',
  display: 'swap',
  weight: '400',
  adjustFontFallback: false,
})
