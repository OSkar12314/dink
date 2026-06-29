import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Target, Layers, Package, Wrench, ShoppingCart } from 'lucide-react';

const SITE_URL = 'https://dinksweden.se';

const ICON_PROPS = { size: 40, stroke: '#C8FF00', strokeWidth: 1.25 };

const PRODUCTS = [
  { id: 1, name: 'PRO CARBON PADDLE', desc: 'Kolfiberpaddle för den som vill dominera köket', price: 1299, Icon: () => <Target {...ICON_PROPS} />, badge: 'Bestseller', grad: 'grad-1', kategori: 'paddlar' },
  { id: 2, name: 'OUTDOOR BALLS 3-PACK', desc: 'Optimerad för utomhusspel i alla väderförhållanden', price: 249, Icon: () => <Layers {...ICON_PROPS} />, grad: 'grad-2', kategori: 'bollar' },
  { id: 3, name: 'DINK BACKPACK', desc: 'Rymlig väska med paddelfack och ventilerat rygg', price: 899, Icon: () => <Package {...ICON_PROPS} />, grad: 'grad-3', kategori: 'vaskor' },
  { id: 4, name: 'GRIP TAPE 3-PACK', desc: 'Absorberande grip för maximal kontroll vid varje slag', price: 149, Icon: () => <Wrench {...ICON_PROPS} />, grad: 'grad-4', kategori: 'tillbehor' },
];

const CATEGORIES = [
  { id: 'alla', label: 'Alla produkter' },
  { id: 'paddlar', label: 'Paddlar' },
  { id: 'bollar', label: 'Bollar' },
  { id: 'vaskor', label: 'Väskor' },
  { id: 'tillbehor', label: 'Tillbehör' },
];

