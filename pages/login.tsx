import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      setError('Fel lösenord. Försök igen.');
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>DINK – Logga in</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #0A0A0A;
          color: #fff;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .card {
          width: 100%;
          max-width: 400px;
          border: 1px solid #2A2A2A;
          padding: 3rem 2.5rem;
          background: #111;
        }
        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3.5rem;
          letter-spacing: 0.12em;
          color: #C8FF00;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .tagline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 2.5rem;
        }
        h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          background: #0A0A0A;
          border: 1.5px solid #2A2A2A;
          color: #fff;
          padding: 0.9rem 1rem;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          margin-bottom: 1.25rem;
          letter-spacing: 0.1em;
        }
        input:focus { border-color: #C8FF00; }
        input::placeholder { color: #333; letter-spacing: 0.05em; }
        .error {
          font-size: 0.78rem;
          color: #ff5555;
          margin-bottom: 1.25rem;
          letter-spacing: 0.04em;
        }
        button {
          width: 100%;
          background: #C8FF00;
          color: #000;
          border: none;
          padding: 1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        button:hover:not(:disabled) { background: #d8ff1a; transform: translateY(-1px); }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        .divider {
          border: none;
          border-top: 1px solid #2A2A2A;
          margin: 2rem 0 1.5rem;
        }
        .hint {
          font-size: 0.72rem;
          color: #333;
          text-align: center;
          letter-spacing: 0.06em;
        }
      `}</style>

      <div className="card">
        <p className="logo">DINK</p>
        <p className="tagline">Own the Kitchen</p>
        <h1>Ange lösenord</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'VERIFIERAR...' : 'ÖPPNA SIDAN →'}
          </button>
        </form>
        <hr className="divider" />
        <p className="hint">Denna sida är lösenordsskyddad</p>
      </div>
    </>
  );
}
