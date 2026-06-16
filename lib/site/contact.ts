export const DEFAULT_PHONE = '+31 6 13449728'
export const DEFAULT_PHONE_TEL = '+31613449728'

const STALE_PHONE_PATTERNS = [
  /\+31\s*\(0\)\s*320/,
  /320[\s.-]?00[\s.-]?00[\s.-]?00/,
  /\+31\s*10\s*123\s*4567/,
  /31320000000/,
  /\+31320000000/,
]

export function normalizePhone(phone: string | undefined | null): string {
  const trimmed = (phone ?? '').trim()
  if (!trimmed) return DEFAULT_PHONE
  if (STALE_PHONE_PATTERNS.some((pattern) => pattern.test(trimmed.replace(/\s/g, '')) || pattern.test(trimmed))) {
    return DEFAULT_PHONE
  }
  return trimmed
}

export function normalizePhoneTel(phoneTel: string | undefined | null): string {
  const trimmed = (phoneTel ?? '').trim().replace(/\s/g, '')
  if (!trimmed) return DEFAULT_PHONE_TEL
  if (STALE_PHONE_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return DEFAULT_PHONE_TEL
  }
  return trimmed
}
