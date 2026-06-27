import Head from 'next/head';
import Link from 'next/link';

export default function Tack() {
  return (
    <>
      <Head>
        <title>Tack för din order – DINK</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0A0A0A; color: #fff; font-family: 'Space Grotesk', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
        .icon { font-size: 4rem; margin-bottom: 1.5rem; }
        h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 6rem); letter-spacing: 0.04em; line-height: 1; margin-bottom: 1rem; }
        h1 span { color: #C8FF00; }
        p { color: rgba(255,255,255,0.55); font-size: 1rem; line-height: 1.7; max-width: 400px; margin: 0 auto 2.5rem; }
        a { display: inline-block; background: #C8FF00; color: #000; padding: 1rem 2.25rem; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: transform 0.2s; }
        a:hover { transform: translateY(-2px); }
      `}</style>
      <div>
        <p className="icon">🏓</p>
        <h1>TACK FÖR DIN<br /><span>ORDER!</span></h1>
        <p>Din beställning är bekräftad. Vi skickar en orderbekräftelse till din e-post och levererar inom 1–3 arbetsdagar.</p>
        <Link href="/">TILLBAKA TILL SHOPPEN</Link>
      </div>
    </>
  );
}
