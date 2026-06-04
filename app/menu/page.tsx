import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Menu – FoodJutters',
  description: 'Ontdek het menu van FoodJutters. Verse gerechten, pizza\'s uit de houtoven en seizoensgebonden specialiteiten.',
}

const menuSections = [
  {
    id: 'starters',
    title: 'Voorgerechten',
    subtitle: 'Een heerlijke start van uw maaltijd',
    items: [
      { name: 'Garnalencocktail', description: 'Verse Hollandse garnalen, cocktailsaus, citroen', price: '12,50' },
      { name: 'Bruschetta uit de houtoven', description: 'Geroosterd zuurdesembrood, tomaat, basilicum, olijfolie', price: '9,50' },
      { name: 'Soep van de dag', description: 'Vraag de bediening naar de dagsoep', price: '8,50' },
      { name: 'Zalmtartaar', description: 'Verse zalm, kappertjes, rode ui, roggebrood', price: '14,50' },
      { name: 'Burrata', description: 'Verse burrata, tomaat, pijnboompitten, rucola, balsamico', price: '13,50' },
    ],
  },
  {
    id: 'pizza',
    title: "Pizza's uit de houtoven",
    subtitle: 'Ambachtelijk bereid op hoge temperatuur',
    items: [
      { name: 'Margherita', description: 'Tomatensaus, mozzarella, verse basilicum', price: '14,00' },
      { name: 'Jutters Special', description: 'Tomatensaus, mozzarella, salami, paprika, champignons, olijven', price: '17,50' },
      { name: 'Quattro Stagioni', description: 'Tomatensaus, ham, artisjokharten, champignons, olijven', price: '17,00' },
      { name: 'Tartufo', description: 'Truffelcrème, mozzarella, rucola, parmezaan, zwarte peper', price: '19,50' },
      { name: 'Seafood', description: 'Tomatensaus, garnalen, inktvis, knoflook, peterselie', price: '21,00' },
    ],
  },
  {
    id: 'main',
    title: 'Hoofdgerechten',
    subtitle: 'Grote gerechten voor een volledige maaltijd',
    items: [
      { name: 'Gegrilde zalmfilet', description: 'Verse zalm, seizoensgroenten, citroenboter, nieuwe aardappelen', price: '24,50' },
      { name: 'Ribeye (250g)', description: 'Droog-gerijpte ribeye, friet, salade, huismade peppersaus', price: '32,00' },
      { name: 'Gebakken kabeljauw', description: 'Kabeljauwfilet, romige risotto, groene asperges, citroensaus', price: '26,50' },
      { name: 'Chicken Milanese', description: 'Gepaneerde kip, rucola, kerstomaatjes, parmezaan', price: '21,50' },
      { name: 'Vegetarisch dagsuggestie', description: 'Vraag de bediening naar de vegetarische suggestie van de dag', price: '19,50' },
    ],
  },
  {
    id: 'dessert',
    title: 'Desserts',
    subtitle: 'Een zoete afsluiting van uw bezoek',
    items: [
      { name: 'Crème brûlée', description: 'Klassieke vanillecrème met gekarameliseerde suikerkorst', price: '9,00' },
      { name: 'Chocoladefondant', description: 'Warm chocoladetaartje, vanille-ijs, poedersuiker', price: '10,50' },
      { name: 'Seizoenssorbet', description: 'Drie bolletjes seizoensgebonden sorbet', price: '8,50' },
      { name: 'Kaasplankje', description: 'Selectie van Nederlandse en Franse kazen, vijgenjam, walnoten', price: '16,00' },
      { name: 'Tiramisu', description: 'Huisgemaakte tiramisu met espresso en amaretto', price: '9,50' },
    ],
  },
  {
    id: 'drinks',
    title: 'Dranken',
    subtitle: 'Wijnen, speciaalbieren en alcoholvrije opties',
    items: [
      { name: 'Huiswijn rood / wit / rosé (glas)', description: 'Selectie wisselt per seizoen', price: '5,50' },
      { name: 'Fles huiswijn', description: '75cl', price: '24,00' },
      { name: 'Speciaalbier', description: 'Vraag naar ons bierassortiment', price: '5,00' },
      { name: 'Frisdrank', description: 'Cola, Spa, Fanta, etc.', price: '3,50' },
      { name: 'Koffie & thee', description: 'Espresso, cappuccino, latte, thee', price: '3,00' },
    ],
  },
]

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Onze keuken"
        title="Menu"
        subtitle="Vers, seizoensgebonden en met liefde bereid. Elk gerecht vertelt het verhaal van onze keuken."
      />

      {/* Allergen note */}
      <div className="px-6 pt-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="bg-wood-muted border border-primary/15 rounded-lg px-5 py-3 text-sm text-foreground/65">
            <strong className="text-brand-dark font-semibold">Allergenen:</strong> Informeer uw bediening bij allergieën of dieetwensen. Alle prijzen zijn inclusief BTW.
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <section className="py-10 px-6 bg-background">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {menuSections.map((section) => (
            <div key={section.id}>
              {/* Section header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <div className="text-center px-2">
                  <h2 className="heading-display text-2xl text-brand-dark">{section.title}</h2>
                  <p className="text-muted-foreground text-xs mt-0.5">{section.subtitle}</p>
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Items grid */}
              <div className="grid md:grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/25 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-dark text-sm">{item.name}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-0.5">{item.description}</p>
                    </div>
                    <span className="text-primary font-bold text-sm whitespace-nowrap shrink-0 ml-2">
                      &euro;&nbsp;{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 bg-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-8 h-0.5 bg-primary rounded-full mx-auto mb-5" />
          <h2 className="heading-display text-3xl text-brand-dark mb-3 text-balance">
            Zin gekregen?
          </h2>
          <p className="text-foreground/60 text-sm leading-relaxed mb-7">
            Reserveer uw tafel en laat ons voor u zorgen. Wij staan voor u klaar voor een onvergetelijk diner aan het water.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-brand-blue-dark transition-colors shadow-sm text-sm"
          >
            Maak een reservering <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
