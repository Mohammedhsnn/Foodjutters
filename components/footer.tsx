import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { BrandName } from '@/components/brand-name'
import { Logo } from '@/components/logo'
import type { SiteSettingsProps } from '@/components/site-chrome'

export function Footer({ settings }: { settings: SiteSettingsProps }) {
  const openDays = settings.openingHours.filter((r) => r.hours !== 'Gesloten')

  return (
    <footer className="brand-surface-navy text-white">
      <div className="h-1 bg-primary w-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex w-fit" aria-label="FoodJutters – naar de homepage">
              <Logo size="sm" layout="row" variant="light" />
            </Link>
            <p className="text-white/55 leading-relaxed text-sm max-w-xs">{settings.footerTagline}</p>
            <div className="flex gap-3 mt-1">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FoodJutters op Instagram"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FoodJutters op Facebook"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm text-primary mb-4 uppercase tracking-wide">Navigatie</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/over-ons', label: 'Over ons' },
                { href: '/menu', label: 'Menu' },
                { href: '/impressie', label: 'Impressie' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/55 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm text-primary mb-4 uppercase tracking-wide">Contact</h3>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3 text-sm text-white/55">
                <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                <span>
                  {settings.addressLine1}
                  <br />
                  {settings.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Phone size={14} className="text-primary shrink-0" />
                <a href={`tel:${settings.phoneTel}`} className="hover:text-primary transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/55">
                <Mail size={14} className="text-primary shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-primary transition-colors break-all">
                  {settings.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-1">
                Openingstijden
              </p>
              {openDays.length > 0 ? (
                openDays.map((row) => (
                  <p key={row.day} className="text-sm text-white/55">
                    {row.day}: {row.hours}
                  </p>
                ))
              ) : (
                <p className="text-sm text-white/55">{settings.hoursDisplay}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-xs min-h-[2.5rem]">
          <p className="text-white/35 shrink-0 text-center sm:text-left">
            &copy; {new Date().getFullYear()}{' '}
            <BrandName className="text-inherit tracking-normal" variant="light" />. Alle rechten voorbehouden.
          </p>
          <p className="text-white/35 sm:mx-auto text-center whitespace-nowrap">
            Gerealiseerd door{' '}
            <a
              href="https://www.articxsoftware.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              Articx Software
            </a>
          </p>
          <div className="flex shrink-0 gap-4 sm:gap-5 sm:ml-auto">
            <Link href="/contact" className="text-white/35 hover:text-primary transition-colors whitespace-nowrap">
              Privacybeleid
            </Link>
            <Link href="/contact" className="text-white/35 hover:text-primary transition-colors whitespace-nowrap">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
