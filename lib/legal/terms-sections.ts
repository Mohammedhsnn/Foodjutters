import type { LegalSection } from '@/components/legal/legal-document'
import { btwLine, formatLegalAddress, kvkLine, LEGAL_COMPANY } from '@/lib/legal/company'
import { DEFAULT_HOURS_DISPLAY, DEFAULT_KITCHEN_HOURS } from '@/lib/site/hours'

function companyBlock(): string {
  const lines = [
    `${LEGAL_COMPANY.tradeName} (${LEGAL_COMPANY.legalForm})`,
    formatLegalAddress(),
    kvkLine(),
    btwLine(),
    `E-mail: ${LEGAL_COMPANY.email}`,
    `Telefoon: ${LEGAL_COMPANY.phone}`,
  ].filter(Boolean) as string[]
  return lines.join(', ')
}

export function getTermsSections(): LegalSection[] {
  return [
    {
      id: 'toepasselijkheid',
      title: 'Toepasselijkheid',
      blocks: [
        {
          type: 'p',
          text: 'Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, reserveringsaanvragen, overeenkomsten en horecadienstverlening van FoodJutters, gevestigd aan het adres zoals vermeld onder contactgegevens.',
        },
        {
          type: 'p',
          text: 'Door een reserveringsaanvraag te doen, contact met ons op te nemen of ons restaurant te bezoeken, gaat u akkoord met deze voorwaarden. Afwijkende afspraken zijn alleen geldig indien schriftelijk door FoodJutters bevestigd.',
        },
        { type: 'p', text: companyBlock() },
      ],
    },
    {
      id: 'dienstverlening',
      title: 'Dienstverlening en openingstijden',
      blocks: [
        {
          type: 'p',
          text: 'FoodJutters exploiteert een horecabedrijf (restaurant/brasserie) aan het water in Terneuzen. Wij bieden onder meer consumpties, gerechten en groepsarrangementen aan in onze binnenruimte en op ons terras.',
        },
        {
          type: 'p',
          text: `Onze openingstijden zijn: ${DEFAULT_HOURS_DISPLAY}. Maandag zijn wij gesloten. ${DEFAULT_KITCHEN_HOURS}. Wijzigingen in openingstijden (bijvoorbeeld op feestdagen) kunnen wij op onze website of ter plaatse kenbaar maken.`,
        },
        {
          type: 'p',
          text: 'Aanbod, menukaart en prijzen kunnen wijzigingen ondergaan. Seizoensproducten, beschikbaarheid en drukte kunnen invloed hebben op het daadwerkelijke aanbod. FoodJutters is gerechtigd gerechten of producten tijdelijk niet aan te bieden.',
        },
      ],
    },
    {
      id: 'prijzen',
      title: 'Prijzen en betaling',
      blocks: [
        {
          type: 'p',
          text: 'Alle op de website en menukaart vermelde prijzen zijn inclusief btw, tenzij anders vermeld. De prijs die geldt op het moment van consumptie of afname is leidend.',
        },
        {
          type: 'p',
          text: 'Betaling geschiedt ter plaatse na afloop van uw bezoek, conform de op dat moment geldende betaalmethoden in het restaurant. Voor groepsreserveringsaanvragen via de website is geen online vooruitbetaling vereist, tenzij dit uitdrukkelijk met u is overeengekomen.',
        },
        {
          type: 'p',
          text: 'FoodJutters mag een redelijke waarborgsom of vooruitbetaling vragen bij groepsreserveringen of arrangementen. Dit wordt vooraf duidelijk met u afgestemd.',
        },
      ],
    },
    {
      id: 'reserveringen',
      title: 'Reserveringen',
      blocks: [
        {
          type: 'p',
          text: 'Via onze website kunt u een groepsreservering aanvragen voor organisaties of gezelschappen vanaf 8 personen. Een aanvraag is geen definitieve bevestiging; wij bevestigen uw reservering schriftelijk (per e-mail) of telefonisch zodra wij capaciteit hebben gecontroleerd.',
        },
        {
          type: 'ul',
          items: [
            'U bent verplicht juiste en volledige gegevens te verstrekken bij een reserveringsaanvraag.',
            'Wijzigingen of annuleringen dient u zo spoedig mogelijk aan ons door te geven.',
            'Bij annulering binnen 48 uur voor de gereserveerde datum/tijd of bij no-show kunnen wij kosten in rekening brengen, voor zover dit vooraf met u is besproken of redelijkerwijs uit de aard van de reservering voortvloeit.',
            'Wij behouden ons het recht voor een reservering te weigeren of te verplaatsen bij overmacht, onveilige situaties of onredelijk gedrag.',
          ],
        },
      ],
    },
    {
      id: 'allergenen',
      title: 'Allergieën, dieetwensen en productinformatie',
      blocks: [
        {
          type: 'p',
          text: 'Wij doen ons best om gasten te informeren over allergenen en ingrediënten. Desondanks kunnen kruisbesmetting in een horecakeuken niet volledig worden uitgesloten.',
        },
        {
          type: 'p',
          text: 'Het is uw verantwoordelijkheid allergieën, intoleranties of dieetwensen vóór bestelling en consumptie aan onze bediening door te geven. FoodJutters is niet aansprakelijk voor schade die voortvloeit uit het niet tijdig of onjuist doorgeven van dergelijke informatie.',
        },
      ],
    },
    {
      id: 'alcohol',
      title: 'Alcohol en leeftijdsgrenzen',
      blocks: [
        {
          type: 'p',
          text: 'De verstrekking van alcoholische dranken geschiedt conform de Drank- en Horecawet. Alcohol wordt uitsluitend verstrekt aan personen van 18 jaar en ouder. Wij kunnen om legitimatie vragen. Het is niet toegestaan alcohol mee te nemen dat niet bij ons is verkregen (geen eigen drank meenemen), tenzij schriftelijk anders overeengekomen.',
        },
      ],
    },
    {
      id: 'huisregels',
      title: 'Huisregels en gedrag',
      blocks: [
        {
          type: 'p',
          text: 'In ons restaurant verwachten wij van alle gasten respectvol gedrag jegens personeel en medegasten. Wij behouden ons het recht voor gasten de toegang te weigeren of te verzoeken het pand te verlaten bij:',
        },
        {
          type: 'ul',
          items: [
            'Overmatig alcoholgebruik of verstoring van de openbare orde.',
            'Agressie, discriminatie of ongewenst gedrag.',
            'Het niet naleven van aanwijzingen van ons personeel.',
            'Schade aan eigendommen of gevaarlijke situaties.',
          ],
        },
        {
          type: 'p',
          text: 'Huisdieren zijn alleen welkom voor zover dit ter plaatse is toegestaan en niet in strijd is met hygiënevoorschriften. Roken is uitsluitend toegestaan in daarvoor aangewezen rookruimtes, indien aanwezig.',
        },
      ],
    },
    {
      id: 'aansprakelijkheid',
      title: 'Aansprakelijkheid',
      blocks: [
        {
          type: 'p',
          text: 'FoodJutters spant zich in voor een veilige en gastvrije omgeving. Onze aansprakelijkheid is beperkt tot hetgeen is toegestaan onder Nederlands recht.',
        },
        {
          type: 'ul',
          items: [
            'Wij zijn niet aansprakelijk voor schade aan of verlies van persoonlijke eigendommen van gasten, tenzij de schade het gevolg is van opzet of bewuste roekeloosheid van FoodJutters.',
            'FoodJutters is niet aansprakelijk voor indirecte schade of gevolgschade.',
            'Voor consumenten gelden de dwingende wettelijke rechten; niets in deze voorwaarden beperkt die rechten.',
          ],
        },
        {
          type: 'p',
          text: 'Meld schade of ongevallen direct bij ons personeel zodat wij passende maatregelen kunnen nemen.',
        },
      ],
    },
    {
      id: 'klachten',
      title: 'Klachten',
      blocks: [
        {
          type: 'p',
          text: 'Bent u niet tevreden over onze dienstverlening? Laat het ons zo snel mogelijk weten, bij voorkeur ter plaatse, zodat wij direct kunnen helpen. U kunt ook schriftelijk klagen via onze contactgegevens.',
        },
        {
          type: 'p',
          text: 'Wij streven ernaar klachten binnen 14 dagen inhoudelijk te beantwoorden. Indien een klacht niet in onderling overleg wordt opgelost, kunt u als consument uw rechten ontlenen aan de toepasselijke wettelijke regels.',
        },
      ],
    },
    {
      id: 'intellectueel',
      title: 'Intellectueel eigendom',
      blocks: [
        {
          type: 'p',
          text: 'Alle content op deze website, waaronder teksten, logo’s, foto’s en vormgeving, is eigendom van FoodJutters of wordt met toestemming gebruikt. Het is niet toegestaan deze zonder voorafgaande schriftelijke toestemming te kopiëren of commercieel te gebruiken.',
        },
      ],
    },
    {
      id: 'overmacht',
      title: 'Overmacht',
      blocks: [
        {
          type: 'p',
          text: 'FoodJutters is niet gehouden tot het nakomen van verplichtingen indien zij daartoe verhinderd wordt door overmacht, waaronder extreme weersomstandigheden, uitval van leveranciers, overheidsmaatregelen, stakingen of andere omstandigheden buiten onze redelijke controle. In dat geval kunnen wij een reservering verzetten of annuleren met terugbetaling van eventuele vooruitbetaalde bedragen die uitsluitend betrekking hebben op de geannuleerde dienst.',
        },
      ],
    },
    {
      id: 'recht',
      title: 'Toepasselijk recht en geschillen',
      blocks: [
        {
          type: 'p',
          text: 'Op alle overeenkomsten en deze algemene voorwaarden is uitsluitend Nederlands recht van toepassing.',
        },
        {
          type: 'p',
          text: 'Geschillen trachten partijen eerst in onderling overleg op te lossen. Indien een geschil niet in der minne wordt opgelost en u handelt als consument, kunt u het geschil voorleggen aan de bevoegde rechter in uw woonplaats. FoodJutters kan het geschil ook voorleggen aan de bevoegde rechter in het arrondissement waar FoodJutters is gevestigd.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contactgegevens',
      blocks: [
        { type: 'p', text: companyBlock() },
        {
          type: 'p',
          text: 'Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen via het contactformulier op onze website of per e-mail.',
        },
      ],
    },
  ]
}
