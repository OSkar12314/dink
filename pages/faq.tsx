import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SITE_URL = 'https://dink-taupe.vercel.app';

const FAQS = [
  {
    category: 'Beställning & betalning',
    items: [
      {
        q: 'Vilka betalningsmetoder accepterar ni?',
        a: 'Vi hanterar betalningar via Stripe, som stödjer Visa, Mastercard, American Express och Apple Pay. Alla transaktioner är krypterade och säkra.',
      },
      {
        q: 'Kan jag ändra eller avbeställa min order?',
        a: 'Kontakta oss snarast möjligt på hej@dink.se om du vill ändra eller avbeställa. Vi kan oftast hjälpa dig om ordern inte ännu skickats. När ordern är skickad gäller ordinarie returprocess.',
      },
      {
        q: 'Är det säkert att handla hos DINK?',
        a: 'Ja. Betalningar sköts av Stripe, som är certifierade enligt PCI DSS nivå 1 – den högsta säkerhetsstandarden för kortbetalningar. Vi lagrar inga kortuppgifter på egna servrar.',
      },
      {
        q: 'Får jag en orderbekräftelse?',
        a: 'Ja, du får en orderbekräftelse via e-post direkt efter genomfört köp. Kontrollera skräpposten om du inte hittar den.',
      },
    ],
  },
  {
    category: 'Frakt & leverans',
    items: [
      {
        q: 'Hur lång är leveranstiden?',
        a: 'Standard är 1–3 arbetsdagar inom Sverige. Vid expressfrakt (99 kr) levereras ordern nästa arbetsdag om du beställer före kl. 12:00.',
      },
      {
        q: 'Vad kostar frakten?',
        a: 'Frakten är gratis på alla ordrar över 500 kr. Under 500 kr kostar standardfrakt 49 kr och expressfrakt 99 kr.',
      },
      {
        q: 'Kan jag spåra min order?',
        a: 'Ja. Du får ett spårningsnummer via e-post när ordern har skickats. Du kan följa paketet hos det aktuella fraktbolaget.',
      },
      {
        q: 'Levererar ni utanför Sverige?',
        a: 'Just nu levererar vi enbart inom Sverige. Vi arbetar på att öppna upp för fler länder – följ oss på Instagram för nyheter.',
      },
    ],
  },
  {
    category: 'Retur & reklamation',
    items: [
      {
        q: 'Hur returnerar jag en vara?',
        a: 'Skicka ett mail till hej@dink.se med ditt ordernummer. Vi skickar en förbetald returetikett – returer är alltid kostnadsfria hos oss.',
      },
      {
        q: 'Hur lång tid tar återbetalningen?',
        a: 'När vi mottagit och godkänt din retur återbetalar vi inom 5–10 bankdagar till din ursprungliga betalningsmetod.',
      },
      {
        q: 'Vad gäller om varan är skadad eller felaktig?',
        a: 'Kontakta oss på hej@dink.se med bilder och ditt ordernummer så löser vi det omgående. Enligt konsumentköplagen har du tre års reklamationsrätt.',
      },
      {
        q: 'Kan jag byta storlek eller produkt?',
        a: 'Returnera ursprungsprodukten och lägg en ny beställning på rätt produkt. Kontakta oss så hjälper vi dig med processen.',
      },
    ],
  },
  {
    category: 'Produkter & utrustning',
    items: [
      {
        q: 'Vilken paddle passar mig som nybörjare?',
        a: 'För nybörjare rekommenderar vi en paddle med större slagyta och mer flex – det ger större margin of error. Kontakta oss på hej@dink.se så hjälper vi dig hitta rätt.',
      },
      {
        q: 'Vad skiljer en inomhus- från en utomhusboll?',
        a: 'Inomhusbollar är mjukare med färre, större hål – de passar för hårdare golv. Utomhusbollar är hårdare med fler, mindre hål för att klara vind och asfaltsunderlag.',
      },
      {
        q: 'Hur ofta bör jag byta grip tape?',
        a: 'Det beror på hur ofta du spelar, men ett bra riktmärke är var 4–8:e vecka för regelbundna spelare. Tecken på att det är dags: gripen känns hal, svettfläckar syns eller ytans textur är bortnött.',
      },
      {
        q: 'Är era produkter godkända för turneringsspel?',
        a: 'Ja, våra paddlar och bollar uppfyller USA Pickleball (USAPA) och European Pickleball Federations specifikationer för turneringsspel.',
      },
    ],
  },
  {
    category: 'Övrigt',
    items: [
      {
        q: 'Har ni en fysisk butik?',
        a: 'Just nu är vi enbart online. Det gör att vi kan hålla lägre priser och leverera direkt till dig var du än är i Sverige.',
      },
      {
        q: 'Erbjuder ni rabatt för klubbar eller lag?',
        a: 'Ja! Vi erbjuder volymrabatter för klubbar och föreningar. Hör av dig till hej@dink.se med information om er förening så skräddarsyr vi ett erbjudande.',
      },
      {
        q: 'Hur kontaktar jag er?',
        a: 'Enklast via e-post: hej@dink.se. Vi svarar normalt inom 1 arbetsdag.',
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string) {
    setOpen(prev => prev === key ? null : key);
  }

  return (
    <>
      <Head>
        <title>FAQ – Vanliga frågor – DINK</title>
        <meta name="description" content="Svar på vanliga frågor om beställning, frakt, retur och produkter hos DINK – Sveriges bästa pickleball-utrustning." />
        <link rel="canonical" href={`${SITE_URL}/faq`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.flatMap(cat => cat.items.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          }))),
        })}} />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --accent: #C8FF00; --border: #2A2A2A; --sub: #888; }
        body { background: #0A0A0A; color: #fff; font-family: 'Inter', sans-serif; line-height: 1.7; }
        .topbar { position: sticky; top: 0; background: rgba(10,10,10,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 0 5vw; height: 64px; display: flex; align-items: center; justify-content: space-between; z-index: 10; }
        .logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 0.12em; color: var(--accent); text-decoration: none; }
        .back { font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #555; text-decoration: none; transition: color 0.2s; }
        .back:hover { color: #fff; }
        .wrapper { max-width: 760px; margin: 0 auto; padding: 4rem 5vw 6rem; }
        .eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: 0.04em; line-height: 1; margin-bottom: 2.5rem; }
        .category { margin-bottom: 2.5rem; }
        .cat-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border); }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-btn { width: 100%; background: none; border: none; color: #fff; text-align: left; padding: 1.1rem 0; display: flex; justify-content: space-between; align-items: center; gap: 1rem; cursor: pointer; font-family: 'Space Grotesk', sans-serif; font-size: 0.92rem; font-weight: 600; line-height: 1.4; transition: color 0.2s; }
        .faq-btn:hover { color: var(--accent); }
        .faq-icon { font-size: 1.25rem; color: var(--accent); flex-shrink: 0; line-height: 1; transition: transform 0.25s; }
        .faq-icon.open { transform: rotate(45deg); }
        .faq-answer { overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding 0.25s; }
        .faq-answer.open { max-height: 400px; }
        .faq-answer p { color: rgba(255,255,255,0.6); font-size: 0.9rem; padding-bottom: 1.25rem; line-height: 1.75; }
        .faq-answer a { color: var(--accent); text-decoration: none; }
        .faq-answer a:hover { text-decoration: underline; }
        .contact-cta { margin-top: 3rem; background: #1A1A1A; border: 1px solid var(--border); padding: 2rem; text-align: center; }
        .contact-cta p { color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-bottom: 1.25rem; }
        .cta { display: inline-block; background: var(--accent); color: #000; padding: 0.85rem 2rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: transform 0.2s; }
        .cta:hover { transform: translateY(-2px); }
      `}</style>

      <div className="topbar">
        <Link href="/" className="logo">DINK</Link>
        <Link href="/" className="back">← Tillbaka</Link>
      </div>

      <div className="wrapper">
        <p className="eyebrow">Support</p>
        <h1>VANLIGA FRÅGOR</h1>

        {FAQS.map(cat => (
          <div className="category" key={cat.category}>
            <p className="cat-title">{cat.category}</p>
            {cat.items.map((item, i) => {
              const key = `${cat.category}-${i}`;
              const isOpen = open === key;
              return (
                <div className="faq-item" key={key}>
                  <button className="faq-btn" onClick={() => toggle(key)} aria-expanded={isOpen}>
                    {item.q}
                    <span className={`faq-icon ${isOpen ? 'open' : ''}`} aria-hidden="true">+</span>
                  </button>
                  <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="contact-cta">
          <p>Hittade du inte svar på din fråga? Vi hjälper dig gärna direkt.</p>
          <a href="mailto:hej@dink.se" className="cta">KONTAKTA OSS</a>
        </div>
      </div>
    </>
  );
}
