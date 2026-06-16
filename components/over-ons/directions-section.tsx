import Link from 'next/link'
import { IconArrowRight, IconMapPin, tablerProps } from '@/lib/site/icons'
import {
  FOODJUTTERS_LOCATION,
  PARKING_LOCATIONS,
  googleMapsEmbedUrl,
  googleMapsLink,
  type MapLocation,
} from '@/lib/site/locations'
import type { SiteSettingsProps } from '@/lib/cms/settings'

function MapEmbed({
  location,
  title,
  className = '',
  zoom,
}: {
  location: MapLocation
  title: string
  className?: string
  zoom?: number
}) {
  return (
    <div
      className={`flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5 sm:px-4 min-w-0">
        <p className="min-w-0 font-display text-[11px] sm:text-xs uppercase tracking-wide text-brand-navy truncate">
          {title}
        </p>
        <a
          href={googleMapsLink(location)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[10px] sm:text-xs font-semibold text-primary hover:underline"
        >
          Openen
        </a>
      </div>
      <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden bg-muted/40">
        <iframe
          title={`Kaart: ${title}`}
          src={googleMapsEmbedUrl(location, zoom)}
          className="absolute inset-0 h-full w-full max-w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export function DirectionsSection({ settings }: { settings: SiteSettingsProps }) {
  return (
    <section
      id="routebeschrijving"
      className="overflow-x-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background border-t border-border/60 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto w-full min-w-0">
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <p className="label-vintage text-primary text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-1.5 sm:mb-2">
            Kom langs
          </p>
          <h2 className="font-display uppercase tracking-tight text-brand-dark text-balance text-[1.35rem] leading-[1.08] sm:text-3xl md:text-4xl sm:leading-[0.95]">
            Routebeschrijving & parkeren
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 sm:gap-8 items-start mb-8 sm:mb-10 min-w-0">
          <div className="lg:col-span-3 min-w-0 w-full">
            <MapEmbed location={FOODJUTTERS_LOCATION} title="FoodJutters" zoom={16} />
          </div>

          <div className="lg:col-span-2 flex min-w-0 w-full flex-col gap-4 sm:gap-5">
            <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-primary">
                  <IconMapPin {...tablerProps(16)} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark mb-1">Adres</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {settings.addressLine1}
                    <br />
                    {settings.addressLine2}
                  </p>
                </div>
              </div>
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Route in Google Maps <IconArrowRight {...tablerProps(14)} />
              </a>
            </div>

            <div className="rounded-xl border border-border/80 bg-muted/30 p-5 sm:p-6">
              <h3 className="font-display text-xs uppercase tracking-wide text-brand-navy mb-3">Parkeren</h3>
              <div className="flex flex-col gap-3 text-sm text-foreground/70 leading-relaxed">
                <p>
                  Parkeren op de <strong className="font-semibold text-brand-dark">Scheldekade</strong> in Terneuzen:
                  betaald parkeren, maar na 18:00 uur, op zondag en op feestdagen is parkeren gratis.
                </p>
                <p>
                  Parkeergarages <strong className="font-semibold text-brand-dark">Theaterplein</strong> en{' '}
                  <strong className="font-semibold text-brand-dark">Oostkolk</strong>: de eerste 2 uur gratis,
                  daarna €&nbsp;1,60 per uur.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="label-vintage text-muted-foreground text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-4 sm:mb-5 text-center">
            Parkeerlocaties in de buurt
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
            {PARKING_LOCATIONS.map((spot) => (
              <MapEmbed key={spot.id} location={spot} title={spot.name} />
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center px-1">
          <Link
            href="/contact"
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-primary text-white font-semibold px-5 py-3 sm:px-8 sm:py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-xs sm:text-sm leading-snug text-center"
          >
            <span>Vragen over bereikbaarheid?</span>
            <span className="inline-flex items-center gap-1.5">
              Neem contact op
              <IconArrowRight {...tablerProps(16)} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
