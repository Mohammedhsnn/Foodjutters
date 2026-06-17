/** Juridische bedrijfsgegevens — vul KVK/BTW aan zodra beschikbaar. */
export const LEGAL_COMPANY = {
  tradeName: 'FoodJutters',
  legalForm: 'horecabedrijf',
  addressLine1: 'Scheldeboulevard 7',
  addressLine2: '4531 EJ Terneuzen',
  city: 'Terneuzen',
  country: 'Nederland',
  email: 'info@foodjutters.nl',
  phone: '+31 6 13449728',
  /** Optioneel — wordt op de pagina alleen getoond indien ingevuld */
  kvk: '',
  btw: '',
} as const

export const LEGAL_LAST_UPDATED = '16 juni 2026'

export function formatLegalAddress(): string {
  return `${LEGAL_COMPANY.addressLine1}, ${LEGAL_COMPANY.addressLine2}`
}

export function kvkLine(): string | null {
  if (!LEGAL_COMPANY.kvk.trim()) return null
  return `KVK-nummer: ${LEGAL_COMPANY.kvk}`
}

export function btwLine(): string | null {
  if (!LEGAL_COMPANY.btw.trim()) return null
  return `BTW-identificatienummer: ${LEGAL_COMPANY.btw}`
}
