import type { LegalSection } from '@/components/legal/legal-document'
import { btwLine, formatLegalAddress, kvkLine, LEGAL_COMPANY } from '@/lib/legal/company'

function companyIntro(): string {
  const extras = [kvkLine(), btwLine()].filter(Boolean)
  const suffix = extras.length ? ` (${extras.join('; ')})` : ''
  return `${LEGAL_COMPANY.tradeName}, gevestigd aan ${formatLegalAddress()}${suffix}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.`
}

export function getPrivacySections(): LegalSection[] {
  return [
    {
      id: 'introductie',
      title: 'Introductie',
      blocks: [
        {
          type: 'p',
          text: 'FoodJutters hecht groot belang aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen via onze website en tijdens uw bezoek aan ons restaurant, waarom wij dat doen en welke rechten u heeft op grond van de Algemene Verordening Gegevensbescherming (AVG).',
        },
        { type: 'p', text: companyIntro() },
      ],
    },
    {
      id: 'gegevens',
      title: 'Welke gegevens verwerken wij?',
      blocks: [
        {
          type: 'p',
          text: 'Wij kunnen de volgende categorieën persoonsgegevens verwerken, afhankelijk van hoe u contact met ons opneemt:',
        },
        {
          type: 'ul',
          items: [
            'Contactgegevens: naam, telefoonnummer en e-mailadres.',
            'Reserveringsgegevens: datum, tijd, aantal personen, organisatie/bedrijfsnaam (indien van toepassing) en eventuele bijzonderheden of dieetwensen die u doorgeeft.',
            'Correspondentie: inhoud van berichten via het contactformulier of per e-mail/telefoon.',
            'Technische gegevens: beperkte serverloggegevens (zoals IP-adres, browsertype en tijdstip van bezoek) die nodig zijn voor de werking en beveiliging van de website.',
          ],
        },
        {
          type: 'p',
          text: 'Wij verwerken geen bijzondere persoonsgegevens opzettelijk, tenzij u deze vrijwillig met ons deelt (bijvoorbeeld allergie-informatie in een reserveringsnotitie). Geef alleen informatie door die nodig is voor uw aanvraag of bezoek.',
        },
      ],
    },
    {
      id: 'doeleinden',
      title: 'Waarvoor gebruiken wij uw gegevens?',
      blocks: [
        {
          type: 'p',
          text: 'Wij verwerken persoonsgegevens uitsluitend voor de volgende doeleinden:',
        },
        {
          type: 'ul',
          items: [
            'Het afhandelen van contactverzoeken en vragen.',
            'Het beoordelen, bevestigen en administreren van (groeps)reserveringsaanvragen.',
            'Het verlenen van horecadiensten tijdens uw bezoek aan ons restaurant.',
            'Het nakomen van wettelijke verplichtingen (bijvoorbeeld fiscale administratie).',
            'Het waarborgen van de veiligheid en het goed functioneren van onze website.',
          ],
        },
      ],
    },
    {
      id: 'grondslagen',
      title: 'Rechtsgrond voor verwerking',
      blocks: [
        {
          type: 'p',
          text: 'Wij verwerken uw gegevens op basis van een of meer van de volgende grondslagen uit de AVG:',
        },
        {
          type: 'ul',
          items: [
            'Uitvoering van een overeenkomst of het nemen van stappen op uw verzoek vóór het sluiten van een overeenkomst (bijvoorbeeld een reserveringsaanvraag).',
            'Gerechtvaardigd belang: het beantwoorden van vragen, het organiseren van onze bedrijfsvoering en het beschermen van onze systemen, waarbij wij uw belangen afwegen.',
            'Wettelijke verplichting, indien van toepassing.',
            'Toestemming, indien u ons daar expliciet toestemming voor heeft gegeven (bijvoorbeeld voor vrijwillige aanvullende informatie).',
          ],
        },
      ],
    },
    {
      id: 'bewaartermijn',
      title: 'Bewaartermijnen',
      blocks: [
        {
          type: 'p',
          text: 'Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld:',
        },
        {
          type: 'ul',
          items: [
            'Contact- en reserveringsgegevens: doorgaans maximaal 2 jaar na uw laatste contact of bezoek, tenzij een langere bewaartermijn wettelijk verplicht is.',
            'Fiscale en administratieve gegevens: conform de wettelijke bewaartermijn van 7 jaar, indien van toepassing.',
            'Technische loggegevens: doorgaans maximaal 90 dagen, tenzij nodig voor beveiligingsonderzoek.',
          ],
        },
      ],
    },
    {
      id: 'delen',
      title: 'Delen met derden',
      blocks: [
        {
          type: 'p',
          text: 'Wij verkopen uw gegevens niet aan derden. Gegevens kunnen worden verwerkt door zorgvuldig geselecteerde verwerkers die ons ondersteunen bij het hosten van de website, het beheren van reserveringen of het verzenden van e-mail. Met deze partijen sluiten wij verwerkersovereenkomsten of zorgen wij anderszins voor passende bescherming conform de AVG.',
        },
        {
          type: 'p',
          text: 'Daarnaast kunnen wij gegevens verstrekken indien wij daartoe wettelijk verplicht zijn (bijvoorbeeld aan de Belastingdienst of een toezichthouder).',
        },
      ],
    },
    {
      id: 'beveiliging',
      title: 'Beveiliging',
      blocks: [
        {
          type: 'p',
          text: 'Wij nemen passende technische en organisatorische maatregelen om misbruik, verlies en onbevoegde toegang tot persoonsgegevens te voorkomen. Denk aan beveiligde verbindingen (HTTPS), toegangsbeperkingen voor administratieve systemen en beperkte toegang tot persoonsgegevens voor medewerkers.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      blocks: [
        {
          type: 'p',
          text: 'Onze publieke website gebruikt uitsluitend cookies en vergelijkbare technieken die noodzakelijk zijn voor het functioneren en de beveiliging van de site. Wij plaatsen geen marketing- of trackingcookies voor advertentiedoeleinden.',
        },
        {
          type: 'p',
          text: 'Het beheerdersgedeelte van de website kan functionele sessiecookies gebruiken voor inlogbeveiliging. Deze cookies zijn niet bedoeld voor bezoekers van de publieke site.',
        },
      ],
    },
    {
      id: 'rechten',
      title: 'Uw rechten',
      blocks: [
        {
          type: 'p',
          text: 'U heeft op grond van de AVG de volgende rechten, voor zover van toepassing:',
        },
        {
          type: 'ul',
          items: [
            'Recht op inzage in uw persoonsgegevens.',
            'Recht op rectificatie van onjuiste gegevens.',
            'Recht op verwijdering van uw gegevens.',
            'Recht op beperking van de verwerking.',
            'Recht op overdraagbaarheid van gegevens die u aan ons heeft verstrekt.',
            'Recht om bezwaar te maken tegen verwerking op basis van gerechtvaardigd belang.',
            'Recht om een gegeven toestemming in te trekken.',
          ],
        },
        {
          type: 'p',
          text: `U kunt een verzoek indienen via ${LEGAL_COMPANY.email} of telefonisch via ${LEGAL_COMPANY.phone}. Wij reageren binnen 30 dagen. Wij kunnen u vragen uw identiteit te verifiëren voordat wij een verzoek uitvoeren.`,
        },
        {
          type: 'p',
          text: 'Indien u van mening bent dat wij uw gegevens niet correct verwerken, heeft u het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (www.autoriteitpersoonsgegevens.nl).',
        },
      ],
    },
    {
      id: 'wijzigingen',
      title: 'Wijzigingen',
      blocks: [
        {
          type: 'p',
          text: 'Wij kunnen dit privacybeleid van tijd tot tijd aanpassen, bijvoorbeeld bij wijzigingen in wetgeving of onze dienstverlening. De meest actuele versie is altijd beschikbaar op deze pagina. Wij adviseren u dit beleid regelmatig te raadplegen.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      blocks: [
        {
          type: 'p',
          text: `Voor vragen over dit privacybeleid of de verwerking van uw persoonsgegevens kunt u contact opnemen met ${LEGAL_COMPANY.tradeName}:`,
        },
        {
          type: 'ul',
          items: [
            `E-mail: ${LEGAL_COMPANY.email}`,
            `Telefoon: ${LEGAL_COMPANY.phone}`,
            `Adres: ${formatLegalAddress()}`,
          ],
        },
      ],
    },
  ]
}
