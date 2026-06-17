/** Normaliseer zichtbare tekst: geen em dash, en dash of middot als scheiding. */
export function sanitizeVisibleCopy(text: string): string {
  return text
    .replace(/\s*—\s*/g, ', ')
    .replace(/(\d{1,2}:\d{2})\s*[–—]\s*(\d{1,2}:\d{2})/g, '$1 tot $2')
    .replace(/\b(Dinsdag)\s*[–—]\s*(zondag)\b/gi, '$1 t/m $2')
    .replace(/\b(Di)\s*[–—]\s*(Zo|zo)\b/g, (_, di, zo) => `${di} t/m ${zo.toLowerCase()}`)
    .replace(/\s*·\s*/g, ', ')
    .replace(/\s*[–—]\s*/g, ' tot ')
    .replace(/\bKnus & warm\b/gi, 'Warm & sfeervol')
    .replace(/\bKnus aan de bar\b/gi, 'Gezellig aan de bar')
    .replace(/,\s*,/g, ',')
    .replace(/\.\s*\./g, '.')
    .trim()
}
