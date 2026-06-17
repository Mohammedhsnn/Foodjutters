import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal/legal-document'
import { getTermsSections } from '@/lib/legal/terms-sections'
import { pageMetadata } from '@/lib/site/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Algemene voorwaarden',
  description:
    'Algemene voorwaarden van FoodJutters voor uw bezoek, reserveringen, prijzen, huisregels en aansprakelijkheid.',
  path: '/algemene-voorwaarden',
})

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Juridisch"
      title="Algemene voorwaarden"
      subtitle="De voorwaarden die gelden bij uw bezoek aan FoodJutters en bij reserveringsaanvragen via onze website."
      sections={getTermsSections()}
    />
  )
}
