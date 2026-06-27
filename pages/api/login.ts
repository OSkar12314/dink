import type { NextApiRequest, NextApiResponse } from 'next';

const PASSWORD = 'dink2026';
const COOKIE = 'dink_auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password } = req.body;

  if (password === PASSWORD) {
    res.setHeader('Set-Cookie', `${COOKIE}=${PASSWORD}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`);
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ error: 'Fel lösenord' });
}
