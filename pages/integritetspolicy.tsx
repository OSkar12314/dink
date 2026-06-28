import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = 'https://dink-taupe.vercel.app';

export default function Integritetspolicy() {
  return (
    <>
      <Head>
        <title>Integritetspolicy – DINK</title>
        <meta name="description" content="Läs om hur DINK hanterar dina personuppgifter i enlighet med GDPR." />
        <link rel="canonical" href={`${SITE_URL}/integritetspolicy`} />
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
        h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin: 2.5rem 0 0.75rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        h2:first-of-type { margin-top: 0; }
        p { color: rgba(255,255,255,0.7); font-size: 0.95rem; margin-bottom: 1rem; }
        ul { color: rgba(255,255,255,0.7); font-size: 0.95rem; padding-left: 1.5rem; margin-bottom: 1rem; }
        ul li { margin-bottom: 0.4rem; }
        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .contact-box { background: #1A1A1A; border: 1px solid var(--border); padding: 1.5rem; margin-top: 1rem; }
        .contact-box p { margin: 0; }
      `}</style>

      <div className="topbar">
        <Link href="/" className="logo">DINK</Link>
        <Link href="/" className="back">← Tillbaka</Link>
      </div>

      <div className="wrapper">
        <p className="eyebrow">Juridisk information</p>
        <h1>INTEGRITETSPOLICY</h1>
        <p className="updated">Senast uppdaterad: 28 juni 2025</p>

        <h2>1. Personuppgiftsansvarig</h2>
        <p>DINK ("vi", "oss", "vår") är personuppgiftsansvarig för behandlingen av dina personuppgifter. Vi behandlar dina uppgifter i enlighet med Europaparlamentets och rådets förordning (EU) 2016/679 (GDPR) samt tillämplig svensk lagstiftning.</p>
        <p>Kontaktuppgifter: <a href="mailto:hej@dink.se">hej@dink.se</a></p>

        <h2>2. Vilka uppgifter samlar vi in?</h2>
        <p>Vi samlar in och behandlar följande kategorier av personuppgifter:</p>
        <ul>
          <li><strong>Kontaktuppgifter:</strong> Namn, e-postadress, telefonnummer och leveransadress vid köp.</li>
          <li><strong>Betalningsinformation:</strong> Betalningar hanteras av Stripe Inc. Vi lagrar inga kortuppgifter på egna servrar.</li>
          <li><strong>Orderinformation:</strong> Köphistorik, orderreferenser och leveransstatus.</li>
          <li><strong>Tekniska uppgifter:</strong> IP-adress, webbläsartyp och cookies för att webbplatsen ska fungera korrekt.</li>
          <li><strong>Kommunikation:</strong> E-postadress om du prenumererar på vårt nyhetsbrev.</li>
        </ul>

        <h2>3. Ändamål och rättslig grund</h2>
        <p>Vi behandlar dina personuppgifter för följande ändamål och med stöd av nedanstående rättsliga grunder:</p>
        <ul>
          <li><strong>Fullgörande av avtal (Art. 6.1 b GDPR):</strong> För att hantera och leverera din beställning.</li>
          <li><strong>Rättslig förpliktelse (Art. 6.1 c GDPR):</strong> För att uppfylla krav enligt bokföringslagen (1999:1078) och konsumentköplagen (2022:260).</li>
          <li><strong>Berättigat intresse (Art. 6.1 f GDPR):</strong> För att skydda oss mot bedrägerier och förbättra vår tjänst.</li>
          <li><strong>Samtycke (Art. 6.1 a GDPR):</strong> För utskick av nyhetsbrev. Du kan när som helst återkalla ditt samtycke.</li>
        </ul>

        <h2>4. Hur länge sparar vi dina uppgifter?</h2>
        <ul>
          <li><strong>Orderuppgifter:</strong> 7 år i enlighet med bokföringslagen.</li>
          <li><strong>Nyhetsbrevsprenumeration:</strong> Till dess att du avregistrerar dig.</li>
          <li><strong>Kundkonto:</strong> Så länge kontot är aktivt, eller upp till 3 år efter senaste aktivitet.</li>
          <li><strong>Cookies:</strong> Se avsnitt 7 nedan.</li>
        </ul>

        <h2>5. Delning med tredje part</h2>
        <p>Vi delar dina personuppgifter med följande kategorier av mottagare:</p>
        <ul>
          <li><strong>Stripe Inc.:</strong> Betalningshantering. Stripe är certifierat enligt PCI DSS nivå 1. Se Stripes integritetspolicy på stripe.com.</li>
          <li><strong>Fraktbolag:</strong> Namn och leveransadress delas med vald speditör för att möjliggöra leverans.</li>
          <li><strong>Vercel Inc.:</strong> Hosting av webbplatsen. Datan lagras inom EU/EES.</li>
        </ul>
        <p>Vi säljer aldrig dina personuppgifter till tredje part.</p>

        <h2>6. Överföring till tredjeland</h2>
        <p>Stripe Inc. och Vercel Inc. är amerikanska företag. Överföring sker med stöd av EU-kommissionens standardavtalsklausuler (SCC) i enlighet med Art. 46 GDPR, vilket ger ett adekvat skydd för dina uppgifter.</p>

        <h2>7. Cookies</h2>
        <p>Vi använder följande typer av cookies:</p>
        <ul>
          <li><strong>Nödvändiga cookies:</strong> Autentiseringscookie (dink_auth) för lösenordsskydd samt Stripes sessionscookies för betalningshantering. Rättslig grund: berättigat intresse.</li>
          <li><strong>Funktionscookies:</strong> Cookie för ditt cookie-samtycke (dink_cookie). Rättslig grund: berättigat intresse.</li>
        </ul>
        <p>Vi använder inga spårnings- eller marknadsföringscookies.</p>

        <h2>8. Dina rättigheter</h2>
        <p>Enligt GDPR har du följande rättigheter:</p>
        <ul>
          <li><strong>Rätt till tillgång (Art. 15):</strong> Du har rätt att få information om vilka uppgifter vi behandlar om dig.</li>
          <li><strong>Rätt till rättelse (Art. 16):</strong> Du kan begära att felaktiga uppgifter rättas.</li>
          <li><strong>Rätt till radering (Art. 17):</strong> Du kan begära att dina uppgifter raderas ("rätten att bli glömd"), med förbehåll för rättsliga förpliktelser.</li>
          <li><strong>Rätt till begränsning (Art. 18):</strong> Du kan begära att behandlingen av dina uppgifter begränsas.</li>
          <li><strong>Rätt till dataportabilitet (Art. 20):</strong> Du kan begära att få ut dina uppgifter i ett strukturerat, maskinläsbart format.</li>
          <li><strong>Rätt att göra invändningar (Art. 21):</strong> Du kan invända mot behandling som grundar sig på berättigat intresse.</li>
          <li><strong>Rätt att återkalla samtycke:</strong> Du kan när som helst återkalla ett lämnat samtycke utan att det påverkar lagligheten av tidigare behandling.</li>
        </ul>
        <p>För att utöva dina rättigheter, kontakta oss på <a href="mailto:hej@dink.se">hej@dink.se</a>. Vi svarar inom 30 dagar.</p>

        <h2>9. Klagomål</h2>
        <p>Om du anser att vi behandlar dina personuppgifter på ett felaktigt sätt har du rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY):</p>
        <div className="contact-box">
          <p>Integritetsskyddsmyndigheten (IMY)<br />
          Box 8114, 104 20 Stockholm<br />
          <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer">www.imy.se</a><br />
          imy@imy.se</p>
        </div>

        <h2>10. Kontakt</h2>
        <p>Har du frågor om vår hantering av personuppgifter är du välkommen att kontakta oss:</p>
        <div className="contact-box">
          <p>DINK<br />
          <a href="mailto:hej@dink.se">hej@dink.se</a></p>
        </div>
      </div>
    </>
  );
}
