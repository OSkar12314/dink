import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = 'https://dink-taupe.vercel.app';

export default function FraktRetur() {
  return (
    <>
      <Head>
        <title>Frakt & Retur – DINK</title>
        <meta name="description" content="Fri frakt över 500 kr, fria returer inom 30 dagar. Läs mer om DINKs frakt- och returvillkor." />
        <link rel="canonical" href={`${SITE_URL}/frakt-retur`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
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
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: 0.04em; line-height: 1; margin-bottom: 0.5rem; }
        .updated { font-size: 0.78rem; color: var(--sub); margin-bottom: 3rem; }
        .usp-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-bottom: 4rem; background: var(--border); border: 1px solid var(--border); }
        .usp-box { background: #1A1A1A; padding: 1.75rem 1.5rem; }
        .usp-icon { font-size: 1.5rem; margin-bottom: 0.75rem; display: block; }
        .usp-label { font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.35rem; }
        .usp-val { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.5; }
        @media (max-width: 600px) { .usp-row { grid-template-columns: 1fr; } }
        h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin: 2.5rem 0 0.75rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        p { color: rgba(255,255,255,0.7); font-size: 0.95rem; margin-bottom: 1rem; }
        ul { color: rgba(255,255,255,0.7); font-size: 0.95rem; padding-left: 1.5rem; margin-bottom: 1rem; }
        ul li { margin-bottom: 0.5rem; }
        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .info-box { background: #1A1A1A; border: 1px solid var(--border); border-left: 3px solid var(--accent); padding: 1.25rem 1.5rem; margin: 1.25rem 0; }
        .info-box p { margin: 0; color: rgba(255,255,255,0.8); }
        .steps { display: flex; flex-direction: column; gap: 0; margin: 1rem 0; }
        .step { display: flex; gap: 1.25rem; padding: 1.25rem; background: #1A1A1A; border: 1px solid var(--border); border-bottom: none; }
        .step:last-child { border-bottom: 1px solid var(--border); }
        .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.75rem; color: var(--accent); line-height: 1; min-width: 28px; }
        .step-content strong { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #fff; margin-bottom: 0.3rem; }
        .step-content p { color: rgba(255,255,255,0.6); font-size: 0.875rem; margin: 0; }
        .cta { display: inline-block; background: var(--accent); color: #000; padding: 1rem 2rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; margin-top: 2rem; transition: transform 0.2s, box-shadow 0.2s; }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,255,0,0.3); }
      `}</style>

      <div className="topbar">
        <Link href="/" className="logo">DINK</Link>
        <Link href="/" className="back">← Tillbaka</Link>
      </div>

      <div className="wrapper">
        <p className="eyebrow">Villkor</p>
        <h1>FRAKT & RETUR</h1>
        <p className="updated">Senast uppdaterad: 28 juni 2025</p>

        <div className="usp-row">
          <div className="usp-box">
            <span className="usp-icon">🚚</span>
            <p className="usp-label">Fri frakt</p>
            <p className="usp-val">På alla ordrar över 500 kr</p>
          </div>
          <div className="usp-box">
            <span className="usp-icon">🔄</span>
            <p className="usp-label">Fria returer</p>
            <p className="usp-val">30 dagars öppet köp</p>
          </div>
          <div className="usp-box">
            <span className="usp-icon">⚡</span>
            <p className="usp-label">Snabb leverans</p>
            <p className="usp-val">1–3 arbetsdagar</p>
          </div>
        </div>

        <h2>Frakt & leverans</h2>
        <p>Vi skickar alla ordrar med spårbar frakt inom Sverige. Leveranstiden är normalt <strong>1–3 arbetsdagar</strong> efter att din order har bekräftats.</p>
        <ul>
          <li><strong>Fri frakt</strong> på alla ordrar över 500 kr.</li>
          <li><strong>Standardfrakt 49 kr</strong> på ordrar under 500 kr.</li>
          <li><strong>Expressfrakt 99 kr</strong> – leverans nästa arbetsdag (beställ före kl. 12:00).</li>
        </ul>
        <div className="info-box">
          <p>📦 Du får ett spårningsnummer via e-post så snart din order har skickats. Leverans sker till angiven adress, postbox eller ditt närmaste utlämningsställe.</p>
        </div>

        <h2>Ångerrätt & öppet köp</h2>
        <p>Som konsument har du enligt <strong>Lag (2005:59) om distansavtal och avtal utanför affärslokaler</strong> rätt att ångra ditt köp inom 14 dagar från det att du mottagit varan, utan att ange något skäl.</p>
        <p>DINK erbjuder dessutom <strong>30 dagars öppet köp</strong> – det vill säga 16 dagar utöver den lagstadgade ångerrätten – som en extra trygghet för dig som kund.</p>
        <ul>
          <li>Returrätten gäller från det datum du mottagit varan.</li>
          <li>Varan ska vara i väsentligen oförändrat skick.</li>
          <li>Original­förpackning ska medfölja om möjligt.</li>
          <li>Returen är <strong>kostnadsfri</strong> – vi skickar en förbetald returetikett via e-post.</li>
        </ul>

        <h2>Så här returnerar du</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <div className="step-content">
              <strong>Kontakta oss</strong>
              <p>Skicka ett e-postmeddelande till <a href="mailto:hej@dink.se">hej@dink.se</a> med ditt ordernummer och anledning till retur. Vi svarar inom 1 arbetsdag.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <div className="step-content">
              <strong>Få returetikett</strong>
              <p>Vi skickar en förbetald returetikett till din e-postadress. Inga dolda kostnader.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <div className="step-content">
              <strong>Paketera & lämna in</strong>
              <p>Förpacka varan noggrant och lämna paketet på närmaste inlämningsställe.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">4</span>
            <div className="step-content">
              <strong>Återbetalning</strong>
              <p>När vi mottagit och kontrollerat returen återbetalar vi hela beloppet till din ursprungliga betalningsmetod inom <strong>5–10 bankdagar</strong>.</p>
            </div>
          </div>
        </div>

        <h2>Reklamation & garantier</h2>
        <p>Enligt <strong>Konsumentköplagen (2022:260)</strong> har du som konsument rätt att reklamera en vara som är felaktig i tre år från köpdatum. Vid en giltig reklamation ansvarar DINK för reparation, omleverans eller återbetalning.</p>
        <ul>
          <li>Kontakta oss på <a href="mailto:hej@dink.se">hej@dink.se</a> med bilder på felet och ditt ordernummer.</li>
          <li>Reklamation ska göras inom skälig tid efter att felet upptäckts (normalt inom 2 månader).</li>
          <li>Normalt slitage och skador orsakade av felaktig användning täcks inte.</li>
        </ul>
        <div className="info-box">
          <p>💡 Om du är missnöjd med vår hantering av en reklamation kan du vända dig till <strong>Allmänna reklamationsnämnden (ARN)</strong> på <a href="https://www.arn.se" target="_blank" rel="noopener noreferrer">www.arn.se</a>.</p>
        </div>

        <h2>Frågor?</h2>
        <p>Kontakta oss på <a href="mailto:hej@dink.se">hej@dink.se</a> så hjälper vi dig.</p>
        <Link href="/" className="cta">TILLBAKA TILL SHOPPEN</Link>
      </div>
    </>
  );
}
