import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal/legal-document'
import { LEGAL_LAST_UPDATED } from '@/lib/legal/company'
import { getPrivacySections } from '@/lib/legal/privacy-sections'
import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Privacybeleid',
  description:
    'Lees hoe FoodJutters omgaat met uw persoonsgegevens volgens de AVG, onder meer bij contact en groepsreserveringen.',
  path: '/privacybeleid',
})

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Juridisch"
      title="Privacybeleid"
      subtitle="Transparantie over welke gegevens wij verzamelen, waarom wij dat doen en welke rechten u heeft."
      lastUpdated={LEGAL_LAST_UPDATED}
      sections={getPrivacySections()}
    />
  )
}
