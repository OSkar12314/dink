import Head from 'next/head';
import Link from 'next/link';

const SITE_URL = 'https://dink-taupe.vercel.app';

export default function Tack() {
  return (
    <>
      <Head>
        <title>Tack för din order – DINK</title>
        <meta name="description" content="Din order är bekräftad. Tack för att du handlade hos DINK – Sveriges bästa pickleball-utrustning." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${SITE_URL}/tack`} />
        <meta property="og:title" content="Tack för din order – DINK" />
        <meta property="og:description" content="Din order är bekräftad. Vi levererar inom 1–3 arbetsdagar." />
        <meta property="og:url" content={`${SITE_URL}/tack`} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0A; color: #fff; font-family: 'Space Grotesk', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
        .wrapper { max-width: 560px; }
        .check { width: 72px; height: 72px; border-radius: 50%; background: rgba(200,255,0,0.1); border: 2px solid #C8FF00; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; font-size: 2rem; }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 5.5rem); letter-spacing: 0.04em; line-height: 1; margin-bottom: 1rem; }
        h1 span { color: #C8FF00; }
        .steps { display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0 2.5rem; text-align: left; }
        .step { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem; background: #1A1A1A; border: 1px solid #2A2A2A; }
        .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: #C8FF00; line-height: 1; min-width: 28px; }
        .step-text { font-size: 0.875rem; color: rgba(255,255,255,0.6); line-height: 1.6; }
        .step-text strong { color: #fff; display: block; margin-bottom: 0.2rem; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; }
        a.btn { display: inline-block; background: #C8FF00; color: #000; padding: 1rem 2.25rem; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
        a.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,255,0,0.35); }
      `}</style>
      <main className="wrapper">
        <div className="check" aria-hidden="true">✓</div>
        <h1>TACK FÖR DIN<br /><span>ORDER!</span></h1>
        <div className="steps" aria-label="Nästa steg">
          <div className="step">
            <span className="step-num">1</span>
            <div className="step-text">
              <strong>Orderbekräftelse</strong>
              Du får ett e-postmeddelande från Stripe med din ordersammanfattning inom några minuter.
            </div>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <div className="step-text">
              <strong>Packning & avsändning</strong>
              Vi packar din order och skickar den inom 1 arbetsdag. Du får ett spårningsnummer via e-post.
            </div>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <div className="step-text">
              <strong>Leverans</strong>
              Förvänta dig din order inom 1–3 arbetsdagar. Välkommen ut på banan!
            </div>
          </div>
        </div>
        <Link href="/" className="btn">FORTSÄTT SHOPPA</Link>
      </main>
    </>
  );
}