export default function Shop() {
  const router = useRouter();
  const [active, setActive] = useState('alla');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const k = router.query.k;
    if (k && CATEGORIES.find(c => c.id === k)) setActive(k);
  }, [router.query.k]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = active === 'alla' ? PRODUCTS : PRODUCTS.filter(p => p.kategori === active);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast({ show: true, msg: `${product.name} lagd i korgen!` });
    setTimeout(() => setToast({ show: false, msg: '' }), 2800);
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  return (
    <>
      <Head>
        <title>Shop – DINK | Sveriges bästa pickleball-utrustning</title>
        <meta name="description" content="Köp paddlar, bollar, väskor och tillbehör för pickleball. Gratis frakt över 500 kr." />
        <link rel="canonical" href={`${SITE_URL}/shop`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          .hamburger { display: none !important; }
          .nav-links { display: flex !important; }
          @media (max-width: 760px) {
            .hamburger { display: flex !important; }
            .nav-links { display: none !important; }
          }
        `}</style>
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #0A0A0A; --accent: #C8FF00; --border: #2A2A2A; --sub: #555; }
        body { background: #F5F5F0; color: #0A0A0A; font-family: 'Inter', sans-serif; overflow-x: hidden; }

        /* NAVBAR */
        #navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 5vw; height: 68px; display: flex; align-items: center; justify-content: space-between; background: rgba(10,10,10,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid #2A2A2A; }
        .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 0.12em; color: var(--accent); text-decoration: none; }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; text-decoration: none; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
        .nav-links a:hover, .nav-links a.active { opacity: 1; color: var(--accent); }
        .nav-right { display: flex; align-items: center; gap: 1.25rem; }
        .cart-btn { background: none; border: none; cursor: pointer; color: #fff; display: flex; align-items: center; gap: 0.4rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.85; transition: opacity 0.2s, color 0.2s; }
        .cart-btn:hover { opacity: 1; color: var(--accent); }
        .cart-count { background: var(--accent); color: #000; font-size: 0.65rem; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        /* HAMBURGER */
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        @media (max-width: 760px) { .nav-links { display: none; } .hamburger { display: flex; } }

        /* MOBILE MENU */
        .mobile-menu { position: fixed; inset: 0; background: #0a0a0a; z-index: 99; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu a { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; letter-spacing: 0.08em; color: #fff; text-decoration: none; transition: color 0.2s; }
        .mobile-menu a:hover { color: var(--accent); }
        .mobile-cat-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--sub); margin-top: 0.5rem; }
        .mobile-cat-links { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        .mobile-cat-links a { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s; }
        .mobile-cat-links a:hover { color: var(--accent); }

        /* PAGE */
        .page { padding-top: 68px; }

        /* SHOP HEADER */
        .shop-header { background: #0A0A0A; padding: 4rem 5vw 3rem; }
        .shop-eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
        .shop-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 7vw, 6rem); letter-spacing: 0.04em; line-height: 1; color: #fff; }

        /* FILTER BAR */
        .filter-bar { background: #0A0A0A; border-bottom: 1px solid #2A2A2A; padding: 0 5vw; display: flex; gap: 0; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-btn { background: none; border: none; border-bottom: 2px solid transparent; padding: 1rem 1.5rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); cursor: pointer; transition: color 0.2s, border-color 0.2s; white-space: nowrap; }
        .filter-btn:hover { color: rgba(255,255,255,0.8); }
        .filter-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

        /* PRODUCT GRID */
        .shop-body { padding: 3rem 5vw 6rem; }
        .product-count { font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; color: #888; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2rem; }
        .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        @media (max-width: 1100px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 760px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 440px) { .product-grid { grid-template-columns: 1fr; } }

        .product-card { background: #fff; border: 1px solid #E0E0D8; transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; cursor: pointer; position: relative; overflow: hidden; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); border-color: var(--accent); }
        .product-img { width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; position: relative; }
        .grad-1 { background: linear-gradient(135deg, #1a1f0a 0%, #2d3d00 100%); }
        .grad-2 { background: linear-gradient(135deg, #0a1a1f 0%, #00283d 100%); }
        .grad-3 { background: linear-gradient(135deg, #1a0a0f 0%, #3d0010 100%); }
        .grad-4 { background: linear-gradient(135deg, #1a1a0a 0%, #3d3d00 100%); }
        .product-badge { position: absolute; top: 0.75rem; left: 0.75rem; background: var(--accent); color: #000; font-family: 'Space Grotesk', sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.25rem 0.55rem; }
        .product-info { padding: 1.25rem; }
        .product-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.3rem; color: #0A0A0A; }
        .product-desc { font-size: 0.78rem; color: #777; margin-bottom: 1rem; line-height: 1.5; }
        .product-footer { display: flex; align-items: center; justify-content: space-between; }
        .product-price { font-family: 'Space Grotesk', sans-serif; font-size: 1.05rem; font-weight: 700; color: #0A0A0A; }
        .add-btn { background: #0A0A0A; border: none; color: #fff; padding: 0.55rem 1rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .add-btn:hover { background: var(--accent); color: #000; }

        /* EMPTY */
        .empty { text-align: center; padding: 5rem 1rem; color: #888; }
        .empty p { font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; margin-top: 1rem; }

        /* CART */
        .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .cart-overlay.open { opacity: 1; pointer-events: all; }
        .cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(420px, 100vw); background: #111; border-left: 1px solid #2A2A2A; z-index: 201; transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); display: flex; flex-direction: column; }
        .cart-drawer.open { transform: translateX(0); }
        .cart-header { padding: 1.5rem; border-bottom: 1px solid #2A2A2A; display: flex; align-items: center; justify-content: space-between; }
        .cart-title { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; }
        .cart-close { background: none; border: none; color: #fff; cursor: pointer; font-size: 1.5rem; line-height: 1; opacity: 0.6; transition: opacity 0.2s; }
        .cart-close:hover { opacity: 1; }
        .cart-body { flex: 1; overflow-y: auto; padding: 1.5rem; }
        .cart-empty { text-align: center; padding: 3rem 1rem; color: #555; }
        .cart-items { display: flex; flex-direction: column; gap: 1rem; }
        .cart-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 1rem; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid #2A2A2A; }
        .cart-item-img { width: 60px; height: 60px; background: #1A1A1A; display: flex; align-items: center; justify-content: center; }
        .cart-item-name { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #fff; margin-bottom: 0.25rem; }
        .cart-item-price { font-size: 0.85rem; color: var(--accent); font-weight: 600; }
        .remove-item { background: none; border: none; color: #555; cursor: pointer; font-size: 1rem; transition: color 0.2s; }
        .remove-item:hover { color: #ff4444; }
        .cart-footer { padding: 1.5rem; border-top: 1px solid #2A2A2A; }
        .cart-total { display: flex; justify-content: space-between; margin-bottom: 1.25rem; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.08em; color: #fff; }
        .cart-total-price { color: var(--accent); font-size: 1.1rem; }
        .checkout-btn { width: 100%; background: var(--accent); color: #000; border: none; padding: 1rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
        .checkout-btn:hover { background: #d8ff1a; }

        /* TOAST */
        .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px); background: var(--accent); color: #000; padding: 0.85rem 1.75rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; z-index: 300; transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none; white-space: nowrap; }
        .toast.show { transform: translateX(-50%) translateY(0); }
      `}</style>

      {/* NAVBAR */}
      <nav id="navbar">
        <a href="/" className="nav-logo">DINK</a>
        <ul className="nav-links">
          <li><a href="/shop" className="active">Shop</a></li>
          <li><a href="/#om-oss">Om oss</a></li>
          <li><a href="/#community">Community</a></li>
          <li><a href="/#kontakt">Kontakt</a></li>
        </ul>
        <div className="nav-right">
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Öppna meny">
            <span /><span /><span />
          </button>
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

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Hem</a>
        <div>
          <p className="mobile-cat-title">Shop efter kategori</p>
          <div className="mobile-cat-links" style={{marginTop:'0.75rem'}}>
            {CATEGORIES.slice(1).map(c => (
              <a key={c.id} href={`/shop?k=${c.id}`} onClick={() => { setActive(c.id); setMenuOpen(false); }}>{c.label}</a>
            ))}
          </div>
        </div>
        <a href="/#om-oss" onClick={() => setMenuOpen(false)}>Om oss</a>
        <a href="/#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
      </div>

      <div className="page">
        {/* SHOP HEADER */}
        <div className="shop-header">
          <p className="shop-eyebrow">Pickleball-utrustning</p>
          <h1 className="shop-title">THE ARSENAL</h1>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`filter-btn ${active === c.id ? 'active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="shop-body">
          <p className="product-count">{filtered.length} produkt{filtered.length !== 1 ? 'er' : ''}</p>
          {filtered.length === 0 ? (
            <div className="empty">
              <ShoppingCart size={40} stroke="#ccc" strokeWidth={1.25} />
              <p>Inga produkter i den här kategorin ännu.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map(p => (
                <article className="product-card" key={p.id}>
                  <div className={`product-img ${p.grad}`}>
                    <p.Icon />
                    {p.badge && <span className="product-badge">{p.badge}</span>}
                  </div>
                  <div className="product-info">
                    <h2 className="product-name">{p.name}</h2>
                    <p className="product-desc">{p.desc}</p>
                    <div className="product-footer">
                      <span className="product-price">{p.price.toLocaleString('sv-SE')} kr</span>
                      <button className="add-btn" onClick={() => addToCart(p)}>LÄGG I KORG</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CART */}
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <p className="cart-title">Din korg ({cartCount})</p>
          <button className="cart-close" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={36} stroke="#444" strokeWidth={1.25} />
              <p style={{color:'#555',fontSize:'0.875rem',marginTop:'1rem'}}>Din korg är tom.</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img"><item.Icon /></div>
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
            <button className="checkout-btn">TILL KASSAN →</button>
          </div>
        )}
      </div>

      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>
    </>
  );
}
