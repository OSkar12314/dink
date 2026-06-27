import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';

const PRODUCTS = [
  { id: 1, name: 'PRO CARBON PADDLE', desc: 'Kolfiberpaddle för den som vill dominera köket', price: 1299, emoji: '🏓', badge: 'Bestseller', grad: 'grad-1' },
  { id: 2, name: 'OUTDOOR BALLS 3-PACK', desc: 'Optimerad för utomhusspel i alla väderförhållanden', price: 249, emoji: '🟡', grad: 'grad-2' },
  { id: 3, name: 'DINK BACKPACK', desc: 'Rymlig väska med paddelfack och ventilerat rygg', price: 899, emoji: '🎒', grad: 'grad-3' },
  { id: 4, name: 'GRIP TAPE 3-PACK', desc: 'Absorberande grip för maximal kontroll vid varje slag', price: 149, emoji: '🔧', grad: 'grad-4' },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [loading, setLoading] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);

    // Ticker
    const items = ['FREE FRAKT ÖVER 500KR', 'OWN THE KITCHEN', 'SNABB LEVERANS', 'DINK'];
    const doubled = [...items, ...items, ...items, ...items];
    const track = document.getElementById('tickerTrack');
    if (track) {
      doubled.forEach((t, i) => {
        const el = document.createElement('span');
        el.className = 'ticker-item';
        el.textContent = t;
        track.appendChild(el);
        if (i < doubled.length - 1) {
          const dot = document.createElement('span');
          dot.className = 'ticker-item ticker-dot';
          dot.textContent = '·';
          track.appendChild(dot);
        }
      });
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
  }, [cartOpen]);

  function showToast(msg) {
    setToast({ show: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, msg: '' }), 2800);
  }

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} lagd i korgen!`);
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  async function handleCheckout() {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else showToast('Något gick fel, försök igen.');
    } catch {
      showToast('Något gick fel, försök igen.');
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>DINK – Own the Kitchen</title>
        <meta name="description" content="Sveriges bästa pickleball-utrustning. Levererad till din dörr." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #0A0A0A; --accent: #C8FF00; --white: #FFFFFF; --card-bg: #1A1A1A; --sub: #555555; --border: #2A2A2A; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--white); font-family: 'Inter', sans-serif; overflow-x: hidden; }

        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 5vw; height: 68px; display: flex; align-items: center; justify-content: space-between; transition: background 0.3s, backdrop-filter 0.3s, border-color 0.3s; border-bottom: 1px solid transparent; }
        nav.scrolled { background: rgba(10,10,10,0.75); backdrop-filter: blur(20px); border-color: var(--border); }
        .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.12em; color: var(--accent); text-decoration: none; }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--white); text-decoration: none; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
        .nav-links a:hover { opacity: 1; color: var(--accent); }
        .nav-right { display: flex; align-items: center; gap: 1.25rem; }
        .cart-btn { background: none; border: none; cursor: pointer; color: var(--white); display: flex; align-items: center; gap: 0.4rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.85; transition: opacity 0.2s, color 0.2s; }
        .cart-btn:hover { opacity: 1; color: var(--accent); }
        .cart-count { background: var(--accent); color: #000; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        .hero { height: 100vh; min-height: 600px; display: flex; align-items: center; padding: 0 5vw; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #0A0A0A 60%, #141414 100%); }
        .hero-lines { position: absolute; inset: 0; opacity: 0.035; background-image: linear-gradient(rgba(200,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,1) 1px, transparent 1px); background-size: 80px 80px; }
        .hero-court { position: absolute; right: -4vw; top: 50%; transform: translateY(-50%); width: 52vw; max-width: 780px; aspect-ratio: 1; opacity: 0.045; }
        .hero-court svg { width: 100%; height: 100%; }
        .hero-glow { position: absolute; bottom: -20%; right: 10%; width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%); pointer-events: none; }
        .hero-content { position: relative; z-index: 2; max-width: 820px; }
        .hero-eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem; opacity: 0; animation: fadeUp 0.7s 0.1s forwards; }
        .hero-h1 { font-family: 'Bebas Neue', sans-serif; line-height: 0.92; letter-spacing: 0.03em; }
        .hero-h1 .line1 { font-size: clamp(5rem, 12vw, 11rem); color: var(--white); display: block; opacity: 0; animation: fadeUp 0.7s 0.25s forwards; }
        .hero-h1 .line2 { font-size: clamp(5.5rem, 13.5vw, 12.5rem); color: var(--accent); display: block; opacity: 0; animation: fadeUp 0.7s 0.4s forwards; }
        .hero-sub { margin-top: 2rem; font-size: clamp(1rem, 1.5vw, 1.15rem); color: rgba(255,255,255,0.6); max-width: 440px; line-height: 1.6; opacity: 0; animation: fadeUp 0.7s 0.55s forwards; }
        .hero-ctas { display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.7s 0.7s forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

        .btn-primary { background: var(--accent); color: #000; border: none; padding: 1rem 2.25rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; display: inline-block; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,255,0,0.35); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-outline { background: transparent; color: var(--white); border: 1.5px solid rgba(255,255,255,0.4); padding: 1rem 2.25rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s, transform 0.2s; text-decoration: none; display: inline-block; }
        .btn-outline:hover { border-color: var(--white); transform: translateY(-2px); }

        .ticker { background: var(--accent); overflow: hidden; padding: 0.85rem 0; display: flex; }
        .ticker-track { display: flex; animation: ticker 22s linear infinite; white-space: nowrap; }
        .ticker-item { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #000; padding: 0 2rem; }
        .ticker-dot { color: rgba(0,0,0,0.35); padding: 0; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        section { padding: 100px 5vw; }
        .section-eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
        .section-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 6vw, 5.5rem); letter-spacing: 0.04em; line-height: 1; }

        .products-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
        .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .product-grid { grid-template-columns: 1fr; } }

        .product-card { background: var(--card-bg); border: 1px solid var(--border); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; cursor: pointer; position: relative; overflow: hidden; }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); border-color: rgba(200,255,0,0.25); }
        .product-img { width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; position: relative; font-size: 4rem; }
        .grad-1 { background: linear-gradient(135deg, #1a1f0a 0%, #2d3d00 100%); }
        .grad-2 { background: linear-gradient(135deg, #0a1a1f 0%, #00283d 100%); }
        .grad-3 { background: linear-gradient(135deg, #1a0a0f 0%, #3d0010 100%); }
        .grad-4 { background: linear-gradient(135deg, #1a1a0a 0%, #3d3d00 100%); }
        .product-badge { position: absolute; top: 1rem; left: 1rem; background: var(--accent); color: #000; font-family: 'Space Grotesk', sans-serif; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.6rem; }
        .product-info { padding: 1.25rem; }
        .product-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.35rem; }
        .product-desc { font-size: 0.78rem; color: var(--sub); margin-bottom: 1rem; line-height: 1.5; }
        .product-footer { display: flex; align-items: center; justify-content: space-between; }
        .product-price { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--accent); }
        .add-btn { background: transparent; border: 1.5px solid rgba(255,255,255,0.2); color: var(--white); padding: 0.5rem 0.9rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
        .add-btn:hover { background: var(--accent); border-color: var(--accent); color: #000; }

        .featured { background: var(--card-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .featured-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 5vw; align-items: center; }
        @media (max-width: 820px) { .featured-inner { grid-template-columns: 1fr; } }
        .featured-img { aspect-ratio: 1; background: linear-gradient(135deg, #0f0f0f, #1e1e1e); display: flex; align-items: center; justify-content: center; font-size: 8rem; border: 1px solid var(--border); position: relative; }
        .featured-img-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(200,255,0,0.08) 0%, transparent 65%); }
        .featured-badge { display: inline-block; background: var(--accent); color: #000; font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.35rem 0.8rem; margin-bottom: 1.25rem; }
        .featured-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); letter-spacing: 0.04em; line-height: 1; margin-bottom: 1rem; }
        .featured-desc { font-size: 1rem; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 2rem; max-width: 400px; }
        .specs { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem; border-top: 1px solid var(--border); padding-top: 1.5rem; }
        .spec-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; }
        .spec-icon { width: 32px; height: 32px; background: rgba(200,255,0,0.08); border: 1px solid rgba(200,255,0,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .spec-label { color: var(--sub); min-width: 80px; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
        .spec-val { color: var(--white); font-weight: 500; }
        .featured-price { font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: var(--accent); margin-bottom: 1.25rem; }

        .usp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 4rem; border: 1px solid var(--border); }
        @media (max-width: 900px) { .usp-grid { grid-template-columns: repeat(2, 1fr); } }
        .usp-card { background: var(--card-bg); padding: 2.5rem 2rem; border-right: 1px solid var(--border); transition: background 0.25s; }
        .usp-card:last-child { border-right: none; }
        .usp-card:hover { background: #202020; }
        .usp-icon { font-size: 1.75rem; margin-bottom: 1rem; display: block; }
        .usp-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem; }
        .usp-text { font-size: 0.875rem; color: rgba(255,255,255,0.5); line-height: 1.65; }

        .community { background: linear-gradient(135deg, #0d0d0d, #111); text-align: center; position: relative; overflow: hidden; }
        .community-glow { position: absolute; top: -30%; left: 50%; transform: translateX(-50%); width: 80vw; height: 80vw; background: radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 60%); pointer-events: none; }
        .community-content { position: relative; z-index: 1; }
        .community-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3.5rem, 8vw, 8rem); letter-spacing: 0.04em; line-height: 0.95; margin-bottom: 1.5rem; }
        .community-title span { color: var(--accent); }
        .community-sub { font-size: 1.05rem; color: rgba(255,255,255,0.5); max-width: 480px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .community-stats { display: flex; justify-content: center; gap: 4rem; margin-top: 4rem; flex-wrap: wrap; }
        .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); color: var(--accent); letter-spacing: 0.04em; line-height: 1; }
        .stat-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--sub); margin-top: 0.35rem; }

        .newsletter { border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 3rem; flex-wrap: wrap; }
        .newsletter-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 5vw, 4.5rem); letter-spacing: 0.04em; line-height: 1; margin-bottom: 0.75rem; }
        .newsletter-title span { color: var(--accent); }
        .newsletter-sub { font-size: 0.95rem; color: rgba(255,255,255,0.5); line-height: 1.6; }
        .newsletter-form { display: flex; max-width: 440px; width: 100%; }
        .newsletter-form input { flex: 1; background: var(--card-bg); border: 1.5px solid var(--border); border-right: none; color: var(--white); padding: 1rem 1.25rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        .newsletter-form input::placeholder { color: var(--sub); }
        .newsletter-form input:focus { border-color: var(--accent); }
        .newsletter-form button { background: var(--accent); color: #000; border: none; padding: 1rem 1.5rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; white-space: nowrap; transition: background 0.2s; }
        .newsletter-form button:hover { background: #d8ff1a; }

        footer { border-top: 1px solid var(--border); padding: 4rem 5vw 2.5rem; }
        .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3.5rem; }
        @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr 1fr; } }
        .footer-brand-name { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 0.75rem; }
        .footer-brand-desc { font-size: 0.875rem; color: var(--sub); line-height: 1.7; max-width: 260px; }
        .footer-col-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.25rem; }
        .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
        .footer-links a { font-size: 0.875rem; color: var(--sub); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--white); }
        .footer-bottom { border-top: 1px solid var(--border); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .footer-copy { font-size: 0.78rem; color: var(--sub); }
        .footer-copy span { color: var(--accent); }
        .social-links { display: flex; gap: 1rem; }
        .social-link { width: 36px; height: 36px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--sub); text-decoration: none; font-size: 0.75rem; font-weight: 700; transition: border-color 0.2s, color 0.2s; }
        .social-link:hover { border-color: var(--accent); color: var(--accent); }

        .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .cart-overlay.open { opacity: 1; pointer-events: all; }
        .cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(420px, 100vw); background: #111; border-left: 1px solid var(--border); z-index: 201; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); display: flex; flex-direction: column; }
        .cart-drawer.open { transform: translateX(0); }
        .cart-header { padding: 1.5rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .cart-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
        .cart-close { background: none; border: none; color: var(--white); cursor: pointer; font-size: 1.5rem; line-height: 1; opacity: 0.6; transition: opacity 0.2s; }
        .cart-close:hover { opacity: 1; }
        .cart-body { flex: 1; overflow-y: auto; padding: 1.5rem; }
        .cart-empty { text-align: center; padding: 3rem 1rem; color: var(--sub); }
        .cart-empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .cart-empty-text { font-size: 0.875rem; line-height: 1.6; }
        .cart-items { display: flex; flex-direction: column; gap: 1rem; }
        .cart-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 1rem; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
        .cart-item-img { width: 60px; height: 60px; background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; }
        .cart-item-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.25rem; }
        .cart-item-price { font-size: 0.85rem; color: var(--accent); font-weight: 600; }
        .remove-item { background: none; border: none; color: var(--sub); cursor: pointer; font-size: 1rem; transition: color 0.2s; }
        .remove-item:hover { color: #ff4444; }
        .cart-footer { padding: 1.5rem; border-top: 1px solid var(--border); }
        .cart-total { display: flex; justify-content: space-between; margin-bottom: 1.25rem; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .cart-total-price { color: var(--accent); font-size: 1.1rem; }
        .stripe-note { font-size: 0.72rem; color: var(--sub); text-align: center; margin-top: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }

        .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px); background: var(--accent); color: #000; padding: 0.85rem 1.75rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; z-index: 300; transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none; white-space: nowrap; }
        .toast.show { transform: translateX(-50%) translateY(0); }

        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s, transform 0.7s; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 760px) { .nav-links { display: none; } }
      `}</style>

      {/* NAVBAR */}
      <nav id="navbar">
        <a href="#" className="nav-logo">DINK</a>
        <ul className="nav-links">
          <li><a href="#produkter">Shop</a></li>
          <li><a href="#om-oss">Om oss</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
        </ul>
        <div className="nav-right">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            KORG
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="hero-court">
          <svg viewBox="0 0 600 600" fill="none">
            <rect x="60" y="60" width="480" height="480" stroke="#C8FF00" strokeWidth="3"/>
            <line x1="300" y1="60" x2="300" y2="540" stroke="#C8FF00" strokeWidth="2"/>
            <line x1="60" y1="300" x2="540" y2="300" stroke="#C8FF00" strokeWidth="3"/>
            <line x1="60" y1="168" x2="540" y2="168" stroke="#C8FF00" strokeWidth="1.5"/>
            <line x1="60" y1="432" x2="540" y2="432" stroke="#C8FF00" strokeWidth="1.5"/>
            <rect x="160" y="168" width="280" height="132" stroke="#C8FF00" strokeWidth="1.5"/>
            <rect x="160" y="300" width="280" height="132" stroke="#C8FF00" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="hero-eyebrow">Sveriges #1 Pickleball Store</p>
          <h1 className="hero-h1">
            <span className="line1">OWN THE</span>
            <span className="line2">KITCHEN.</span>
          </h1>
          <p className="hero-sub">Sveriges bästa pickleball-utrustning. Levererad till din dörr.</p>
          <div className="hero-ctas">
            <a href="#produkter" className="btn-primary">SHOPPA NU</a>
            <a href="#featured" className="btn-outline">LÄR DIG MER</a>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track" id="tickerTrack" />
      </div>

      {/* PRODUKTER */}
      <section id="produkter">
        <div className="products-header reveal">
          <div>
            <p className="section-eyebrow">Utvalda produkter</p>
            <h2 className="section-title">THE ARSENAL</h2>
          </div>
        </div>
        <div className="product-grid">
          {PRODUCTS.map(p => (
            <div className="product-card reveal" key={p.id}>
              <div className={`product-img ${p.grad}`}>
                <span>{p.emoji}</span>
                {p.badge && <span className="product-badge">{p.badge}</span>}
              </div>
              <div className="product-info">
                <p className="product-name">{p.name}</p>
                <p className="product-desc">{p.desc}</p>
                <div className="product-footer">
                  <span className="product-price">{p.price.toLocaleString('sv-SE')} kr</span>
                  <button className="add-btn" onClick={() => addToCart(p)}>LÄGG I VARUKORG</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured" id="featured">
        <div className="featured-inner">
          <div className="featured-img reveal">
            <div className="featured-img-glow" />
            <span>🏓</span>
          </div>
          <div className="reveal">
            <span className="featured-badge">BÄSTSÄLJARE</span>
            <h2 className="featured-title">PRO CARBON<br/>PADDLE</h2>
            <p className="featured-desc">Kolfiberpaddle för den som vill dominera köket. Lätt, snabb och precis. Designad för spelare som inte kompromissar.</p>
            <ul className="specs">
              {[['⚖️','Vikt','220g'],['🧱','Material','3K Kolfiber'],['✋','Grip','4.25"'],['🎯','Nivå','Avancerad']].map(([icon,label,val]) => (
                <li className="spec-item" key={label}>
                  <span className="spec-icon">{icon}</span>
                  <span className="spec-label">{label}</span>
                  <span className="spec-val">{val}</span>
                </li>
              ))}
            </ul>
            <p className="featured-price">1 299 kr</p>
            <button className="btn-primary" onClick={() => addToCart(PRODUCTS[0])}>LÄGG I VARUKORG</button>
          </div>
        </div>
      </section>

      {/* USP */}
      <section id="om-oss">
        <div className="reveal">
          <p className="section-eyebrow">Varför välja oss</p>
          <h2 className="section-title">VARFÖR DINK?</h2>
        </div>
        <div className="usp-grid">
          {[['⚡','SNABB LEVERANS','1–3 arbetsdagar till hela Sverige. Gratis frakt på alla ordrar över 500 kr.'],
            ['🏆','PREMIUM KVALITET','Vi väljer bara ut utrustning som klarar de tuffaste matcherna. Testat av proffs.'],
            ['🔄','30 DAGARS RETUR','Inte nöjd? Skicka tillbaka utan krångel. Full återbetalning, inga frågor.'],
            ['🎾','EXPERT SUPPORT','Vårt team är pickleballspelare. Vi hjälper dig hitta rätt utrustning för din nivå.']
          ].map(([icon, title, text]) => (
            <div className="usp-card reveal" key={title}>
              <span className="usp-icon">{icon}</span>
              <p className="usp-title">{title}</p>
              <p className="usp-text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="community" id="community">
        <div className="community-glow" />
        <div className="community-content reveal">
          <p className="section-eyebrow">Gå med oss</p>
          <h2 className="community-title">JOIN THE<br/><span>DINK NATION</span></h2>
          <p className="community-sub">Bli en del av Sveriges snabbast växande pickleball-community. Tävlingar, tips och exklusiva erbjudanden.</p>
          <a href="#newsletter" className="btn-primary">GÅ MED NU</a>
          <div className="community-stats">
            {[['12K+','Aktiva spelare'],['340+','Turneringar 2025'],['4.9★','Snittbetyg']].map(([num, label]) => (
              <div key={label}>
                <p className="stat-num">{num}</p>
                <p className="stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter" id="newsletter">
        <div className="reveal">
          <p className="section-eyebrow">Håll dig uppdaterad</p>
          <h2 className="newsletter-title">GET IN<br/><span>THE LOOP.</span></h2>
          <p className="newsletter-sub">Exklusiva erbjudanden, nya produkter och pickleballtips – direkt i din inkorg.</p>
        </div>
        <form className="newsletter-form reveal" onSubmit={e => { e.preventDefault(); showToast('Tack! Du är nu med i DINK Nation. 🎉'); e.target.reset(); }}>
          <input type="email" placeholder="Din e-postadress" required />
          <button type="submit">PRENUMERERA</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer id="kontakt">
        <div className="footer-top">
          <div>
            <p className="footer-brand-name">DINK</p>
            <p className="footer-brand-desc">Sveriges bästa pickleball-utrustning. För spelare som vill äga köket – varje match, varje dag.</p>
          </div>
          <div>
            <p className="footer-col-title">Shop</p>
            <ul className="footer-links">
              {['Paddlar','Bollar','Väskor','Tillbehör','Nya produkter'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Info</p>
            <ul className="footer-links">
              {['Om DINK','Frakt & Retur','Storleksguide','FAQ','Kontakt'].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Kontakt</p>
            <ul className="footer-links">
              <li><a href="mailto:hej@dink.se">hej@dink.se</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 <span>DINK</span> — Own the Kitchen.</p>
          <div className="social-links">
            <a href="#" className="social-link">IG</a>
            <a href="#" className="social-link">TK</a>
            <a href="#" className="social-link">YT</a>
          </div>
        </div>
      </footer>

      {/* CART DRAWER */}
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <p className="cart-title">Din korg ({cartCount})</p>
          <button className="cart-close" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-icon">🏓</p>
              <p className="cart-empty-text">Din korg är tom.<br/>Börja shoppa för att lägga till produkter.</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item, i) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img">{item.emoji}</div>
                  <div>
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{(item.price * item.qty).toLocaleString('sv-SE')} kr{item.qty > 1 ? ` (${item.qty}×)` : ''}</p>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Totalt</span>
              <span className="cart-total-price">{cartTotal.toLocaleString('sv-SE')} kr</span>
            </div>
            <button className="btn-primary" style={{width:'100%',textAlign:'center'}} onClick={handleCheckout} disabled={loading}>
              {loading ? 'LADDAR...' : 'TILL KASSAN →'}
            </button>
            <p className="stripe-note">🔒 Säker betalning via Stripe</p>
          </div>
        )}
      </div>

      {/* TOAST */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </>
  );
}
